/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Flex, Block, Text} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import {Button, Input} from 'vdux-containers'
import {website} from 'lib/schemas/user'
import {component, element} from 'vdux'
import Schema from '@weo-edu/schema'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <WebsiteModal/>
 */

export default summon(({user}) => ({
  changeWebsite: ({website}) => ({
    changingWebsite: {
      url: `/user`,
      method: 'PUT',
      invalidates: `/user/${user._id}`,
      body: {
        ...user,
        website: /^https?\:\/\//.test(website)
          ? website
          : website ? 'http://' + website : ''
      }
    }
  })
}))(component({
  render ({props, context}) {
    const {user, changeWebsite, changingWebsite = {}} = props
    const {loading} = changingWebsite
    const {website} = user

    return (
      <Modal onDismiss={context.closeModal}>
        <Form onSubmit={changeWebsite} onSuccess={context.closeModal}>
          <Flex ui={ModalBody} column align='center center' pb='l'>
            <ModalHeader>
              Website
            </ModalHeader>
            <RoundedInput name='website' defaultValue={website} placeholder='http://…' w='250px' m autofocus inputProps={{textAlign: 'left'}}/>
          </Flex>
          <ModalFooter bg='grey'>
            <Text fs='xxs'>
              <Text pointer underline onClick={context.closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button type='submit' busy={loading}>Update</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}))
