/**
 * Imports
 */

import ObjectControls from 'components/ObjectControls'
import ActivityMedia from 'components/ActivityMedia'
import MediaModal from 'modals/MediaModal'
import Resizer from 'components/Resizer'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import Figure from 'components/Figure'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <EditingMedia/>
 */

function render ({props}) {
  const {object, onEdit} = props
  return (
    <Block>
      {
        object.objectType === 'image'
          ? <ImageEdit {...props} />
          : <ActivityMedia {...props} editing={false} preview={true} />
      }
      <ObjectControls {...props} >
          <Button
            onClick={() => openModal(() => <MediaModal onAccept={newObj => onEdit({...object, ...newObj})} type={object.objectType} />)}
            uppercase
            bgColor='grey'
            mr='l'
            px>
            Change {object.objectType === 'rich' ? 'Media' : object.objectType}
          </Button>
          {
            object.objectType === 'image' &&
            <Block align='start center'>
              <AlignIcon {...props} justify='left' />
              <AlignIcon {...props} justify='center' mx />
              <AlignIcon {...props} justify='right' />
            </Block>
          }
      </ObjectControls>
    </Block>
  )
}

function AlignIcon ({props}) {
  const {justify, object, onEdit, ...rest} = props
  const selected = justify === (object.justify || 'center')
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

function ImageEdit ({props}) {
  const {object, onEdit, ...rest} = props
  const {image = {}, justify = 'center', zoom} = object

  return (
    <Block textAlign={justify} {...rest}>
      <Resizer onEnd={resize} object={object}>
        <Figure {...image} wide display='block' m={0}/>
      </Resizer>
    </Block>
  )

  function * resize (zoom) {
    yield onEdit({...object, zoom})
  }
}


/**
 * Exports
 */

export default {
  render
}
