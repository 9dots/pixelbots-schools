/**
 * Imports
 */

import TileFeed from 'components/TileFeed'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * <SearchActivities/>
 */

function render ({props}) {
  const {activities} = props
  const {value, loading} = activities

  return (
    <Block>
      {
        loading
          ? 'Loading...'
          : <TileFeed items={value.items} />
      }
    </Block>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  activities: `/search/shares?query=${props.query}&maxResults=12`
}), {
  render
})
