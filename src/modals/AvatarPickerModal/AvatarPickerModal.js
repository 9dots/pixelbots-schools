/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Grid, Text, Block, Flex} from 'vdux-ui'
import {Radio} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import AvatarBlock from './AvatarBlock'
import * as avatarMap from './avatars'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import reduce from '@f/reduce'

/**
 * Constants
 */

const avatars = reduce((avatars, avatar) => {
  avatars.push(avatar)
  return avatars
}, ['upload', 'letters'], avatarMap)

const pageSize = 12
const numPages = Math.ceil(avatars.length / pageSize)

/**
 * initialState
 */

function initialState({props}) {
  const {page} = props

  return {
    page: 0
  }
}

/**
 * <AvatarPickerModal/>
 */

function render ({props, state, local}) {
  const {user} = props
  const {page, selected} = state
  const curAvatars = avatars.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <Modal>
      <ModalBody pb>
        <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
          Select an Avatar
        </Block>
        <Grid rowAlign='center' minHeight={360}>
          {
            curAvatars.map(avatar =>
              <Radio
                btn={AvatarBlock}
                uiProps={{avatar, user}}
                checkedProps={{checked: true}}
                onChange={local(select, avatar)} />
            )
          }
        </Grid>
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

function dots(page, local) {
  const arr = Array.apply(null, Array(numPages))
  return (
    arr.map((_, i) => <Block pointer circle='5' bgColor={page == i ? 'white' : 'rgba(255,255,255,.5)'} ml='s' onClick={local(go, i)}></Block>)
  )
}

/**
 * Actions
 */

const select = createAction('<AvatarPickerModal/>: select')
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
  }),
  [select]: (state, selected) => ({
    ...state,
    selected: selected === state.selected
      ? null
      : selected
  })
})

/**
 * Exports
 */

export default {
  initialState,
  render,
  reducer
}
