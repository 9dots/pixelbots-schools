/**
 * Imports
 */

import ActivityQuestion from 'components/ActivityQuestion'
import ActivityMedia from 'components/ActivityMedia'
import ActivityPost from 'components/ActivityPost'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <ActivityObject/>
 */

function render ({props}) {
  const {object} = props

  return (
    <Block p={24}>
      {
        renderObject(object, props)
      }
    </Block>
  )
}

function renderObject (object, props) {
  switch (object.objectType) {
    case 'post':
      return <ActivityPost {...props} />
    case 'question':
      return <ActivityQuestion {...props} />
    case 'link':
    case 'video':
    case 'image':
    case 'document':
      return <ActivityMedia {...props} />
  }
}

/**
 * Exports
 */

export default {
  render
}
