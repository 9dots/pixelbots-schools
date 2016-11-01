/**
 * Imports
 */

import ObjectControls from 'components/ObjectControls'
import ActivityMedia from 'components/ActivityMedia'
import MediaModal from 'modals/MediaModal'
import Resizer from 'components/Resizer'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import Figure from 'components/Figure'
import {Block, Icon} from 'vdux-ui'

/**
 * <EditingMedia/>
 */

export default component({
  render ({props}) {
    const {object, onEdit} = props

    return (
      <Block>
        {
          object.objectType === 'image'
            ? <ImageEdit {...props} {...actions} />
            : <ActivityMedia {...props} editing={false} preview={true} />
        }
        <ObjectControls {...props} >
            <Button
              onClick={actions.openMediaModal}
              uppercase
              bgColor='grey'
              mr='l'
              px>
              Change {object.objectType === 'rich' ? 'Media' : object.objectType}
            </Button>
            {
              object.objectType === 'image' &&
              <Block align='start center'>
                <AlignIcon {...props} {...actions} justify='left' />
                <AlignIcon {...props} {...actions} justify='center' mx />
                <AlignIcon {...props} {...actions} justify='right' />
              </Block>
            }
        </ObjectControls>
      </Block>
    )
  },

  events: {
    * updateObject ({props}, newObj) {
      yield props.onEdit({...props.object, ...newObj})
    },

    * updateZoom ({actions}, zoom) {
      yield actions.updateObject({zoom})
    },

    * openMediaModal ({context, actions}) {
      yield context.openModal(() => <MediaModal onAccept={actions.updateObject} type={object.objectType} />)
    }
  }
})

/**
 * <AlignIcon/>
 */

function AlignIcon ({props}) {
  const {justify, object, updateObject, ...rest} = props
  const selected = justify === (object.justify || 'center')

  return (
    <Button
      onClick={updateObject({justify})}
      color={selected ? 'text' : 'grey_medium'}
      icon={`format_align_${justify}`}
      hoverProps={{color: 'text'}}
      fs={24}
      {...rest} />
  )
}

/**
 * <ImageEdit/>
 */

function ImageEdit ({props}) {
  const {object, updateZoom, ...rest} = props
  const {image = {}, justify = 'center', zoom} = object

  return (
    <Block textAlign={justify} {...rest}>
      <Resizer onEnd={updateZoom} object={object}>
        <Figure {...image} wide display='block' m={0}/>
      </Resizer>
    </Block>
  )
}
