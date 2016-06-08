/**
 * Imports
 */

import {Flex, Checkbox, Table, TableHeader, TableCell} from 'vdux-ui'
import {wrap, CSSContainer, TableRow, Button} from 'vdux-containers'
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
          <Button
            hoverProps={{bgColor: 'rgba(black, .1)'}}
            activeProps={{bgColor: 'rgba(black, .2)'}}
            hidden={!showSettings}
            icon='settings'
            color='text'
            circle='26'
            fs='xs'
            />
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
