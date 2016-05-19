/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Grid, Text, Icon, Block} from 'vdux-ui'
import {wrap, CSSContainer, Button} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import * as colors from 'lib/colors'
import element from 'vdux/element'

/**
 * <ColorPickerModal/>
 */

const {pickColors, blue} = colors
function render ({props}) {
  return (
    <Modal>
      <ModalBody pb>
        <Block mt={35} mb={15} fs='m' fw='lighter' color='blue' textAlign='center'>
          Select a Color
        </Block>
        <Grid rowAlign='center'>
          {
            colors.pickerColors.map(color => <ColorBlock color={color} hoverProps={{hovered: true}} focusProps={{selected: true}} />)
          }
        </Grid>
      </ModalBody>
      <ModalFooter bg='greydark'>
        <Text fs='xxs'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
           <Text mx>or</Text>
        </Text>
        <Button type='submit'>Update</Button>
      </ModalFooter>
    </Modal>
  )
}

const ColorBlock = wrap(CSSContainer)({
  render({props}) {
    const {color, hovered, selected} = props
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
        m='10'>

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
