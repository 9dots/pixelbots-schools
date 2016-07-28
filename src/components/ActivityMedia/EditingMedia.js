/**
 * Imports
 */

import BlockInput from 'components/BlockInput'
import LineInput from 'components/LineInput'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <EditingMedia/>
 */

function render ({props}) {
  switch (props.object.objectType) {
    case 'link':
      return <LinkEdit {...props} />
    case 'video':
      return <LinkEdit {...props} />
    case 'document':
      return <FileEdit {...props} />
    case 'image':
      return <FileEdit {...props} />
  }
}

function LinkEdit ({props}) {
  return (
    <Block pt>
      <Input {...props} />
    </Block>
  )
}

function FileEdit ({props}) {
  return (
    <Block column bgColor='off_white' border='1px dashed grey_light' py={40} align='center center' color='grey_medium' pointer>
      <Block fs='m' lighter>
        Drag File or Click Here
      </Block>
      <Block mb='xl' mt>or paste a URL below</Block>
      <Input {...props} w='50%' mx='auto' mb />
    </Block>
  )
}

function Input ({props}) {
  const {object = {}, onEdit, placeholder, ...rest} = props

  return (
    <Block align='start stretch' onClick={e => e.stopPropagation()} {...rest}>
      <BlockInput
        onInput={e => onEdit({...object, originalContent: e.target.value})}
        defaultValue={object.originalContent}
        placeholder={placeholder || 'Enter a url...'}
        borderRightWidth={0}
        inputProps={{py: 8}}
        autofocus
        lighter
        fs='s'
        mb={0}/>
      <Button borderRadius='0'>
        Submit
      </Button>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
