/**
 * Imports
 */

import ObjectControls from 'components/ObjectControls'
import ActivityMedia from 'components/ActivityMedia'
import MediaModal from 'modals/MediaModal'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <EditingMedia/>
 */

function render ({props}) {
  const {object} = props
  return (
    <Block>
      <ActivityMedia {...props} editing={false} />
      <ObjectControls {...props} >
        <Block align='start center'>
          <Button px bgColor='grey' mr='l' capitalize onClick={() => openModal(() => <MediaModal object={object} />)}>
            Change {object.objectType}
          </Button>
          {
            object.objectType === 'image' &&
            <Block align='start center'>
              <AlignIcon {...props} justify='left' />
              <AlignIcon {...props} justify='center' mx />
              <AlignIcon {...props} justify='right' />
            </Block>
          }
        </Block>
      </ObjectControls>
    </Block>
  )
}

function AlignIcon ({props}) {
  const {justify, object, onEdit, ...rest} = props
  const selected = justify === (object.justify || 'left')
  return (
    <Button
      onClick={() => onEdit({...object, justify})}
      color={selected ? 'text' : 'grey_medium'}
      icon={`format_align_${justify}`}
      hoverProps={{color: 'text'}}
      fs={24}
      {...rest} />
  )
}

/**
 * Exports
 */

export default {
  render
}
