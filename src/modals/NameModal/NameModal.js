/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Flex, Block, Text} from 'vdux-ui'
import {Button, Input, Dropdown, MenuItem} from 'vdux-containers'
import LineInput from 'components/LineInput'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'

/**
 * <NameModal/>
 */

function render ({props}) {
  const {user} = props
  const {name} = user
  const {honorificPrefix, familyName, givenName} = name
  return (
    <Modal onDismiss={closeModal}>
      <Flex ui={ModalBody} column align='center center' pt pb='l'>
        <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
          Name
        </Block>
        <Flex align='center center' py>
          <Block flex='20%'>
            <Dropdown w='100%' mt='-1' btn={<Block borderBottom='1px solid grey_light' pb='7'>{honorificPrefix || 'Title'}</Block>}>
              <MenuItem>None</MenuItem>
              {
                prefixes.map((prefix) => <MenuItem>{prefix}</MenuItem>)
              }
            </Dropdown>
          </Block>
          <LineInput placeholder='First Name' value={givenName} flex='30%' mx='l' />
          <LineInput placeholder='Last Name' value={familyName} flex='30%' />
        </Flex>
      </Flex>
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

const prefixes = ['Mrs.', 'Ms.', 'Mr.', 'Dr.']

/**
 * Exports
 */

export default {
  render
}
