/**
 * Imports
 */

import {Flex, Icon} from 'vdux-ui'
import {Button, Text, Block, Tooltip} from 'vdux-containers'
import GradeSelector from 'components/GradeSelector'
import SubjectSelector from 'components/SubjectSelector'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'

function initialState () {
  return {
    gradeSelected: false,
    subjectSelected: false
  }
}

/**
 * <IntroForms/>
 */

function render ({props, state, local}) {
  const {cur} = props
  const {isDone, gradeSelected, subjectSelected} = state
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
        <Text color='blue' fs='m' mb='l' fw='200'>
          What Grades Do You Teach?
        </Text>
        <GradeSelector />
        <Tooltip message={!gradeSelected && 'Please select one or more grades'} {...ttProps}>
          <Button {...btnProps} onClick={local(next)} disabled={!gradeSelected}>
            <Flex align='center center' fw='lighter'>
              Next
              <Icon name='keyboard_arrow_right'/>
            </Flex>
          </Button>
        </Tooltip>
      </Flex>

      <Flex column align='center center' tall wide hide={!isDone}>
        <Text color='blue' fs='m' mb='l' fw='200'>
          What Subjects Do You Teach?
        </Text>
        <SubjectSelector />
        <Tooltip message={!subjectSelected && 'Please select one or more subjects'} {...ttProps}>
          <Button {...btnProps} onClick={closeModal} disabled={!subjectSelected}>
            <Flex align='center center' fw='lighter'>
              <Icon name='check' mr/>
              Let's Get Started
            </Flex>
          </Button>
        </Tooltip>
      </Flex>

      <Text pointer onClick={() => closeModal()} absolute bottom right m color='grey' hoverProps={{underline: true}}>
        Skip
      </Text>
    </Flex>
  )
}

/**
 * Actions
 */

const next = createAction('<InforForms/>: next')

/**
 * Reducer
 */

const reducer = handleActions({
  [next]: state => ({
    ...state,
    isDone: true
  })
})

/**
 * Exports
 */

export default {
  render,
  initialState,
  reducer
}


