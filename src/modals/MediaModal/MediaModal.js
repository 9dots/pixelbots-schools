/**
 * Imports
 */

import {Modal, ModalFooter, Block, Base} from 'vdux-ui'
import BlockInput from 'components/BlockInput'
import DropZone from 'components/DropZone'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <MediaModal/>
 */

function render ({props}) {
  const {object} = props
  const {objectType} = object
  const uploadable = objectType === 'document' || objectType === 'image'
  return (
    <Modal onDismiss={closeModal} w='col_xl'>
      <Block color='blue' p boxShadow='z1' capitalize textAlign='center' fs='m' lighter>
        Add {objectType}
      </Block>
      <Block p='l' h={275} align='stretch'>
        {
           uploadable
            ? <UploadFile/>
            : <ScrapeFile />
        }
      </Block>
      <ModalFooter mt={0} bg='grey'>
        <Button bgColor='white' color='text' hoverProps={{highlight: 0.03}} focusProps={{highlight: 0.03}} onClick={closeModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

function ScrapeFile({props}) {
  return (
    <Block column align='center center' wide>
      <Block mb='l' fs='s' lighter>
        Paste your link below.
      </Block>
      <MediaInput mb={40} w='75%'/>
    </Block>
  )
}

function UploadFile ({props}) {
  return (
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
      wide
      >
      <Base
        absolute={{top: 0, left: 0}}
        type='file'
        opacity='0'
        tag='input'
        sq='100%'
        pointer />
    </DropZone>
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

function MediaInput ({props}) {
  const {placeholder, ...rest} = props
  return (
    <Block align='start stretch' onClick={e => e.stopPropagation()} {...rest}>
      <BlockInput
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
