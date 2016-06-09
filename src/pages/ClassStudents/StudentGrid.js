/**
 * Imports
 */

import {Flex, Checkbox, Table, TableHeader, TableCell, Block} from 'vdux-ui'
import {wrap, CSSContainer, TableRow, Button} from 'vdux-containers'
import StudentDropdown from './StudentDropdown'
import Avatar from 'components/Avatar'
import element from 'vdux/element'
import index from '@f/index'
import map from '@f/map'

/**
 * <StudentGrid/> in class -> students page
 */

function render ({props}) {
  const {students, selected, group, toggleAll} = props
  const selMap = index(selected)
  const allSelected = students.length === selected.length
  const indeterminate = !allSelected && selected.length
  const headerProps = {p: true, textAlign: 'left'}
  return (
    <Table bgColor='white' wide tall>
      <TableRow py bgColor='grey' color='white'>
        <TableHeader {...headerProps}>
          <Checkbox checked={allSelected} indeterminate={indeterminate} onChange={() => toggleAll('selected')} />
        </TableHeader>
        <TableHeader {...headerProps}>
          First Name
        </TableHeader>
        <TableHeader {...headerProps}>
          Last Name
        </TableHeader>
        <TableHeader {...headerProps}>
          Username
        </TableHeader>
        <TableHeader />
      </TableRow>
      {
        map(student => (
          <StudentRow group={group} student={student} highlight={!!selMap[student._id]} selected={!!selMap[student._id]} />
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
    const {student, selected, group, highlight, showSettings} = props
    const {name, username} = student
    const {givenName, familyName} = name
    const cellProps = {p: '10px 12px'}

    return (
      <TableRow tag='label' display='table-row' py bgColor={highlight ? '#fafdfe' : 'white'} borderBottom='1px solid grey_light'>
        <TableCell {...cellProps}>
          <Checkbox name='selected[]' value={student._id} checked={selected}>
            <Avatar display='flex' actor={student} ml='10px' sq='26' />
          </Checkbox>
        </TableCell>
        <TableCell {...cellProps}>
          {givenName}
        </TableCell>
        <TableCell {...cellProps}>
          {familyName}
        </TableCell>
        <TableCell {...cellProps}>
          {username}
        </TableCell>
        <TableCell {...cellProps} textAlign='right'>
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
