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

function getStatus (instance) {
  if (instance.notStarted) return 'Not Started'
  if (instance.completed) return 'Completed'
  return 'In Progress'
}

export default component({
  render ({props, context}) {
    const {instance = {}, activityId, selected, sequence} = props

    const {
      turnedInAt, displayName, userId,
      points, instanceId, completed, playlist, key
    } = instance

    const statProps = {
      'Not Started': 'yellow',
      'In Progress': 'blue',
      'Completed': 'green'
    }
    const url = `http://localhost:8080/playlist/${playlist}/play/${key}`
    const p = '10px 12px'

    const status = getStatus(instance)
    const numCompleted = Object.keys(instance.completedChallenges || {}).length
    const total = Object.keys(sequence || {}).length || 1

    const percent = Math.round((numCompleted / total) * 10000) / 100

    return (
      <TableRow bg='#FDFDFD' borderBottom='1px solid rgba(black, .1)'>
        {/*<TableCell p={p}>
          <Checkbox pointer name='selected[]' value={instanceId} checked={selected} />
        </TableCell>*/}
        <TableCell p={p}>
          {displayName}
        </TableCell>
        <TableCell p={p}>
          {percent}%
        </TableCell>
        <TableCell p={p}>
          <Block pill h={26} fs='14' align='center center' bg={statProps[status]} color='white' capitalize w='108'>
            { status }
          </Block>
        </TableCell>
        {/*<TableCell pointerEvents={instance.notStarted ? 'none' : 'all'} py={p.split(' ')[0]} w='68'>
          <a href={url}>
          <Button disabled={instance.notStarted} text='View' px='0' h='30' w='56' />
          </a>
        </TableCell>*/}
      </TableRow>
    )
  }
})
