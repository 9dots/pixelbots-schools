/**
 * Imports
 */

import {Button, Text, Block, Tooltip} from 'vdux-containers'
import SubjectSelector from 'components/SubjectSelector'
import GradeSelector from 'components/GradeSelector'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {closeModal} from 'reducer/modal'
import {Flex, Icon, ModalHeader} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * initialState
 */

function initialState () {
  return {
    grades: [],
    subjects: []
  }
}

/**
 * <IntroForms/>
 */

function render ({props, state, local}) {
  const {cur, finishedIntroModal, saveGrades, saveSubjects} = props
  const {isDone, grades, subjects} = state
  const ttProps = {
    placement: 'bottom',
    tooltipProps: {
      fw: 'lighter',
      p: true,
      fs: 'xs',
      maxWidth: '300px'
    }
  }
  const btnProps = {
    boxShadow: 'card',
    bgColor: 'green',
    color: 'white',
    lh: '3.5em',
    h: '3.5em',
    px: '35px',
    mt: 'l',
    fs: 's'
  }

  return (
    <Flex column align='center center' tall wide>
      <Flex column align='center center' tall wide hide={isDone}>
        <ModalHeader>
          What Grades Do You Teach?
        </ModalHeader>
        <GradeSelector toggle={local(toggleGrade)} selected={grades} />
        <Tooltip message={!grades.length && 'Please select one or more grades'} {...ttProps}>
          <Button {...btnProps} onClick={[() => saveGrades(grades), local(next)]} disabled={!grades.length}>
            <Flex align='center center' fw='lighter'>
              Next
              <Icon name='keyboard_arrow_right' />
            </Flex>
          </Button>
        </Tooltip>
      </Flex>

      <Flex column align='center center' tall wide hide={!isDone}>
        <ModalHeader>
          What Subjects Do You Teach?
        </ModalHeader>
        <SubjectSelector toggle={local(toggleSubject)} selected={subjects} />
        <Tooltip message={!subjects.length && 'Please select one or more subjects'} {...ttProps}>
          <Button {...btnProps} onClick={() => submit(grades, subjects)} disabled={!subjects.length}>
            <Flex align='center center' fw='lighter'>
              <Icon name='check' mr/>
              Let's Get Started
            </Flex>
          </Button>
        </Tooltip>
      </Flex>

      <Text pointer onClick={skip} absolute bottom right m color='grey' hoverProps={{underline: true}}>
        Skip
      </Text>
    </Flex>
  )

  function * skip () {
    yield finishedIntroModal()
    yield closeModal()
  }

  function * submit () {
    yield saveSubjects(subjects)
    yield finishedIntroModal()
    yield closeModal()
  }
}

/**
 * Actions
 */

const next = createAction('<InfoForms/>: next')
const toggleGrade = createAction('<IntroForms/>: toggle grade')
const toggleSubject = createAction('<IntroForms/>: toggle subject')

/**
 * Reducer
 */

const reducer = handleActions({
  [next]: state => ({
    ...state,
    isDone: true
  }),
  [toggleGrade]: (state, grade) => ({
    ...state,
    grades: state.grades.indexOf(grade) === -1
      ? [...state.grades, grade]
      : state.grades.filter(g => g !== grade)
  }),
  [toggleSubject]: (state, subject) => ({
    ...state,
    subjects: state.subjects.indexOf(subject) === -1
      ? [...state.subjects, subject]
      : state.subjects.filter(s => s !== subject)
  })
})

/**
 * Exports
 */

export default summon(({currentUser}) => ({
  saveGrades: gradeLevels => ({
    savingGrades: {
      url: `/user/${currentUser._id}/gradeLevels`,
      method: 'PUT',
      invalidates: '/user',
      body: {
        gradeLevels
      }
    }
  }),
  saveSubjects: subjects => ({
    savingSubjects: {
      url: `/user/${currentUser._id}/subjects`,
      method: 'PUT',
      invalidates: '/user',
      body: {
        subjects
      }
    }
  }),
  finishedIntroModal: () => ({
    savingPreference: {
      url: '/preference/' + encodeURIComponent('slideshow.done'),
      invalidates: '/user',
      method: 'PUT',
      body: {
        value: true
      }
    }
  })
}))({
  render,
  initialState,
  reducer
})


