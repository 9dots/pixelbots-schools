/**
 * Imports
 */

import RowFeed from 'components/RowFeed'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * <Drafts/> page
 */

function render ({props}) {
  const {drafts, more} = props
  const {loading, value} = drafts

  return (
    <Block>
      {
        loading || <RowFeed items={value.items} more={() => more(value && value.nextPageToken)} />
      }
    </Block>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  drafts: `/share?channel=user!${props.currentUser._id}.drafts&maxResults=20`,
  more: pageToken => ({
    drafts: {
      fragment: pageToken && `&pageToken=${pageToken}`
    }
  })
}), {
  render
})
