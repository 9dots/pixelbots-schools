/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Grid, Text, Icon, Block} from 'vdux-ui'
import {Button, CSSContainer, wrap} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {closeModal} from 'reducer/modal'
import * as colors from 'lib/colors'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * Constants
 */

const {pickerColors, blue} = colors

/**
 * initialState
 */

function initialState ({props}) {
  const {user} = props

  return {
    selected: user.color
  }
}

/**
 * <ColorPickerModal/>
 */

function render ({props, state, local}) {
  const {updateColor, user} = props
  const {selected} = state

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={() => updateColor(selected)} onSuccess={closeModal}>
        <ModalBody pb>
          <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
            Select a Color
          </Block>
          <Grid rowAlign='center'>
            {
              pickerColors.map(
                color => <ColorBlock onClick={local(choose, color)} color={color} selected={color === selected} />)
            }
          </Grid>
        </ModalBody>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
             <Text mx>or</Text>
          </Text>
          <Button type='submit'>Update</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

/**
 * Actions
 */

const choose = createAction('<ColorPickerModal/>: select color')

/**
 * Reducer
 */

const reducer = handleActions({
  [choose]: (state, selected) => ({...state, selected})
})

/**
 * <ColorBlock/> component
 */

const ColorBlock = wrap(CSSContainer, {hoverProps: {hovered: true}})({
  render({props}) {
    const {color, hovered, selected, ...rest} = props

    return (
      <Block
        tabindex='-1'
        outline='3px solid transparent'
        outlineColor={hovered || selected ? blue : 'transparent'}
        transition='outline-color .35s'
        outlineOffset='2px'
        bg={color}
        relative
        sq='100'
        pointer
        m='10'
        {...rest}>
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
 * Exports
 */

export default summon(({user}) => ({
  updateColor: color => ({
    submitting: {
      url: '/user',
      method: 'PUT',
      body: {
        ...user,
        color
      }
    }
  })
}))({
  initialState,
  render,
  reducer
})
