/**
 * Imports
 */

import {Block, TableRow, TableCell} from 'vdux-ui'
import {Button, Checkbox} from 'vdux-containers'
import {setUrl} from 'redux-effects-location'
import statusMap from 'lib/status'
import element from 'vdux/element'
import index from '@f/index'
import moment from 'moment'

/**
 * Render
 */

function render ({props}) {
  const {instance, activityId, selected} = props
  const {
    status , turnedInAt, givenName, userId,
    familyName, points, total, percent, instanceId
  } = instance
  const selMap = index(selected)
  const statProps = statusMap[status]
  const url = `/activity/${activityId}/instance/${userId}`
  const p = '10px 12px'

  return (
    <TableRow bg='#FDFDFD' borderBottom='1px solid rgba(black, .1)'>
      <TableCell p={p}>
        <Checkbox pointer name='selected[]' value={instanceId} checked={!!selMap[instanceId]}/>
      </TableCell>
      <TableCell p={p}>
        {givenName}
      </TableCell>
      <TableCell p={p}>
        {familyName}
      </TableCell>
      <TableCell p={p}>
        { points} / {total} ({percent})
      </TableCell>
      <TableCell p={p}>
        <Block pill h={26} fs='14' align='center center' bg={statProps.teacherColor} color='white' capitalize w='108'>
          { statProps.displayName }
        </Block>
      </TableCell>
      <TableCell p={p}>
        {
          turnedInAt ? moment(turnedInAt).format('M/D/YY h:mm A') : '–'
        }
      </TableCell>
      <TableCell py={p.split(' ')[0]} w='68'>
        <Button text='Open' onClick={() => setUrl(url)} px='0' h='30' w='56'/>
      </TableCell>
    </TableRow>
  )
}

export default {
  render
}