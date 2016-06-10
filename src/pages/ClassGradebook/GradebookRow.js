/**
 * Imports
 */

import {TableRow, TableCell, Block} from 'vdux-ui'
import element from 'vdux/element'
import map from '@f/map'


/**
 * <GradebookRow/>
 */

function render ({props}) {
  const {student, activities, odd, last} = props
  const {name: {givenName}, name: {familyName}} = student
  const nameCell = {
    borderRightWidth: 0,
    textAlign: 'left'
  }
  const cellProps = {
    bgColor: odd ? 'white' : 'off_white',
    borderBottom: last ? '' : '1px solid rgba(black, .1)',
    borderRight: '1px solid rgba(black, .1)',
    textAlign: 'center',
    p: '16px',
    minWidth: 75
  }

  return (
    <TableRow borderBottom={last ? '' : '1px solid rgba(black, .1)'}>
      <TableCell {...cellProps} {...nameCell}>
        {givenName}
      </TableCell>
      <TableCell {...cellProps} {...nameCell}>
        {familyName}
      </TableCell>
      <TableCell reltive {...cellProps} color='blue' bold relative>
        87%
        <Block
          bg='linear-gradient(to right, rgba(52,52,52,0.22), rgba(52,52,52,0))'
          h='calc(100% + 1px)'
          left='100%'
          top='-1px'
          absolute
          w='4'/>
      </TableCell>
      {
        map(activity => <GradeCell {...cellProps} activity={activity} student={student}/>, activities)
      }
    </TableRow>
  )
}

function GradeCell ({props}) {
  const {student, activity, ...rest} = props

  const grade = activity.instances.total.length
    ? activity.instances.total[0].actors[student._id]
    : false
  return (
    <TableCell {...rest}>
      {grade ? grade.pointsScaled : '-' }
    </TableCell>
  )
}


/**
 * Exports
 */

export default {
  render
}