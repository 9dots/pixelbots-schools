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
  const {student, data, scores, odd, last, currentUser, asPercent, page} = props
  const {userType, _id: uid} = currentUser
  const {name: {givenName, familyName}, _id: sid} = student
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
        <Block ellipsis w={71}>
          {givenName}
        </Block>
      </TableCell>
      <TableCell {...cellProps} {...nameCell}>
        <Block ellipsis w={71}>
          {familyName}
        </Block>
      </TableCell>
      <TableCell color='blue' bold relative {...cellProps}>
        {data.percent || '0%'}
        <ShadowBlock/>
      </TableCell>
      {
        map(({percent, points}) => (
          <TableCell {...cellProps}>
            {asPercent ? percent : points}
          </TableCell>
        ), scores)
      }
    </TableRow>
  )
}

function ShadowBlock () {
  return (
    <Block
      bg='linear-gradient(to right, rgba(52,52,52,0.15), rgba(52,52,52,0))'
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
