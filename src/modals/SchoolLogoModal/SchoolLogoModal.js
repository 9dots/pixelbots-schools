/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Text, Block, Icon} from 'vdux-ui'
import FileUpload from 'components/FileUpload'
import Cropper from 'components/Cropper'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import cropImage from '@f/crop-image'
import summon from 'vdux-summon'

/**
 * Constants
 */

const tileWidth = 230

/**
 * <SchoolLogoModal/>
 */

export default summon(({school}) => ({
  changeLogo: logo => ({
    changingLogo: {
      url: `/school/${school._id}/logo`,
      method: 'PUT',
      body: {
        value: logo
      }
    }
  })
}))(component({
  render ({props, actions, context, state}) {
    const {url, loading} = state

    return (
      <Modal onDismiss={context.closeModal}>
        <ModalBody pb>
          <ModalHeader>
            Upload An Image
          </ModalHeader>
          <Block align='center center' h='360'>
            {
              url
                ? <Cropper url={url} onCrop={actions.setCrop} />
                : <FileUpload onUpload={actions.setImage} validate={validateFile} sq={300} />
            }
          </Block>
        </ModalBody>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={context.closeModal}>cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button onClick={actions.submit} busy={loading}>Update</Button>
        </ModalFooter>
      </Modal>
    )
  },

  controller: {
    * submit ({props, actions, context, state}) {
      const {url, crop} = state
      let uploadUrl = url

      yield actions.beginLoading()

      try {
        if (crop) {
          const {x, y, width, height} = crop.detail
          const blob = cropImage(
            crop.target,
            x,
            y,
            width,
            height,
            tileWidth,
            tileWidth)

          uploadUrl = yield context.uploadFile(blob)
        }

        yield props.changeLogo(uploadUrl)
      } finally {
        yield actions.endLoading
      }

      yield context.closeModal()
    }
  },

  reducer: {
    setImage: (state, {url}) => ({url}),
    setCrop: (state, crop) => ({crop}),
    beginLoading: () => ({loading: true}),
    endLoading: () => ({loading: false})
  }
}))

/**
 * Helpers
 */

const validLogoType = /\.(?:jpg|jpeg|gif|png)$/i

function validateFile (file) {
  if (!file) return {valid: true}

  const {size, name} = file

  if (size > 20 * 1000000) {
    return {
      valid: false,
      message: 'File too big. Must be under 20MB.'
    }
  } else if (!validLogoType.test(name)) {
    return {
      valid: false,
      message: 'Invalid file type. Must be a picture.'
    }
  }

  return {valid: true}
}
