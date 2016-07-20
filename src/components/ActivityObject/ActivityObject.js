/**
 * Imports
 */

import ActivityQuestion from 'components/ActivityQuestion'
import ActivityMedia from 'components/ActivityMedia'
import ActivityPost from 'components/ActivityPost'
import {Button} from 'vdux-containers'
import {Block} from 'vdux-containers'
import element from 'vdux/element'

/**
 * Type map
 */

const typeMap = {
  post: ActivityPost,
  question: ActivityQuestion,
  link: ActivityMedia,
  video: ActivityMedia,
  image: ActivityMedia,
  document: ActivityMedia
}

/**
 * <ActivityObject/>
 */

function render ({props}) {
  const {object, open, editing, editable, remove} = props
  const Obj = typeMap[object.objectType]
  const editableProps = {
    hoverProps: {bgColor: 'grey_light'},
    onClick: open,
    cursor: 'move'
  }

  if (!Obj) throw new Error('<ActivityObject/>: unknown object type: ' + object.objectType)

  return (
    <Block p={24} relative {...(editable && !editing ? editableProps : {})}>
      <Block absolute='top 50px right 50px' align='start center' hide={!editing}>
        <Button onClick={open}>Done</Button>
        <Button onClick={remove}>Remove</Button>
      </Block>
      <Obj {...props} />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
