/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Text, Block, Flex, Icon, Base} from 'vdux-ui'
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
  const {user, changeAvatar} = props
  const {url, crop, loading} = state

  return (
    <Modal onDismiss={closeModal}>
      <ModalBody pb>
        <ModalHeader>
          Upload An Image
        </ModalHeader>
        <Block align='center center' h='360'>
          {
            url
              ? <Cropper url={url} onCrop={local(setCrop)} />
              : <FileUpload onUpload={local(setImage)} validate={validateFile} sq={300} />
          }
        </Block>
      </ModalBody>
      <ModalFooter bg='grey'>
        <Block flex>
          <Button bgColor='black' mr='s' fs='xs' h='30' px='25' onClick={() => openModal(() => <AvatarPickerModal user={user} />)}>
            <Icon name='keyboard_arrow_left' fs='s' mr='s' />
            Back
          </Button>
        </Block>
        <Text fs='xxs'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
           <Text mx>or</Text>
        </Text>
        <Button onClick={submit} busy={loading}>Update</Button>
      </ModalFooter>
    </Modal>
  )

  function * submit () {
    let uploadUrl = url

    yield local(beginLoading)()

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

        uploadUrl = yield uploadFile(blob)
      }

      yield changeAvatar(uploadUrl)
    } finally {
      yield local(endLoading)()
    }

    yield closeModal()
    yield avatarDidUpdate()
  }
}

/**
 * Actions
 */

const setImage = createAction('<AvatarUploadModal/>: set image')
const setCrop = createAction('<AvatarUploadModal/>: set crop')
const beginLoading = createAction('<AvatarUploadModal/>: begin loading')
const endLoading = createAction('<AvatarUploadModal/>: end loading')

/**
 * Reducer
 */

const reducer = handleActions({
  [setImage]: (state, url) => ({...state, url}),
  [setCrop]: (state, crop) => ({...state, crop}),
  [beginLoading]: state => ({...state, loading: true}),
  [endLoading]: state => ({...state, loading: false})
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
