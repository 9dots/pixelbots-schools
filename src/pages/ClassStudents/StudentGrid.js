/**
 * Imports
 */

import {Table, TableRow, TableHeader, TableCell} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <StudentGrid/> in class -> students page
 */

function render ({props}) {
  const {students} = props

  return (
    <Table>
      <TableRow bgColor='grey_dark'>
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
        students.map(student => (
          <TableRow>
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
        ))
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
