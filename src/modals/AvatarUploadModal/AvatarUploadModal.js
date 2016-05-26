/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Text, Block, Flex, Icon, Base} from 'vdux-ui'
import AvatarPickerModal from 'modals/AvatarPickerModal'
import {closeModal, openModal} from 'reducer/modal'
import {avatarDidUpdate} from 'reducer/avatarUpdates'
import FileUpload from 'components/FileUpload'
import handleActions from '@f/handle-actions'
import {uploadFile} from 'middleware/upload'
import createAction from '@f/create-action'
import Cropper from 'components/Cropper'
import {Button} from 'vdux-containers'
import cropImage from '@f/crop-image'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * Constants
 */

const tileWidth = 230

/**
 * <AvatarUploadModal/>
 */

function render ({props, local, state}) {
  const {user, changeAvatar, changingAvatar} = props
  const {url, crop} = state

  return (
    <Modal onDismiss={closeModal}>
      <ModalBody pb>
        <Block py='l' fs='l' fw='200' color='blue' textAlign='center'>
          Upload An Image
        </Block>
        {
          url
            ? <Cropper url={url} onCrop={local(setCrop)} />
            : <FileUpload onUpload={local(setImage)} validate={validateFile} />
        }
      </ModalBody>
      <ModalFooter bg='greydark'>
        <Block flex>
          <Button bgColor='black' mr='s' h='30' px='25' onClick={() => openModal(() => <AvatarPickerModal user={user} />)}>
            <Flex align='center center'>
              <Icon name='keyboard_arrow_left' fs='s' mr='s' />
              Back
            </Flex>
          </Button>
        </Block>
        <Text fs='xxs'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
           <Text mx>or</Text>
        </Text>
        <Button onClick={submit}>Update</Button>
      </ModalFooter>
    </Modal>
  )

  function * submit () {
    let uploadUrl = url

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

      uploadUrl = yield uploadFile(blob)
    }

    yield changeAvatar(uploadUrl)
    yield closeModal()
    yield avatarDidUpdate()
  }
}

/**
 * Actions
 */

const setImage = createAction('<AvatarUploadModal/>: set image')
const setCrop = createAction('<AvatarUploadModal/>: set crop')

/**
 * Reducer
 */

const reducer = handleActions({
  [setImage]: (state, url) => ({...state, url}),
  [setCrop]: (state, crop) => ({...state, crop})
})

/**
 * Helpers
 */

const validAvatarType = /\.(?:jpg|jpeg|gif|png)$/i

function validateFile (file) {
  if (!file) return {valid: true}

  const {size, name} = file

  if (size > 20 * 1000000) {
    return {
      valid: false,
      message: 'File too big. Must be under 20MB.'
    }
  } else if (!validAvatarType.test(name)) {
    return {
      valid: false,
      message: 'Invalid file type. Must be a picture.'
    }
  }

  return {valid: true}
}

/**
 * Exports
 */

export default summon(props => ({
  changeAvatar: avatar => ({
    changingAvatar: {
      url: '/avatar/',
      method: 'PUT',
      body: {
        url: avatar
      }
    }
  })
}))({
  render,
  reducer
})
