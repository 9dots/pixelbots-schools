/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text} from 'vdux-ui'
import LineInput from 'components/LineInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import {debounce} from 'redux-timing'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * <JoinSchoolModal/>
 */

export default summon(() => ({
  joinSchool: id => ({
    joiningSchool: {
      url: `/school/${id}/join`,
      method: 'PUT'
    }
  }),

  lookup: query => ({
    schools: {
      url: '/school/lookup',
      params: {
        query
      }
    }
  })
}))(component({
  render ({props, actions, context}) {
    const {joinSchool, joiningSchool = {}} = props
    const schools = (props.schools && props.schools.value && props.schools.value.items) || []

    return (
      <Modal onDismiss={context.closeModal}>
        <ModalBody pb='l' w='col_m' mx='auto'>
          <Block align='start center'>
            <LineInput autofocus autocomplete='off' name='name' onInput={actions.debouncedLookup} placeholder='School name' mr='l' />
          </Block>
          <Block align='start center'>
            {
              (schools || []).map(school => (
                <Block onClick={actions.joinAndClose(school._id)}>
                  {school.name}
                </Block>
              ))
            }
          </Block>
        </ModalBody>
        <ModalFooter bg='grey'>
          <Text fs='xxs'>
            <Text pointer underline onClick={context.closeModal}>Cancel</Text>
            <Text mx>or</Text>
          </Text>
          <Button type='submit' busy={joiningSchool.loading}>Join</Button>
        </ModalFooter>
      </Modal>
    )
  },

  middleware: [
    debounce('debouncedLookup', 500)
  ],

  controller: {
    * debouncedLookup ({props}, query) {
      yield props.lookup(query)
    },

    * joinAndClose ({props, context}, id) {
      yield props.joinSchool(id)
      yield context.closeModal()
    }
  }
}))
