/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ErrorTip, Grid, Text, Block, Flex, Radio} from 'vdux-ui'
import {avatarDidUpdate} from 'reducer/avatarUpdates'
import handleActions from '@f/handle-actions'
import {uploadFile} from 'middleware/upload'
import createAction from '@f/create-action'
import {closeModal} from 'reducer/modal'
import validate from '@weo-edu/validate'
import toBlob from '@f/dataurl-to-blob'
import AvatarBlock from './AvatarBlock'
import * as avatarMap from './avatars'
import {Button} from 'vdux-containers'
import {form} from 'vdux-containers'
import * as colors from 'lib/colors'
import Schema from '@weo-edu/schema'
import element from 'vdux/element'
import summon from 'vdux-summon'
import reduce from '@f/reduce'

/**
 * Constants
 */

const avatars = reduce((avatars, url, name) => {
  avatars.push({
    url,
    name
  })
  return avatars
}, [{url: 'upload', name: 'upload'}, {url: 'letters', name: 'letters'}], avatarMap)

const pageSize = 12
const numPages = Math.ceil(avatars.length / pageSize)

/**
 * initialState
 */

function initialState ({props}) {
  const {page} = props

  return {
    page: 0
  }
}

/**
 * <AvatarPickerModal/>
 */

function render ({props, state, local}) {
  const {user, fields} = props
  const {page} = state
  const curAvatars = avatars.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <Modal onDismiss={closeModal}>
      <ModalBody pb>
        <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
          Select an Avatar
        </Block>
        <Grid rowAlign='center' minHeight={360}>
          {
            curAvatars.map(({url, name}) =>
              <Radio
                name='avatar'
                btn={AvatarBlock}
                checked={fields.avatar.value === name}
                value={name}
                uiProps={{
                  user,
                  avatar: name === 'letters'
                    ? letterAvatar(user)
                    : url
                }} />
            )
          }
        </Grid>
        <ErrorTip show={fields.avatar.error} message='Must select avatar' placement='right' />
      </ModalBody>
      <ModalFooter bg='greydark'>
        <Block flex align='start center'>
          <Button bgColor='black' icon='keyboard_arrow_left' mr='s' fs='s' h='30px' px='25' onClick={local(prev)} disabled={page == 0}/>
          <Button bgColor='black' icon='keyboard_arrow_right' mr fs='s' h='30px' px='25' onClick={local(next)} disabled={page == (numPages - 1)}/>
          <Flex>
            { dots(page, local) }
          </Flex>
        </Block>
        <Text fs='xxs'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
           <Text mx>or</Text>
        </Text>
        <Button type='submit'>Update</Button>
      </ModalFooter>
    </Modal>
  )
}

/**
 * Helpers
 */

function dots (page, local) {
  const arr = Array.apply(null, Array(numPages))
  return (
    arr.map((_, i) => <Block pointer circle='5' bgColor={page == i ? 'white' : 'rgba(255,255,255,.5)'} ml='s' onClick={local(go, i)}></Block>)
  )
}

function letterAvatar (user) {
  const {name, color} = user
  const initials = (name.givenName[0] || '') + (name.familyName[0] || '')
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const size = 250

  canvas.width = canvas.height = size
  ctx.fillStyle = color || colors.pickerColors[0]
  ctx.fillRect(0, 0, size, size)
  ctx.font = size / 2.5 + 'px Lato'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#FFF'
  ctx.fillText(initials.toUpperCase(), size / 2, size / 2)

  return canvas.toDataURL('image/png')
}

/**
 * Actions
 */

const next = createAction('<AvatarPickerModal/>: next')
const prev = createAction('<AvatarPickerModal/>: prev')
const go = createAction('<AvatarPickerModal/>: go')

/**
 * Reducer
 */

const reducer = handleActions({
  [next]: state => ({
    ...state,
    page: Math.min(state.page + 1, (numPages - 1))
  }),
  [prev]: state => ({
    ...state,
    page: Math.max(state.page - 1, 0)
  }),
  [go]: (state, i) => ({
    ...state,
    page: i
  })
})

/**
 * Validation
 */

const schema = Schema()
  .prop('avatar', 'string')
  .required(['avatar'])

/**
 * Exports
 */

export default summon(() => ({
  changeAvatar: url => ({
    changingAvatar: {
      url: '/avatar/',
      method: 'PUT',
      body: {
        url
      }
    }
  })
}))(
  form(({changeAvatar, user}) => ({
    fields: ['avatar'],
    validate: validate(schema),
    onSubmit: function * ({avatar}) {
      if (avatar === 'letters') {
        avatar = yield uploadFile(toBlob(letterAvatar(user)))
      }

      yield changeAvatar(avatar)
      yield closeModal()
      yield avatarDidUpdate()
    }
  }))({
    initialState,
    render,
    reducer
  })
)
