/**
 * Imports
 */

import {Block, Table, TableHeader, TableRow, TableCell, Icon, Text} from 'vdux-ui'
import {Button, Checkbox, wrap, CSSContainer} from 'vdux-containers'
import FourOhFour from 'pages/FourOhFour'
import getProp from '@f/get-prop'
import statusMap from 'lib/status'
import element from 'vdux/element'
import summon from 'vdux-summon'
import moment from 'moment'

/**
 * <ActivityProgress/>
 */

function render ({props}) {
  const {activity, students, currentUser, setSort} = props
  const {value, loading, error} = students

  if (loading) return <span/>
  if (error) return <FourOhFour />

  const sort = getProp('preferences.shareStudentSort', currentUser) || {
    property: 'givenName',
    dir: 1
  }
  const instances = getInstances(activity, value.items).sort(cmp)
  const headProps = {
    sort,
    setPref,
    textAlign: 'left',
    bg: 'grey',
    p: true,
    color: 'white',
    lighter: true
  }

  return (
    <Block w='col_main' m='auto' bgColor='white' boxShadow='card' p mb>
      <Actions/>
      <Table wide border='1px solid rgba(black, .1)' fs='s' lighter>
        <TableRow>
          <TableHeader {...headProps}>
            <Checkbox/>
          </TableHeader>
          <SortHead {...headProps} prop='givenName' text='First'  />
          <SortHead {...headProps} prop='familyName' text='Last'  />
          <SortHead {...headProps} prop='percent' text='Score'  />
          <SortHead {...headProps} prop='status' text='Status'  />
          <SortHead {...headProps} prop='turnedInAt' text='Turned In'  />
          <TableHeader {...headProps} />
        </TableRow>
        {
          instances.map(instance => <StudentRow instance={instance} />)
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

function Actions () {
  const iconProps ={
    color: 'text',
    fs: 'm',
    circle: '32',
    activeProps: {bgColor: 'rgba(black, .1)'}
  }
  return (
    <Block align='start center' mb>
      <Button text='Return' h={32} />
      <Button icon='more_vert' mx {...iconProps} />
      <Button icon='link' {...iconProps} />
    </Block>
  )
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

function StudentRow ({props}) {
  const {instance} = props
  const {
    status , turnedInAt, givenName,
    familyName, points, total, percent
  } = instance
  const statProps = statusMap[status]

  return (
    <TableRow bg='#FDFDFD' borderBottom='1px solid rgba(black, .1)'>
      <TableCell p>
        <Checkbox/>
      </TableCell>
      <TableCell p>
        {givenName}
      </TableCell>
      <TableCell p>
        {familyName}
      </TableCell>
      <TableCell p>
        { points} / {total} ({percent})
      </TableCell>
      <TableCell p>
        <Block pill h={30} fs='14' align='center center' bg={statProps.teacherColor} color='white' capitalize w='108'>
          { statProps.displayName }
        </Block>
      </TableCell>
      <TableCell p>
        {
          turnedInAt ? moment(turnedInAt).format('M/D/YY h:mm A') : '–'
        }
      </TableCell>
      <TableCell py w='62'>
        <Button text='Open' px='0' h='32' w='50'/>
      </TableCell>
    </TableRow>
  )
}

/**
 * Helpers
 */

function getInstances (activity, students) {
  const {instances: {total: {'0': {actors}}}} = activity
  const total = totalPoints(activity)

  return students.map(function(student) {
    const actor = actors[student._id]
    const {turnedInAt = '-', status = 1} = actor
    const points = actor ? (actor.pointsScaled * total) : 0
    const percent = actor ? (Math.round(actor.pointsScaled * 100) + '%') : '0%'
    const instance = students
    return {
      total,
      points,
      percent,
      status,
      turnedInAt,
      id: student._id,
      familyName: student.name.familyName,
      givenName: student.name.givenName
    }

    return obj
  })
}

function totalPoints (activity) {
  if (!activity._object || !activity._object[0] || !activity._object[0].attachments) return

  return activity._object[0].attachments
    .reduce((total, att) => total +
      (att.objectType === 'question' && !att.poll
        ? att.points.max
        : 0), 0)
}

/**
 * Exports
 */

export default summon(({classId}) => ({
  students: `/group/students?group=${classId}`,
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
}))({
  render
})
