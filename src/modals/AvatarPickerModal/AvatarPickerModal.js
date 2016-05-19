/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Grid, Text, Icon, Block, Image, Flex} from 'vdux-ui'
import {wrap, CSSContainer, Button} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {closeModal} from 'reducer/modal'
import * as avatarMap from './avatars'
import apple from './avatars/apple.png'
import redpanda from './avatars/redpanda.png'
import octopus from './avatars/octopus.png'
import element from 'vdux/element'
import mapValues from '@f/map-values'

/**
 * Constants
 */

let avatars = [null, null]
mapValues(function(path) { avatars.push(path) }, avatarMap)
const pageSize = 12
const numPages = Math.ceil(avatars.length / pageSize)
const avtrHeight = 100
const avtrMargin = 10
const rows = 3

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
  const {page} = state
  const curAvatars = avatars.slice(page * pageSize, (page + 1) * pageSize)
  return (
    <Modal>
      <ModalBody pb>
        <Block mt={35} mb={15} fs='m' fw='lighter' color='blue' textAlign='center'>
          Select an Avatar
        </Block>
        <Grid rowAlign='center' minHeight={(avtrHeight + avtrMargin * 2) * rows}>
          {
            curAvatars.map(avatar => <AvatarBlock avatar={avatar} hoverProps={{hovered: true}} focusProps={{selected: true}} />)
          }
        </Grid>
      </ModalBody>
      <ModalFooter bg='greydark'>
        <Block flex align='start center'>
          <Button bgColor='black' icon='keyboard_arrow_left' mr='s' fs='s' lh='30px' px='25' onClick={local(prev)}/>
          <Button bgColor='black' icon='keyboard_arrow_right' mr fs='s' lh='30px' px='25' onClick={local(next)}/>
          <Flex>
            { dots(page, local)}
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

function dots(cur, local) {
  const arr = Array.apply(null, Array(numPages))
  return (
    arr.map((_, i) => <Block pointer circle='5' bgColor={cur == i ? 'white' : 'rgba(255,255,255,.5)'} ml='s' onClick={local(go, i)}></Block>)
  )
}

const AvatarBlock = wrap(CSSContainer)({
  render({props}) {
    const {avatar, hovered, selected} = props
    return (
      <Block
        tabindex='-1'
        outline='3px solid transparent'
        outlineColor={hovered || selected ? 'blue' : 'transparent'}
        transition='outline-color .35s'
        outlineOffset='2px'
        relative
        sq={avtrHeight}
        pointer
        m={avtrMargin}>
        <Image sq='100%' src={avatar} />
        <Icon
          transition='transform .35s'
          transform={selected ? 'scale(1)' : 'scale(0)'}
          name='check'
          align='center center'
          color='blue'
          bg='white'
          fs='19'
          circle='25'
          absolute
          right
          top
          m='s' />
      </Block>
    )

  }
})

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
