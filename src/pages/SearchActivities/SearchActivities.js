/**
 * Imports
 */

import CreateActivityModal from 'modals/CreateActivityModal'
import summonSearch from 'lib/summon-search'
import TileFeed from 'components/TileFeed'
import {openModal} from 'reducer/modal'
import {Text} from 'vdux-containers'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

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
      <Icon name='assignment' fs='xxl' color='red'/>
      <Block fs='s' lighter mx='auto' w='col_m'>
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
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default summonSearch('shares', 'activities')({render})
