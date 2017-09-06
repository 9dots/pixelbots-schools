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
    const {instance = {}, activityId, selected, sequence, classRef} = props

    const {
      turnedInAt, displayName, uid, challengeScores = {},
      points, instanceId, playlist, key, completedChallenges = {},
    } = instance

    const statProps = {
      'Not Started': 'yellow',
      'In Progress': 'blue',
      'Completed': 'green'
    }


    const p = '10px 12px'

    const status = getStatus(instance)
    const score = Object.keys(challengeScores).reduce((sum, key) => sum + (challengeScores[key] || 0), 0)
    const total = Object.keys(sequence || {}).length || 1
    const percent = Math.round((score / total) * 10000) / 100
    const progress = (completedChallenges.length || 0) / sequence.length * 100

    return (
      <TableRow bg='#FDFDFD' borderBottom='1px solid rgba(black, .1)'>
        {/*<TableCell p={p}>
          <Checkbox pointer name='selected[]' value={instanceId} checked={selected} />
        </TableCell>*/}
        <TableCell p={p}>
          {displayName}
        </TableCell>
        <TableCell p={p}>
          <Block relative w={100} h={26} bg='#CCC' overflow='hidden' align='center center' fs='14' color='white' borderRadius='99'>
            <Block absolute left tall w={progress + '%'} bg={statProps[status]} />
            {completedChallenges.length || 0} / {sequence.length} 
          </Block>
          
          {
            // percent || 0 + '%'
          }
        </TableCell>
        <TableCell p={p}>
          <Block fs='14'  color={statProps[status]} uppercase bold>
            { status }
          </Block>
        </TableCell>
        {
        <TableCell pointerEvents={instance.notStarted ? 'none' : 'all'} py={p.split(' ')[0]} w='68'>
          <a href={`/activity/${classRef}/${playlist}/${uid}`}>
          <Button disabled={instance.notStarted} text='More' px='0' h='30' w='56' />
          </a>
        </TableCell>
         }
      </TableRow>
    )
  }
})
