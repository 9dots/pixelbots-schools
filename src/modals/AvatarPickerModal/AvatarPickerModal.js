/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Grid, Text, Block, Flex} from 'vdux-ui'
import {closeModal} from 'reducer/modal'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import AvatarBlock from './AvatarBlock'
import * as avatarMap from './avatars'
import {Button} from 'vdux-containers'
import mapValues from '@f/map-values'
import element from 'vdux/element'

/**
 * Constants
 */

let avatars = ['upload', 'letters']
mapValues(path => avatars.push(path), avatarMap)
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
  const {page} = state
  const curAvatars = avatars.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <Modal>
      <ModalBody pb>
        <Block mt={35} mb={15} fs='m' fw='lighter' color='blue' textAlign='center'>
          Select an Avatar
        </Block>
        <Grid rowAlign='center' minHeight={360}>
          {
            curAvatars.map(avatar => <AvatarBlock avatar={avatar} hoverProps={{hovered: true}} focusProps={{selected: true}} user={user}/>)
          }
        </Grid>
      </ModalBody>
      <ModalFooter bg='greydark'>
        <Block flex align='start center'>
          <Button bgColor='black' icon='keyboard_arrow_left' mr='s' fs='s' lh='30px' px='25' onClick={local(prev)}/>
          <Button bgColor='black' icon='keyboard_arrow_right' mr fs='s' lh='30px' px='25' onClick={local(next)}/>
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
 * Exports
 */

export default {
  initialState,
  render,
  reducer
}
