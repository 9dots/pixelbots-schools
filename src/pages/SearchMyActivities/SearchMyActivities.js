/**
 * Imports
 */

import CreateActivityModal from 'modals/CreateActivityModal'
import EmptyState from 'components/EmptyState'
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
    <TileFeed emptyState={<EmptySearch query={props.query} />} {...props} />
  )
}

function EmptySearch({props}) {
  return(
    <EmptyState icon='assignment_ind' color='green'>
      You haven't created any activities for <Text bold>{props.query}</Text>
      <Block
        onClick={() => openModal(() => <CreateActivityModal />)}
        hoverProps={{underline: true}}
        color='blue'
        pointer>
        Create one now!
      </Block>
    </EmptyState>
  )
}

/**
 * Exports
 */

export default summonSearch('myShares', 'activities')({render})