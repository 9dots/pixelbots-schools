/**
 * Imports
 */

import CreateActivityModal from 'modals/CreateActivityModal'
import summonSearch from 'lib/summon-search'
import {Text, Block} from 'vdux-containers'
import TileFeed from 'components/TileFeed'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'
import {Icon} from 'vdux-ui'

/**
 * SearchActivities
 */

function render({props}) {
  return (
    <TileFeed emptyState={<EmptyState query={props.query} />} {...props} />
  )
}

function EmptyState({props}) {
  return(
    <Block p textAlign='center' w='col_main'>
      <Icon name='assignment_ind' fs='xxl' color='green'/>
      <Block fs='s' lighter mx='auto' w='col_m'>
        You haven't created any activities for <Text bold>{props.query}</Text>
        <Block
          onClick={() => openModal(() => <CreateActivityModal />)}
          hoverProps={{underline: true}}
          color='blue'
          pointer>
          Create one now!
        </Block>
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default summonSearch('myShares', 'activities')({render})