/**
 * Imports
 */

import ActivityRow from 'components/ActivityRow'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * <Drafts/> page
 */

function render ({props}) {
  const {trash} = props
  const {loading, value} = trash

  return (
    <Block>
      {
        loading || value.items.map(draft => <ActivityRow activity={draft} />)
      }
    </Block>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  trash: `/share?channel=user!${props.currentUser._id}.trash&maxResults=20`
}), {
  render
})
