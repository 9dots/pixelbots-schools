/**
 * Imports
 */

import ObjectControls from 'components/ObjectControls'
import BlockInput from 'components/BlockInput'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import DropZone from 'components/DropZone'
import {Block, Icon, Base} from 'vdux-ui'
import Figure from 'components/Figure'
import {Button} from 'vdux-containers'
import element from 'vdux/element'

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
      return <ChangeFile {...props} />
    case 'image':
      return <ImageEdit {...props} />
  }
}

/**
 * Link / Video
 */

function LinkEdit ({props}) {
  return (
    <Block>
      <MediaInput mt={20} w='70%' mx='auto' {...props} />
      <ObjectControls {...props} />
    </Block>
  )
}

/**
 * Image / Document
 */

const toggleEdit = createAction('<ImageEdit/>: toggleEdit')

const ImageEdit = {
  initialState ({props, state}) {
    return {
      editMode: props.object && props.object.image
    }
  },
  render ({props, state, local}) {
    return (
      state.editMode
        ? <PreviewImage toggle={local(toggleEdit)} {...props} />
        : <ChangeFile toggle={local(toggleEdit)} {...props} />
    )
  },
  reducer: handleActions({
    [toggleEdit]: state => ({
      ...state,
      editMode: !state.editMode
    })
  })
}

function ChangeFile ({props}) {
  const {object = {}, toggle} = props
  return (
    <Block>
      <DropZone
        dragonProps={{
          bgColor: 'rgba(blue, .1)',
          color: 'blue_medium',
          message: 'Drop File',
          border: '1px solid rgba(blue, .4)',
          boxShadow: '0 0 1px rgba(blue, .7)'
        }}
        message={<Upload {...props}/>}
        border='1px dashed grey_light'
        align='center center'
        color='grey_medium'
        bgColor='off_white'
        relative
        lighter
        fs='m'
        h={215}>
        <Base
          absolute={{top: 0, left: 0}}
          // onChange={upload}
          type='file'
          opacity='0'
          tag='input'
          sq='100%'
          pointer />
      </DropZone>
      <ObjectControls {...props}>
        {
          object.image && object.objectType === 'image' &&
          <Button bgColor='grey' onClick={toggle}>
            Cancel
          </Button>
        }
      </ObjectControls>
    </Block>
  )
}

function Upload({props}) {
  return (
    <Block flex textAlign='center'>
      Drag File or Click Here
      <Block mb='xl' fs='xs' fw='normal' mt>
        or paste a URL below
      </Block>
      <MediaInput relative z={1} {...props} w='50%' mx='auto' />
    </Block>
  )
}

function PreviewImage ({props}) {
  const {object, toggle} = props
  const {image, justify} = object
  return (
    <Block>
      <Block textAlign={justify}>
        <Figure w={image && image.width} {...image} display='inline-block' />
      </Block>
      <ObjectControls {...props}>
        <Block align='start center'>
          <Button px bgColor='grey' mr='l' onClick={toggle}>
            Change Image
          </Button>
          <AlignIcon {...props} justify='left' />
          <AlignIcon {...props} justify='center' mx />
          <AlignIcon {...props} justify='right' />
        </Block>
      </ObjectControls>
    </Block>
  )
}

function AlignIcon ({props}) {
  const {justify, object, onEdit, ...rest} = props

  return (
    <Button
      onClick={() => onEdit({...object, justify})}
      hoverProps={{color: 'text'}}
      color={justify === (object.justify || 'left') ? 'text' : 'grey_medium'}
      icon={`format_align_${justify}`}
      fs={24}
      {...rest} />
  )
}

/**
 * Block Input
 */

function MediaInput ({props}) {
  const {object = {}, onEdit, placeholder, save, toggle, open, ...rest} = props
  // let value
  return (
    <Block align='start stretch' onClick={e => e.stopPropagation()} {...rest}>
      <BlockInput
        placeholder={placeholder || 'Enter a url...'}
        // onInput={e => {value = e.target.value}}
        borderRightWidth={0}
        inputProps={{py: 8}}
        onInput={e => onEdit({...object, originalContent: e.target.value})}
        autofocus
        lighter
        fs='s'
        mb={0}/>
      <Button borderRadius='0' onClick={() => edit()}>
        Submit
      </Button>
    </Block>
  )

  function * edit() {
    if(object.objectType === 'image') {
      yield save()
      yield toggle()
    } else {
      yield open()
    }
  }

}

/**
 * Exports
 */

export default {
  render
}
