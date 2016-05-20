/**
 * Imports
 */

import {Button, Text, Block, Tooltip} from 'vdux-containers'
import SubjectSelector from 'components/SubjectSelector'
import GradeSelector from 'components/GradeSelector'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {closeModal} from 'reducer/modal'
import {Flex, Icon} from 'vdux-ui'
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
  const {cur, finishedIntroModal, saveGradesAndSubjects} = props
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
        <Text py='l' fs='m' fw='200' color='blue' textAlign='center'>
          What Grades Do You Teach?
        </Text>
        <GradeSelector toggle={local(toggleGrade)} selected={grades} />
        <Tooltip message={!grades.length && 'Please select one or more grades'} {...ttProps}>
          <Button {...btnProps} onClick={local(next)} disabled={!grades.length}>
            <Flex align='center center' fw='lighter'>
              Next
              <Icon name='keyboard_arrow_right' />
            </Flex>
          </Button>
        </Tooltip>
      </Flex>

      <Flex column align='center center' tall wide hide={!isDone}>
        <Text color='blue' fs='m' mb='l' fw='200'>
          What Subjects Do You Teach?
        </Text>
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

      <Text pointer onClick={[finishedIntroModal, closeModal]} absolute bottom right m color='grey' hoverProps={{underline: true}}>
        Skip
      </Text>
    </Flex>
  )

  function * submit () {
    yield saveGradesAndSubjects(grades, subjects)
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
  saveGradesAndSubjects: (gradeLevels, subjects) => ({
    savingGradesAndSubjects: {
      url: '/user/',
      method: 'PUT',
      body: {
        ...currentUser,
        gradeLevels,
        subjects
      }
    }
  }),
  finishedIntroModal: () => ({
    savingPreference: {
      url: '/preference/' + encodeURIComponent('slideshow.done'),
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


