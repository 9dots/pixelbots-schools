/**
 * Imports
 */

import {Block, Modal, ModalBody, ModalFooter, ModalHeader, Flex, Text} from 'vdux-ui'
import CreateClassModal from 'modals/CreateClassModal'
import RoundedInput from 'components/RoundedInput'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import mapValues from '@f/map-values'
import summon from 'vdux-summon'
import Form from 'vdux-form'
import fire from 'vdux-fire'
import map from '@f/map'

/**
 * <JoinClassModal/>
 */


export default fire((props) => ({
  // classes: {
  //   ref: '/classes',
  //   list: Object.keys(props.user.teacherOf || {}),
  //   join: {
  //     ref: '/schools',
  //     child: 'school'
  //   }
  // },
  schools: {
    ref: '/schools',
    list: Object.keys(props.user.schools || {}),
    join: {
      ref: '/classes',
      child: 'classes',
      childRef: (val, ref) => map((v, key) => ref.child(key), val.classes || {})
    }
  }
  mySchools: {

  }
}))(component({
  render ({props, context, actions, state}) {
    const {enableDismiss, user, schools} = props
    if (!schools.value) return <span/>
    return (
      <Modal onDismiss={context.closeModal} opacity='1'>
        <Form onSubmit={actions.joinClass} tall autocomplete='off'>
          <ModalBody>
            <Flex column align='space-around center'>
              <ModalHeader>
                Join Class
              </ModalHeader>
              <Block>
                {mapValues(school => <SchoolWithClasses school={school} joinClass={actions.joinClass}/>, schools.value)}
              </Block>
              <RoundedInput mb={0} w={210} mx={0} mt autofocus name='code' placeholder='Enter Class code' />
              <Block italic my='m'>or</Block>
              <Button mb='l' w={200} py='s' onClick={context.openModal(() => <CreateClassModal userId={context.userId} enableDismiss={enableDismiss} />)}>Create a Class</Button>
            </Flex>
          </ModalBody>
          <ModalFooter bg='grey'>
            {
            <Text fs='xxs' hide={!enableDismiss}>
              <Text pointer underline onClick={context.closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            }
            <Button type='submit' busy={state.loading}>Join</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * goToClass ({context}, {_id}) {
      yield context.setUrl(`/class/${_id}/feed`)
    },
    * joinClass ({props, actions, context}, {code}) {
      const codeCaps = (code || '').toUpperCase()

      yield actions.setLoading(true)
      try {
        if (!codeCaps) {
          throw [{field: 'code', message: 'Invalid class code'}]
        }
        const snap = yield context.firebaseOnce('/class_codes/' + codeCaps)
        const classId = snap.val()
        if (classId) {
          yield context.firebaseSet(`/users/${context.userId}/teacherOf/${classId}`, true)
          yield context.closeModal()
        } else {
          throw [{field: 'code', message: 'Invalid class code'}]
        }
      } catch (err) {
        yield actions.setLoading(false)
        throw err
      }
    }
  },
  reducer: {
    setLoading: (state, loading) => ({loading})
  }
}))

const SchoolWithClasses = component({
  render ({props, state, actions, context}) {
    const {school, joinClass} = props
    //indexOf

    return (
      <Block>
        <Text> {school.name} </Text>
        {mapValues((currClass) => <Button log={console.log(context.userId)} onClick={joinClass(currClass.code)}> {currClass.displayName} </Button>, school.classes)}
      </Block>
      
    )
  }
})

