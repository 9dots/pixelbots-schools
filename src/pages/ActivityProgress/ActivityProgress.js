/**
 * Imports
 */

import {Block, Table, TableHeader, TableRow, TableCell} from 'vdux-ui'
import FourOhFour from 'pages/FourOhFour'
import {Button, Checkbox} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'
import moment from 'moment'
import statusMap from 'lib/status'

/**
 * <ActivityProgress/>
 */

function render ({props}) {
  const {activity, students} = props
  const {value, loading, error} = students

  if (loading) return <span/>
  if (error) return <FourOhFour />

  return (
    <Block w='col_main' m='auto' bgColor='white' boxShadow='card' p mb>
      <Header/>
      <Table wide border='1px solid rgba(black, .1)' fs='s' lighter>
        <TableRow>
          <THead>
            <Checkbox/>
          </THead>
          <THead>First</THead>
          <THead>Last</THead>
          <THead>Score</THead>
          <THead>Status</THead>
          <THead>Turned In</THead>
          <THead/>
        </TableRow>
        { value.items.map(student => <StudentRow activity={activity} student={student} />) }
      </Table>
    </Block>
  )
}

function Header () {
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

function THead ({props, children}) {
  return (
    <TableHeader
      bg='grey'
      color='white'
      textAlign='left'
      p
      lighter
      {...props}>
      { children }
    </TableHeader>
  )
}

function StudentRow ({props}) {
  const {student, activity} = props
  const {name} = student
  const {instances: {total: {'0': {actors}}}} = activity
  const actor = actors[student._id]
  const {status = 1, turnedInAt} = actor || {}
  const statProps = statusMap[status]
  const points = getPoints(activity, actor)

  return (
    <TableRow bg='#FDFDFD' borderBottom='1px solid rgba(black, .1)'>
      <TableCell p>
        <Checkbox/>
      </TableCell>
      <TableCell p>
        {name.givenName}
      </TableCell>
      <TableCell p>
        {name.familyName}
      </TableCell>
      <TableCell p>
        { points.points} / {points.total} ({points.percent})
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

function getPoints (activity, actor) {
  const total = totalPoints(activity)
  const points = actor ? (actor.pointsScaled * total) : 0
  const percent = Math.round(actor.pointsScaled * 100) + '%'

  return {
    total,
    points,
    percent,
  }
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
  students: `/group/students?group=${classId}`
}))({
  render
})
