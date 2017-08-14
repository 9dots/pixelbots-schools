/**
 * Imports
 */

import {Block, TableRow, TableCell} from 'vdux-ui'
import {Button, Checkbox} from 'vdux-containers'
import {component, element} from 'vdux'
import statusMap from 'lib/status'
import moment from 'moment'

/**
 * <ActivityProgressRow/>
 */

export default component({
  render ({props, context}) {
    const {instance = {}, activityId, selected, sequence} = props

    const {
      status, turnedInAt, displayName, userId,
      points, instanceId
    } = instance
    const statProps = statusMap[status] || {}
    const url = `/activity/${activityId}/instance/${userId}`
    const p = '10px 12px'

    const completed = Object.keys(instance.completedChallenges || {}).length
    const total = Object.keys(sequence || {}).length || 1

    const percent = Math.round((completed / total) * 10000) / 100

    return (
      <TableRow bg='#FDFDFD' borderBottom='1px solid rgba(black, .1)'>
        <TableCell p={p}>
          <Checkbox pointer name='selected[]' value={instanceId} checked={selected} />
        </TableCell>
        <TableCell p={p}>
          {displayName}
        </TableCell>
        <TableCell p={p}>
          {percent}%
        </TableCell>
        <TableCell p={p}>
          <Block pill h={26} fs='14' align='center center' bg={statProps.teacherColor} color='white' capitalize w='108'>
            { statProps.displayName }
          </Block>
        </TableCell>
        <TableCell py={p.split(' ')[0]} w='68'>
          <Button text='Open' onClick={context.setUrl(url)} px='0' h='30' w='56' />
        </TableCell>
      </TableRow>
    )
  }
})
