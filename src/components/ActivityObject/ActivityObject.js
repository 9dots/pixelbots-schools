/**
 * Imports
 */

import ActivityQuestion from 'components/ActivityQuestion'
import {getOverviewQuestions} from 'lib/activity-helpers'
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
    hoverProps: {bgColor: 'off_white'},
    onClick: open
  }

  const editingProps = {
    boxShadow: '0 0 12px rgba(black, .5)',
    z: 2
  }

  if (!Obj) throw new Error('<ActivityObject/>: unknown object type: ' + object.objectType)

  return (
    <Block
      pageBreakInside='avoid'
      printProps={{p: 16}}
      bgColor='white'
      relative
      p={24}
      {...(editable && !editing ? editableProps : {})}
      {...(editing ? editingProps : {})}>
      <Obj {...props} />
      <Block p m={-24} mt={36} borderTop='1px solid grey_light' bgColor='off_white' align='end center' hide={!editing}>
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
