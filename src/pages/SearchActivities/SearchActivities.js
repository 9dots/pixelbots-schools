/**
 * Imports
 */

import CreateActivityModal from 'modals/CreateActivityModal'
import EmptyState from 'components/EmptyState'
import summonSearch from 'lib/summon-search'
import TileFeed from 'components/TileFeed'
import {openModal} from 'reducer/modal'
import {Text} from 'vdux-containers'
import {Block} from 'vdux-ui'
import element from 'vdux/element'

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
    <EmptyState icon='assignment' color='red'>
      Sorry, we couldn't find any activities for <Text bold>{props.query}</Text>
      <br/>
      Be the first to&nbsp;
      <Text
        onClick={() => openModal(() => <CreateActivityModal />)}
        hoverProps={{underline: true}}
        color='blue'
        pointer>
        create your own!
      </Text>
    </EmptyState>
  )
}

/**
 * Exports
 */

export default summonSearch('shares', 'activities')({render})
