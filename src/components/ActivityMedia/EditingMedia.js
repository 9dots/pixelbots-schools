/**
 * Imports
 */

import BlockInput from 'components/BlockInput'
import LineInput from 'components/LineInput'
import {Button} from 'vdux-containers'
import {Block, Image} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <EditingMedia/>
 */

function render ({props}) {
  switch (props.editObject.objectType) {
    case 'link':
      return <Edit {...props} />
    case 'video':
      return <Edit {...props} />
    case 'document':
      return <Edit {...props} />
    case 'image':
      return <Edit {...props} />
  }
}

function Edit({props}) {
  const {editObject, object = {}, onEdit} = props
  const {originalContent} = editObject
  const {image = {}} = object
  const {url, height, width} = image
  return (
    <Block pt>
      {
        object.embed &&
          <Block relative h={280} bgColor='off_white' border='1px solid grey_light' mb>
              <Image
                maxHeight='100%'
                maxWidth='100%'
                borderLeft='1px solid grey_light'
                borderRight='1px solid grey_light'
                absolute top bottom right left
                src={url}
                m='auto'/>
          </Block>
      }
      <Block align='start stretch'>
        <Input editObject={editObject} onEdit={onEdit}/>
        <Button borderRadius='0'>
          Submit
        </Button>
      </Block>
      <Block align='center center' h={125} bgColor='off_white' border='1px dashed grey_light' borderTopWidth={0} fs='s' color='grey_medium' lighter>
        Drag File or Click Here
      </Block>
    </Block>
  )
}

function Input ({props}) {
  const {editObject = {}, onEdit} = props
  return (
    <BlockInput
      onInput={e => onEdit({...editObject, originalContent: e.target.value})}
      defaultValue={editObject.originalContent}
      placeholder='Enter a url...'
      borderRightWidth={0}
      lighter
      inputProps={{py: 8}}
      fs='s'
      mb={0}/>
  )
}

/**
 * Exports
 */

export default {
  render
}
