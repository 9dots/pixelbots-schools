/**
 * Imports
 */

import {Flex, Checkbox, Table, TableHeader, TableCell, Icon} from 'vdux-ui'
import {wrap, CSSContainer, TableRow} from 'vdux-containers'
import Avatar from 'components/Avatar'
import element from 'vdux/element'
import index from '@f/index'
import map from '@f/map'

/**
 * <StudentGrid/> in class -> students page
 */

function render ({props}) {
  const {students, selected, toggleAll} = props
  const selMap = index(selected)
  const allSelected = students.length === selected.length
  const indeterminate = !allSelected && selected.length

  return (
    <Table bgColor='white' wide tall>
      <TableRow py bgColor='grey' color='white'>
        <TableHeader>
          <Checkbox checked={allSelected} indeterminate={indeterminate} onChange={() => toggleAll('selected')} />
        </TableHeader>
        <TableHeader>
          First Name
        </TableHeader>
        <TableHeader>
          Last Name
        </TableHeader>
        <TableHeader>
          Username
        </TableHeader>
      </TableRow>
      {
        map(student => (
          <StudentRow student={student} highlight={!!selMap[student._id]} selected={!!selMap[student._id]} />
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
    const {student, selected, highlight, showSettings} = props
    const {name, username} = student
    const {givenName, familyName} = name

    return (
      <TableRow py bgColor={highlight ? '#fafdfe' : 'white'}>
        <TableCell>
          <Checkbox name='selected[]' value={student._id} checked={selected}>
            <Avatar actor={student} />
          </Checkbox>
        </TableCell>
        <TableCell>
          {givenName}
        </TableCell>
        <TableCell>
          {familyName}
        </TableCell>
        <TableCell>
          {username}
        </TableCell>
        <TableCell>
          <Icon hidden={!showSettings} name='settings' />
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
