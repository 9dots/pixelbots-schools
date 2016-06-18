/**
 * Imports
 */

import {TableRow, TableCell, Block} from 'vdux-ui'
import element from 'vdux/element'
import map from '@f/map'

/**
 * Total
 */

let totalScaled = 0

/**
 * <GradebookRow/>
 */

function render ({props}) {
  const {student, activities, odd, last, currentUser} = props
  const {userType, _id: uid} = currentUser
  const {name: {givenName}, name: {familyName}, _id: sid} = student
  const isStudent = userType === 'student'
  const nameCell = {
    borderRightWidth: 0,
    textAlign: 'left',
  }
  const cellProps = {
    bgColor: odd ? 'white' : 'off_white',
    borderBottom: last ? '' : '1px solid #E9E9E9',
    borderRight: '1px solid #E9E9E9',
    textAlign: 'center',
    p: isStudent ? '40px 16px' : '16px',
  }

  if(isStudent && sid !== uid) return <span/>

  return (
    <TableRow borderBottom={last ? '' : '1px solid rgba(black, .1)'}>
      <TableCell {...cellProps} {...nameCell}>
        <Block ellipsis w={80}>
          {givenName}
        </Block>
      </TableCell>
      <TableCell {...cellProps} {...nameCell}>
        <Block ellipsis w={80}>
          {familyName}
        </Block>
      </TableCell>
      <TableCell reltive {...cellProps} color='blue' bold relative>
        {Math.round(totalScaled / activities.length * 100) }%
        <ShadowBlock/>
      </TableCell>
      {
        map(activity => <GradeCell activity={activity} student={student} {...cellProps}/>, activities)
      }
    </TableRow>
  )
}

function GradeCell ({props}) {
  const {student, activity, ...rest} = props
  const {status, instances: {total}} = activity
  const instance = total.length
    ? total[0].actors[student._id]
    : false

  if(!instance) return <TableCell {...rest}>-</TableCell>

  totalScaled += instance.status >= 5 ? instance.pointsScaled : 0
  const scaled = Math.round(instance.pointsScaled * 100) / 100
  const percent = Math.round(scaled * 100) + '%'

  return (
    <TableCell {...rest}>
      { instance.status >= 5 ? percent  : '-' }
    </TableCell>
  )
}

function ShadowBlock () {
  return (
    <Block
      bg='linear-gradient(to right, rgba(52,52,52,0.22), rgba(52,52,52,0))'
      h='calc(100% + 1px)'
      left='100%'
      top='-1px'
      absolute
      w='4'/>
  )
}


/**
 * Exports
 */

export default {
  render
}