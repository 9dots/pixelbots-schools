/**
 * Imports
 */

import {Block, Modal, ModalBody, ModalFooter, ModalHeader, Flex, Text, Icon} from 'vdux-ui'
import {Checkbox, Dropdown, Button, MenuItem} from 'vdux-containers'
import BlockInput from 'components/BlockInput'
import {component, element} from 'vdux'
import mapValues from '@f/map-values'
import validate from 'lib/validate'
import summon from 'vdux-summon'
import Form from 'vdux-form'
import fire from 'vdux-fire'

/**
 * Constants
 */

const grades = [
  'Kindergarten',
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
  '8th',
  '9th',
  '10th',
  '11th',
  '12th',
  'Higher Education'
]

/**
 * <CreateClassModal/>
 */

export default fire(({userId}) => ({
  user: {
    ref: `/users/${userId}`,
    join: {
      ref: '/schools',
      child: 'schools',
      childRef: (val, ref) => mapValues((v, key) => ref.child(key), val.schools || {})
    }
  }
}))(component({
  render ({props, context, state, actions}) {
    const {user} = props
    const {grade, school} = state

    if (user.loading) return <span/>

    return (
      <Modal onDismiss={context.closeModal} opacity='1'>
        <Form onSubmit={actions.createClass} tall validate={validate.group} autocomplete='off'>
          <ModalBody>
            <Flex column align='space-around center'>
              <ModalHeader>
                Create Class
              </ModalHeader>
              <BlockInput w={300} autofocus name='displayName' placeholder='Class name' />
              <Block my align='space-between center' w={300}>
                <Dropdown wide maxHeight={200} overflowY='auto' btn={<DDBtn text={grade ? grade : 'Grade'} />}>
                  {
                    grades.map(grade => <MenuItem onClick={actions.setGrade(grade)}>{grade}</MenuItem>)
                  }
                </Dropdown>
                <Dropdown wide maxHeight={200} overflowY='auto' btn={<DDBtn text={school ? user.value.schools[school].name : 'School'} />}>
                  {
                    mapValues((school, key) => <MenuItem onClick={actions.setSchool(key)}>{school.name}</MenuItem>, user.value.schools || {})
                  }
                </Dropdown>
              </Block>
            </Flex>
          </ModalBody>
          <ModalFooter bg='grey'>
            <Text fs='xxs'>
              <Text pointer underline onClick={context.closeModal}>cancel</Text>
              <Text mx>or</Text>
            </Text>
            <Button type='submit' busy={state.loading}>Create</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  },

  controller: {
    * createClass ({state, context, actions}, cls) {
      try {
        yield actions.setLoading(true)
        if (!cls.displayName) {
          throw [{field: 'displayName', message: 'Must add a class name.'}]
        } else if (!state.grade){
          throw [{field: 'grade', message: 'Must add a grade.'}]
        } else if (!state.school){
          throw [{field: 'school', message: 'Must add a school.'}]
        }
        const {key} = yield context.firebasePush('/classes', {
          teacherID: context.userId,
          school: state.school,
          grade: state.grade,
          ...cls
        })

        yield context.firebaseSet(`/schools/${state.school}/classes/${key}`, grades.indexOf(state.grade))
        yield context.firebaseSet(`/users/${context.userId}/teacherOf/${key}`, Date.now())
        yield context.setUrl(`/class/${key}/feed`)
      } catch (e) {
        yield actions.setLoading(false)
        throw e
      }
    }
  },

  reducer: {
    setLoading: (state, loading) => ({loading}),
    setGrade: (state, grade) => ({grade}),
    setSchool: (state, school) => ({school})
  }
}))

/**
 * <DDBtn/>
 */

function DDBtn ({props}) {
  const {text, ...rest} = props

  return (
    <Button
      hoverProps={{highlight: 0.02}}
      focusProps={{highlight: 0.02}}
      bgColor='off_white'
      textAlign='left'
      color='text'
      capitalize
      lh='2.8em'
      ellipsis
      fs='xxs'
      w={142}
      maxWidth={142}
      px
      py='xs'
      {...rest}>
      <Block flex ellipsis>{text}</Block>
      <Icon fs='s' mt={3} ml={3} mr={-2} name='keyboard_arrow_down' />
    </Button>
  )
}


