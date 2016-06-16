/**
 * Imports
 */

import {Flex, Checkbox, Table, TableHeader, TableCell, Block} from 'vdux-ui'
import {wrap, CSSContainer, TableRow, Button} from 'vdux-containers'
import StudentDropdown from './StudentDropdown'
import Avatar from 'components/Avatar'
import Link from 'components/Link'
import element from 'vdux/element'
import index from '@f/index'
import map from '@f/map'

/**
 * <StudentGrid/> in class -> students page
 */

function render ({props}) {
  const {students, selected, group, toggleAll, isStudent} = props
  const selMap = index(selected)
  const allSelected = students.length === selected.length
  const indeterminate = !allSelected && selected.length
  const headerProps = {p: true, textAlign: 'left'}
  return (
    <Table bgColor='white' wide tall>
      <TableRow py bgColor='grey' color='white'>
        <TableHeader {...headerProps} w='40' hide={isStudent}>
          <Checkbox checked={allSelected} indeterminate={indeterminate} onChange={() => toggleAll('selected')} />
        </TableHeader>
        <TableHeader w='40'/>
        <TableHeader {...headerProps}>
          First Name
        </TableHeader>
        <TableHeader {...headerProps}>
          Last Name
        </TableHeader>
        <TableHeader {...headerProps}>
          Username
        </TableHeader>
        <TableHeader hide={isStudent} />
      </TableRow>
      {
        map(student => (
          <StudentRow group={group} student={student} highlight={!!selMap[student._id]} selected={!!selMap[student._id]} isStudent={isStudent} />
        ), students)
      }
    </Table>
  )
}

const StudentRow = wrap(CSSContainer, {
  hoverProps: {
    highlight: true,
    showSettings: true
  }
})({
  render ({props}) {
    const {student, selected, group, highlight, showSettings, isStudent} = props
    const {name, username} = student
    const {givenName, familyName} = name
    const cellProps = {p: '10px 12px'}

    return (
      <TableRow tag='label' display='table-row' py bgColor={highlight && !isStudent ? '#fafdfe' : 'white'} borderBottom='1px solid grey_light'>
        <TableCell {...cellProps} hide={isStudent}>
          <Checkbox name='selected[]' value={student._id} checked={selected}/>
        </TableCell>
        <TableCell {...cellProps}>
          <Avatar display='flex' actor={student} mr='s' sq='26' />
        </TableCell>
        <TableCell {...cellProps}>
          <Link hoverProps={{underline: true}} href={`/${username}/stream`}>
            {givenName}
          </Link>
        </TableCell>
        <TableCell {...cellProps}>
          <Link hoverProps={{underline: true}} href={`/${username}/stream`}>
            {familyName}
          </Link>
        </TableCell>
        <TableCell {...cellProps}>
          <Link hoverProps={{underline: true}} href={`/${username}/stream`}>
            {username}
          </Link>
        </TableCell>
        <TableCell {...cellProps} textAlign='right' hide={isStudent}>
          <StudentDropdown
            group={group}
            onClick={e => e.preventDefault()}
            showSettings={showSettings}
            student={student}/>
        </TableCell>
      </TableRow>
    )
  }
})


/**
 * Exports
 */

export default {
  render
}
