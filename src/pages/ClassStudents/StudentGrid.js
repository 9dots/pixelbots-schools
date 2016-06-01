/**
 * Imports
 */

import {Flex, Checkbox, Table, TableRow, TableHeader, TableCell} from 'vdux-ui'
import Avatar from 'components/Avatar'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <StudentGrid/> in class -> students page
 */

function render ({props}) {
  const {students, selected, toggleAll} = props
  console.log('selected', selected)

  return (
    <Table bgColor='white' wide tall>
      <TableRow py bgColor='grey' color='white'>
        <TableHeader>
          <Checkbox />
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
          <TableRow py>
            <TableCell>
              <Checkbox checkedValue={student._id} checked={selected.indexOf(student._id) !== -1}>
                <Avatar actor={student} />
              </Checkbox>
            </TableCell>
            <TableCell>
              {student.name.givenName}
            </TableCell>
            <TableCell>
              {student.name.familyName}
            </TableCell>
            <TableCell>
              {student.username}
            </TableCell>
          </TableRow>
        ), students)
      }
    </Table>
  )
}

/**
 * Exports
 */

export default {
  render
}
