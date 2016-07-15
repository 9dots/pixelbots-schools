/**
 * Imports
 */

import {Block, Table, TableHeader, TableRow, Icon, Text} from 'vdux-ui'
import {Checkbox, wrap, CSSContainer, form} from 'vdux-containers'
import ActivityProgressActions from './ActivityProgressActions'
import {totalPoints, activitySort} from 'lib/activity-helpers'
import ActivityProgressRow from './ActivityProgressRow'
import summonChannels from 'lib/summon-channels'
import summonPrefs from 'lib/summon-prefs'
import FourOhFour from 'pages/FourOhFour'
import element from 'vdux/element'
import index from '@f/index'

/**
 * <ActivityProgress/>
 */

function render ({props}) {
  const {
    activity, students, currentUser, setStatus,
    settingStatus, setPref, prefs, toggleAll, fields,
    activities
  } = props
  const {value, loading, error} = activities
  const sort = prefs.shareStudentSort || {property: 'name.givenName', dir: 1}
  if (loading) return <span/>
  if (error) return <FourOhFour />

  const instanceList = getInstances(activity, students, value.items).sort(activitySort(sort))
  const headProps = {sort, setSort, lighter: true, p: true}

  // Multi Select Variables
  const instanceIds = index(({instanceId}) => instanceId, instanceList)
  const selected = (fields.selected.value || []).filter(id => instanceIds[id])
  const selMap = index(selected)
  const allSelected = instanceList.length === selected.length
  const indeterminate = !allSelected && selected.length

  return (
    <Block w='col_main' m='auto' bgColor='white' boxShadow='card' p mb>
      <ActivityProgressActions
        settingStatus={settingStatus}
        setStatus={setStatus}
        activity={activity}
        selected={selected}/>
      <Table wide border='1px solid rgba(black, .1)' fs='s' lighter>
        <TableRow bgColor='grey' color='white'>
          <TableHeader {...headProps}>
            <Checkbox pointer checked={allSelected} indeterminate={indeterminate} onChange={() => toggleAll('selected')}/>
          </TableHeader>
          <SortHead {...headProps} prop='givenName' text='First' />
          <SortHead {...headProps} prop='familyName' text='Last' />
          <SortHead {...headProps} prop='percent' text='Score' />
          <SortHead {...headProps} prop='status' text='Status' />
          <SortHead {...headProps} prop='turnedInAt' text='Turned In' />
          <TableHeader {...headProps} />
        </TableRow>
        {
          instanceList.map(instance =>
            <ActivityProgressRow
              selected={!!selMap[instance.instanceId]}
              instance={instance}
              activityId={activity._id}/>
          )
        }
      </Table>
    </Block>
  )

  function * setSort (property) {
    yield setPref('shareStudentSort', {
      property,
      dir: property === sort.property ? sort.dir * -1 : 1
    })
  }
}

/**
 * <SortHead/>: Sortable table headers
 */

const SortHead = wrap(CSSContainer, {
    hoverProps: {
      hover: true
    }
  })({
  render ({props}) {
    const {hover, sort, prop, text, setSort, ...rest} = props

    return (
      <TableHeader pointer={sort} onClick={() => setSort(prop)} {...rest} borderWidth={0}>
        <Block align='start center'>
          <Text underline={sort && hover}>
            {text}
          </Text>
          <Icon
            name={'arrow_drop_' + (sort.dir === 1 ? 'down' : 'up')}
            hidden={sort.property !== prop}
            ml='s'
            fs='s'/>
        </Block>
      </TableHeader>
    )
  }
})

/**
 * Helpers
 */

function getInstances (activity, students, instances) {
  const {instances: {total: {'0': {actors}}}} = activity
  const total = totalPoints(activity)

  return students.map(function(student) {
    const actor = actors[student._id]
    const pointsScaled = actor ? actor.pointsScaled : 0
    const instance = instances.find(({actor}) => actor.id === student._id)

    return {
      total,
      instanceId: instance._id,
      familyName: student.name.familyName,
      givenName: student.name.givenName,
      percent: Math.round(pointsScaled * 100) + '%',
      turnedInAt: actor ? actor.turnedInAt : 0,
      status: actor ? actor.status : 1,
      points: pointsScaled * total,
      userId: student._id
    }
  })
}

/**
 * Exports
 */

export default summonPrefs()(summonChannels(
  ({activity}) => `share!${activity._id}.instances`, ({activity}) => ({
  persistSort: pref => ({
    settingSort:  {
      url: '/preference/shareStudentSort',
      invalidates: '/user',
      method: 'PUT',
      body: {
        value: pref
      }
    }
  }),
  setStatus: (id, status) => ({
    settingStatus: {
      url: `/instance/${id}/${status}`,
      invalidates: `/share/${activity._id}`,
      method: 'PUT'
    }
  })
}))(
  form(({students}) => ({
    fields: ['selected']
  }))({
    render
  })
))
