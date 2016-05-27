/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, Flex, Block, Text} from 'vdux-ui'
import {Button, Input, form} from 'vdux-containers'
import BlockInput from 'components/BlockInput'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <DescriptionModal/>
 */

function render ({props}) {
  const {user, changeDescription, fields} = props
  const {aboutMe = ''} = user
  const len = fields.aboutMe.value
    ? fields.aboutMe.value.length
    : aboutMe.length

  return (
    <Modal onDismiss={closeModal}>
      <Flex ui={ModalBody} column align='center center' pt pb='l'>
        <Block py='l' fs='m' fw='200' color='blue' textAlign='center'>
          Description
        </Block>
        <BlockInput
          tag='textarea'
          defaultValue={aboutMe}
          name='aboutMe'
          placeholder='A few words about yourself...'
          w='300px' m
          autofocus
          focusProps={{border: 'rgba(blue, .35)'}}
          border='rgba(grey, 0.15)'
          inputProps={{
            textAlign: 'left',
            resize: 'none',
            maxlength: 300,
            borderStyle: 'none',
            p: true,
            outline: 0,
            h: 111
          }}/>
          <Block w='300px'>
            <Text color='grey_medium' float='right'>{len}/300</Text>
          </Block>
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

/**
 * Exports
 */

export default summon(({user}) => ({
  changeDescription: ({aboutMe}) => ({
    changingDescription: {
      url: '/user',
      method: 'PUT',
      invalidates: `/user/${user._id}`,
      body: {
        ...user,
        aboutMe
      }
    }
  })
}))(
  form(({changeDescription, user}) => ({
    fields: ['aboutMe'],
    onSubmit: function * (model) {
      yield changeDescription(model)
      yield closeModal()
    }
  }))({
    render
  })
)
