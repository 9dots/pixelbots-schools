/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Grid, Text, Icon, Block, Image, Flex} from 'vdux-ui'
import {wrap, CSSContainer, Button} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {closeModal} from 'reducer/modal'
import apple from './avatars/apple.png'
import element from 'vdux/element'

/**
 * Constants
 */

let avatars = []
for(let i = 0; i < 12; i++) {
  avatars.push(apple)
}
const pageSize = 12

/**
 * <AvatarPickerModal/>
 */

function render ({props}) {
  return (
    <Modal>
      <ModalBody pb>
        <Block mt={35} mb={15} fs='m' fw='lighter' color='blue' textAlign='center'>
          Select an Avatar
        </Block>
        <Grid rowAlign='center'>
          {
            avatars.map(avatar => <AvatarBlock avatar={avatar} hoverProps={{hovered: true}} focusProps={{selected: true}} />)
          }
        </Grid>
      </ModalBody>
      <ModalFooter bg='greydark'>
        <Block flex align='start center'>
          <Button bgColor='black' icon='keyboard_arrow_left' mr='s' fs='s' lh='30px' px='25'/>
          <Button bgColor='black' icon='keyboard_arrow_right' mr fs='s' lh='30px' px='25'/>
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
        sq='100'
        pointer
        m='10'>
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
 * Exports
 */

export default {
  render
}
