/**
 * Imports
 */

import PageTitle from 'components/PageTitle'
import TileFeed from 'components/TileFeed'
import {component, element} from 'vdux'
import EmptyFeed from './EmptyFeed'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
import fire from 'vdux-fire'

/**
 * <Feed/>
 */

export default fire(props => ({
  activities: `/feed/`
}))(component({
  render ({props}) {
    const {activities, more, currentUser} = props
    const {preferences = {}} = currentUser

    if (!preferences.group_joined) return <EmptyFeed />

    return (
      <Block w='col_xl' mx='auto'>
        <PageTitle title='Weo' />
        <TileFeed currentUser={currentUser} activities={activities} more={more} emptyState={<EmptyFeed follow />} skip={555} columns={3} mt={-8} ml={-6} />
      </Block>
    )
  }
}))
