/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {Button, Input} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <PointValueModal/>
 */

function render ({props}) {
  const {user, setPointValue, changingPoints = {}} = props
  const {loading} = changingPoints
  const {preferences} = user
  const {max_points = 10} = preferences

  return (
    <Modal onDismiss={closeModal}>
      <Form onSubmit={setPointValue} onSuccess={closeModal}>
        <Flex ui={ModalBody} column align='center center' pb='l'>
          <ModalHeader>
            Point Value
          </ModalHeader>
          <RoundedInput name='value' defaultValue={max_points} placeholder='Enter a number' w='150px' m autofocus inputProps={{type: 'number', min: '1'}}/>
        </Flex>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={closeModal}>cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit' busy={loading}>Update</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

/**
 * Exports
 */

export default summon(({user}) => ({
  setPointValue: body => ({
    changingPoints: {
      url: '/preference/max_points',
      invalidates: '/user',
      method: 'PUT',
      body
    }
  })
}))({
  render
})
