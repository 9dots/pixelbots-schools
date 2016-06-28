/**
 * Imports
 */

import {Block, Table, TableHeader, TableRow, TableCell} from 'vdux-ui'
import FourOhFour from 'pages/FourOhFour'
import {Button} from 'vdux-containers'
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
      <Table wide border='1px solid rgba(black, .1)'>
        <TableRow>
          <THead>
            First
          </THead>
          <THead>
            Last
          </THead>
          <THead>
            Score
          </THead>
          <THead>
            Status
          </THead>
          <THead>
            Turned In
          </THead>
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
      {...props}>
      { children }
    </TableHeader>
  )
}

function StudentRow ({props}) {
  const {student, activity} = props
  const {name} = student
  const {instances: {total: {'0': {actors}}}} = activity
  const {status = 1, turnedInAt} = actors[student._id] || {}
  const statProps = statusMap[status]

  return (
    <TableRow bg='off_white' borderBottom='1px solid rgba(black, .1)'>
      <TableCell p>
        {name.givenName}
      </TableCell>
      <TableCell p>
        {name.familyName}
      </TableCell>
      <TableCell p>
        0 / 6 (0%)
      </TableCell>
      <TableCell p>
        <Block pill px='l' h={30} align='center center' bg={statProps.teacherColor} color='white' capitalize w='120'>
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
 * Exports
 */

export default summon(({classId}) => ({
  students: `/group/students?group=${classId}`
}))({
  render
})
