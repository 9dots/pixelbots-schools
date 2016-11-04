/**
 * Imports
 */

import ActivityQuestion from 'components/ActivityQuestion'
import ActivityMedia from 'components/ActivityMedia'
import {CSSContainer, wrap} from 'vdux-containers'
import ActivityPost from 'components/ActivityPost'
import {component, element} from 'vdux'
import {Block, Icon} from 'vdux-ui'

/**
 * Type map
 */

const typeMap = {
  post: ActivityPost,
  question: ActivityQuestion,
  link: ActivityMedia,
  video: ActivityMedia,
  image: ActivityMedia,
  document: ActivityMedia,
  rich: ActivityMedia,
  file: ActivityMedia
}

const editingProps = {
  boxShadow: '0 0 12px rgba(black, .5)',
  z: 2
}

/**
 * <ActivityObject/>
 */

export default wrap(CSSContainer, ({editable}) => editable
  ? {hoverProps: {hover: true}}
  : {}
)(component({
  render ({props}) {
    const {object, open, editing, editable, hover, opening, ...rest} = props
    if (!object.objectType) object.objectType = 'link'
    const Obj = typeMap[object.objectType]
    const editableProps = {
      onClick: open && open(object._id),
      bgColor: hover ? 'off_white' : 'white'
    }

    if (!Obj) throw new Error('<ActivityObject/>: unknown object type: ' + object.objectType)

    return (
      <Block
        opacity={opening ? 0.5 : 1}
        pageBreakInside='avoid'
        printProps={{p: 16}}
        bgColor='white'
        p={24}
        relative
        {...(editable && !editing ? editableProps : {})}
        {...(editing ? editingProps : {})}
        {...rest}>
        <Obj key={object._id} {...props} />
        {
          editable && (!editing && hover) &&
            <Icon
              absolute={{top: 0, left: 0}}

              color='grey_medium'
              name='drag_handle'
              textAlign='center'
              class='handle'
              cursor='move'
              h={24}
              wide />
        }
      </Block>
    )
  }
}))
