/**
 * Imports
 */

import {Block, Table, TableHeader, TableRow, Icon, Text} from 'vdux-ui'
import {Checkbox, wrap, CSSContainer, form} from 'vdux-containers'
import ActivityProgressRow from './ActivityProgressRow'
import {totalPoints} from 'lib/activity-helpers'
import Actions from './ActivityProgressActions'
import FourOhFour from 'pages/FourOhFour'
import element from 'vdux/element'
import getProp from '@f/get-prop'
import summon from 'vdux-summon'
import index from '@f/index'


/**
 * <ActivityProgress/>
 */

function render ({props}) {
  const {
    activity, students, currentUser,
    setSort, classId, toggleAll, fields
  } = props
  const sort = getProp('preferences.shareStudentSort', currentUser) || {
    property: 'givenName',
    dir: 1
  }
  const instances = getInstances(activity, students).sort(cmp)
  const headProps = {sort, setPref, lighter: true, p: true}

  // Multi Select Variables
  const studentIds = index(({userId}) => userId, instances)
  const selected = (fields.selected.value || []).filter(id => studentIds[id])
  const selMap = index(selected)
  const allSelected = instances.length === selected.length
  const indeterminate = !allSelected && selected.length

  return (
    <Block w='col_main' m='auto' bgColor='white' boxShadow='card' p mb>
      <Actions activity={activity} classId={classId} />
      <Table wide border='1px solid rgba(black, .1)' fs='s' lighter>
        <TableRow bgColor='grey' color='white'>
          <TableHeader {...headProps}>
            <Checkbox pointer checked={allSelected} indeterminate={indeterminate} onChange={() => toggleAll('selected')}/>
          </TableHeader>
          <SortHead {...headProps} prop='givenName' text='First'  />
          <SortHead {...headProps} prop='familyName' text='Last'  />
          <SortHead {...headProps} prop='percent' text='Score'  />
          <SortHead {...headProps} prop='status' text='Status'  />
          <SortHead {...headProps} prop='turnedInAt' text='Turned In'  />
          <TableHeader {...headProps} />
        </TableRow>
        {
          instances.map(instance =>
            <ActivityProgressRow
              selected={!!selMap[instance.userId]}
              instance={instance}
              classId={classId}
              activityId={activity._id}/>
          )
        }
      </Table>
    </Block>
  )

  function * setPref(prop) {
    yield setSort({
      property: prop,
      dir: prop === sort.property ? sort.dir * -1 : 1
    })
  }

  function cmp (a, b) {
    if(!sort) return
    const prop = sort.property
    const prop1 = getProp(prop, a).toString().toUpperCase() || ''
    const prop2 = getProp(prop, b).toString().toUpperCase() || ''

    return prop1 > prop2 ? 1 * sort.dir : -1 * sort.dir
  }
}

const SortHead = wrap(CSSContainer, {
    hoverProps: {
      hover: true
    }
  })({
  render ({props}) {
    const {hover, sort, prop, text, setPref, ...rest} = props

    return (
      <TableHeader pointer={sort} onClick={() => setPref(prop)} {...rest} borderWidth={0}>
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

function getInstances (activity, students) {
  const {instances: {total: {'0': {actors}}}} = activity
  const total = totalPoints(activity)

  return students.map(function(student) {
    const actor = actors[student._id]
    const pointsScaled = actor ? actor.pointsScaled : 0
    return {
      total,
      status: actor ? actor.status : 1,
      turnedInAt: actor ? actor.turnedInAt : 0,
      percent: Math.round(pointsScaled * 100) + '%',
      points: pointsScaled * total,
      userId: student._id,
      familyName: student.name.familyName,
      givenName: student.name.givenName
    }
  })
}

/**
 * Exports
 */

export default summon(() => ({
  setSort: pref => ({
    settingSort:  {
      url: '/preference/shareStudentSort',
      invalidates: '/user',
      method: 'PUT',
      body: {
        value: pref
      }
    }
  })
}))(
  form(({students}) => ({
    fields: ['selected']
  }))({
    render
  })
)
