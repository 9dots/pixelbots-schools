/**
 * Imports
 */

import ActivityQuestion from 'components/ActivityQuestion'
import ActivityMedia from 'components/ActivityMedia'
import ActivityPost from 'components/ActivityPost'
import {Block, Button} from 'vdux-containers'
import element from 'vdux/element'
import {Icon} from 'vdux-ui'

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
    hoverProps: {bgColor: 'rgba(grey_light, .2)'},
    onClick: open,
    cursor: 'move'
  }

  const editingProps = {
    bgColor: '#FEFEFE',
    boxShadow: '0 0 12px rgba(black, .5)',
    mx: -6
  }

  if (!Obj) throw new Error('<ActivityObject/>: unknown object type: ' + object.objectType)

  return (
    <Block p={24} relative {...(editable && !editing ? editableProps : {})} printProps={{p: 16}} pageBreakInside='avoid' z={2} {...(editing ? editingProps : {})}>
      <Obj {...props} />
      <Block p m={-24} mt='l' borderTop='1px solid grey_light' bgColor='off_white' align='end center' hide={!editing}>
        <Button onClick={open} mr='s' px h={32}>Done</Button>
        <Button onClick={remove} bgColor='rgba(grey_light, .3)' border='1px solid grey_medium' px h={32}>
          <Icon fs='s' name='delete' color='text' />
        </Button>
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
