/**
 * Imports
 */

import CreateActivityModal from 'modals/CreateActivityModal'
import EmptyState from 'components/EmptyState'
import summonSearch from 'lib/summon-search'
import TileFeed from 'components/TileFeed'
import {component, element} from 'vdux'
import {Text} from 'vdux-containers'
import {Block} from 'vdux-ui'

/**
 * <SearchActivities/>
 */

export default summonSearch('shares', 'activities')(component({
  render ({props}) {
    return (
      <TileFeed emptyState={<EmptySearch query={props.query} currentUser={props.currentUser} />} {...props} />
    )
  }
}))

/**
 * <EmptySearch/>
 */

const EmptySearch = component({
  render ({props, actions}) {
    const {currentUser} = props

    return(
      <EmptyState icon='assignment' color='red'>
        Sorry, we couldn't find any activities for <Text bold>{props.query}</Text>
        <br/>
        Be the first to&nbsp;
        <Text
          onClick={actions.createActivity}
          hoverProps={{underline: true}}
          color='blue'
          pointer>
          create your own!
        </Text>
      </EmptyState>
    )
  },

  events: {
    * createActivity ({context, props}) {
      yield context.openModal(() => <CreateActivityModal currentUser={props.currentUser} />)
    }
  }
})
