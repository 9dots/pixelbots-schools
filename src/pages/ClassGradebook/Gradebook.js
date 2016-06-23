/**
 * Imports
 */

import {wrap, CSSContainer, Button, Dropdown, MenuItem} from 'vdux-containers'
import {Table, TableHeader, TableRow, Card, Block, Icon} from 'vdux-ui'
import summonChannels from 'lib/summon-channels'
import datauriDownload from 'datauri-download'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import GradebookRow from './GradebookRow'
import Loading from 'components/Loading'
import findIndex from '@f/find-index'
import element from 'vdux/element'
import getProp from '@f/get-prop'
import reduce from '@f/reduce'
import toCsv from 'to-csv'
import map from '@f/map'

/**
 * <Gradebook/>
 */

function render ({props, local, state}) {
  const {group, students, activities, currentUser, togglePref} = props
  const {expanded} = state
  const {value, loading, loaded} = activities
  const asPercent = getProp('preferences.gradebook.displayPercent', currentUser)

  if (!loaded && loading) return <Loading show={true} h='200' />

  const {items: activityList} = value
  const expandedProps = expanded
    ? {
        position: 'fixed',
        overflowY: 'auto',
        bg: 'off_white',
        sq: '100%',
        pt: 'm',
        top: 0,
        z: 99,
        m: 0
      }
    : {}

  const totals = map(totalPoints, activityList)
  const usersData = map(user => getUsersData(user._id, activityList, totals), students)

  return (
    <Block w='col_main' mx='auto' my='l' relative {...expandedProps}>
      <Block align='start center' relative mb pl={expanded ? 'm' : 0}>
        <Dropdown btn={<DropButton />} z='3' left w='160px' fs='xxs'>
          <MenuItem onClick={() => togglePref(asPercent)} py>
            Display as {asPercent ? ' Point Totals' : ' Percentages'}
          </MenuItem>
          <MenuItem py align='start center' onClick={exportAll}>
            Export to CSV
            <Icon name='file_download' fs='xs' ml='s' />
          </MenuItem>
        </Dropdown>
        <ExpandButton ml onClick={local(toggle)} expanded={expanded} />
      </Block>
      <Block boxShadow='card' overflow='auto' relative>
        <Table overflow='auto'>
          <Header activities={activityList} exportActivity={exportActivity} />
          {
            map((student, i) => <GradebookRow
              data={usersData[i]}
              asPercent={asPercent}
              student={student}
              odd={i%2}
              currentUser={currentUser}
              last={students.length === (i+1)} />, students)
          }
        </Table>
      </Block>
    </Block>
  )

  function exportAll () {
    const headers = ['Id', 'Name', 'Total', ...activityList.map(({displayName}) => displayName)]
    const content = map((user, i) => [
      user.sisId,
      user.displayName,
      usersData[i].percent,
      ...map(score =>
        score.percent === '-'
          ? ''
          : asPercent ? score.percent : score.points,
        usersData[i].scores
      )
    ], students)

    downloadCsv(group.displayName, [headers, ...content])
  }

  function exportActivity (activity) {
    const idx = findIndex(activityList, ({_id}) => _id === activity._id)
    const headers = ['Id', 'Name', 'Grade']
    const content = map((user, i) => {
      const score = usersData[i].scores[idx]

      return [
        user.sisId,
        user.displayName,
        score.percent === '-'
          ? ''
          : asPercent ? score.percent : score.points
      ]
    }, students)

    downloadCsv(activity.displayName, [headers, ...content])
  }
}

/**
 * Sub-components
 */

function Header ({props}) {
  const {activities, exportActivity, ...rest} = props
  const headProps = {
    borderRight: '1px solid text',
    bgColor: 'grey',
    color: 'white',
    p: '24px 16px'
  }

  return (
    <TableRow>
      <TableHeader {...headProps} width='10px' textAlign='left' borderWidth='0'>
        First
      </TableHeader>
      <TableHeader {...headProps} textAlign='left' borderWidth='0'>
        Last
      </TableHeader>
      <TableHeader {...headProps}>
        Total
      </TableHeader>
      {
        map(activity => <ActivityHeader
          {...headProps}
          activity={activity}
          exportActivity={() => exportActivity(activity)} />, activities)
      }
    </TableRow>
  )
}

const ActivityHeader = wrap(CSSContainer, {
  hoverProps: {
    showSettings: true
  }
})({
  render ({props}) {
    const {activity, showSettings, exportActivity, ...rest} = props
    const btn = <Icon fs='xxs' pointer absolute='top 0px right 0px' hide={!showSettings} name='settings' />

    return (
      <TableHeader {...rest}  fs='xxs' px maxWidth='100px' minWidth='100px'>
        <Dropdown btn={btn} z='3' fs='xxs' w='120px'>
          <MenuItem align='start center' onClick={exportActivity}>
            <Icon name='file_download' fs='xs' mr='s' />
            Export to CSV
          </MenuItem>
        </Dropdown>
        <Block tall wide ellipsis>
          {activity.displayName}
        </Block>
      </TableHeader>
    )
  }
})

function DropButton () {
  return (
    <Button bgColor='green' h={32}>
      <Icon name='settings' fs='xs' mr='s' />
      Settings
      <Icon name='arrow_drop_down' fs='s' ml='s' mr='-12px' />
    </Button>
  )
}

function ExpandButton ({props}) {
  const {expanded, ...rest} = props
  return (
    <Button h='32' {...rest}>
      <Icon name={expanded ? 'fullscreen_exit' : 'fullscreen'} fs='s' mr='s' />
      {expanded ? 'Exit' : 'Expand'}
    </Button>
  )
}

/**
 * Helpers
 */

function downloadCsv (filename, data) {
  datauriDownload(filename + '-' + today() + '.csv', 'text/csv;charset=utf-8', toCsv(data))
}

function today () {
  var d = new Date()
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-')
}

function totalPoints (activity) {
  if (!activity._object || !activity._object[0] || !activity._object[0].attachments) return

  return activity._object[0].attachments
    .reduce((total, att) => total +
      (att.objectType === 'question'
        ? att.points.max
        : 0), 0)
}

function getUsersData (id, activities, totals) {
  return reduce((acc, {instances: {total}}, i) => {
    const inst = total.length ? total[0].actors[id] : false

    acc.total += totals[i]

    if (!inst || inst.status < 5) {
      acc.scores.push({
        points: '-',
        percent: '-',
        total: totals[i]
      })
      return acc
    }

    const points = inst.pointsScaled * totals[i]
    const percent = Math.round(inst.pointsScaled * 100) + '%'

    acc.points += points

    acc.percent = Math.round((acc.points / acc.total) * 100) + '%'
    acc.scores.push({total: totals[i], points, percent})

    return acc
  }, {points: 0, total: 0, scores: []}, activities)
}

/**
 * Actions
 */

const toggle = createAction('<Gradebook />: toggle expanded')

/**
 * Reducer
 */

const reducer = handleActions({
  [toggle]: state => ({
    ...state,
    expanded: !state.expanded
  })
})

/**
 * Exports
 */

export default summonChannels(({group}) => `group!${group._id}.board`,
  {
    togglePref: (pref) => ({
      savingPreference:  {
        url: '/preference/gradebook.displayPercent',
        invalidates: '/user',
        method: 'PUT',
        body: {
          value: !pref
        }
      }
    })
  }
)({
  render,
  reducer
})
