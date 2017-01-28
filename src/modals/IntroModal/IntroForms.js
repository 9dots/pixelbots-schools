/**
 * Imports
 */

import SubjectSelector from 'components/SubjectSelector'
import {Flex, Icon, ModalHeader, Block} from 'vdux-ui'
import {Button, Text, Tooltip} from 'vdux-containers'
import GradeSelector from 'components/GradeSelector'
import BlockInput from 'components/BlockInput'
import JoinSchool from 'components/JoinSchool'
import {component, element} from 'vdux'
import summon from 'vdux-summon'

/**
 * Constants
 */

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

/**
 * <IntroForms/>
 */

export default summon(({currentUser}) => ({
  saveGrades: gradeLevels => ({
    savingGrades: {
      url: `/user/${currentUser._id}/gradeLevels`,
      method: 'PUT',
      body: {
        gradeLevels
      }
    }
  }),
  saveSubjects: subjects => ({
    savingSubjects: {
      url: `/user/${currentUser._id}/subjects`,
      method: 'PUT',
      body: {
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
}))(component({
  initialState: {
    grades: [],
    subjects: [],
    step: 0
  },

  render ({props, state, actions, context}) {
    const {saveGrades, savingSubjects, savingPreference} = props
    const {step, grades, subjects} = state

    return (
      <Flex column align='center center' tall wide>
        <Flex column align='center center' tall wide hide={step !== 0}>
          <ModalHeader>
            Find Your School
          </ModalHeader>
          <Block w={350} h={200} align='center center' column>
            <Icon name='school' fs='80px' mb='l'/>
            <JoinSchool mb wide />
            <Text 
              // onClick={context.openModal(() => <CreateSchoolModal />)}
              color='grey_medium'
              textAlign='center'
              display='block'
              underline 
              fs='xxs'
              pointer
              mb='l'>
              Can't find your school? Click to create it!
            </Text>
          </Block>
          <Button {...btnProps} onClick={[saveGrades(grades), actions.next]} disabled={false}>
              <Flex align='center center' fw='lighter'>
                Next
                <Icon name='keyboard_arrow_right' />
              </Flex>
          </Button>
        </Flex>
        <Flex column align='center center' tall wide hide={step !== 1}>
          <ModalHeader>
            What Grades Do You Teach?
          </ModalHeader>
          <GradeSelector toggle={actions.toggleGrade} selected={grades} />
          <Tooltip message={!grades.length && 'Please select one or more grades'} {...ttProps}>
            <Button {...btnProps} onClick={[saveGrades(grades), actions.next]} disabled={!grades.length}>
              <Flex align='center center' fw='lighter'>
                Next
                <Icon name='keyboard_arrow_right' />
              </Flex>
            </Button>
          </Tooltip>
        </Flex>

        <Flex column align='center center' tall wide hide={step !== 2}>
          <ModalHeader>
            What Subjects Do You Teach?
          </ModalHeader>
          <SubjectSelector toggle={actions.toggleSubject} selected={subjects} />
          <Tooltip message={!subjects.length && 'Please select one or more subjects'} {...ttProps}>
            <Button {...btnProps} onClick={actions.submit} disabled={!subjects.length} busy={(savingSubjects || savingPreference || {}).loading}>
              <Flex align='center center' fw='lighter'>
                <Icon name='check' mr />
                Let's Get Started
              </Flex>
            </Button>
          </Tooltip>
        </Flex>

        <Text hide={step === 0} pointer onClick={actions.skip} absolute bottom right m color='grey' hoverProps={{underline: true}}>
          Skip
        </Text>
      </Flex>
    )
  },

  controller: {
    * skip ({props, context}) {
      yield props.finishedIntroModal()
      yield context.closeModal()
    },

    * submit ({props, state, context}, grades, subjects) {
      yield props.saveSubjects(state.subjects)
      yield props.finishedIntroModal()
      yield context.closeModal()
    }
  },

  reducer: {
    next: state => ({step: ++state.step}),
    toggleGrade: (state, grade) => ({
      grades: state.grades.indexOf(grade) === -1
        ? [...state.grades, grade]
        : state.grades.filter(g => g !== grade)
    }),
    toggleSubject: (state, subject) => ({
      subjects: state.subjects.indexOf(subject) === -1
        ? [...state.subjects, subject]
        : state.subjects.filter(s => s !== subject)
    })
  }
}))
