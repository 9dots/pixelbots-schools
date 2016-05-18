/**
 * Imports
 */

import {Flex} from 'vdux-containers'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <GradeSelector/>
 */

function render ({props}) {
  return (
    <Flex
      focusProps={{
        boxShadow: '0 0 3px rgba(35,168,223,0.5)',
        borderColor: 'bluemedium'
      }}
      border='1px solid #CCC'
      tabindex='-1'
      w='col_med'
      rounded
      h='200'
      column
      wrap
      p >
      {
        grades.map(grade => item(grade))
      }
    </Flex>
  )
}

function item(grade)  {
  return (
    <Flex align='start center' flex='20%' w='33%' whiteSpace='nowrap' pl='s'>
      <Block mr>
        <Block sq='16' rounded border='1px solid #BBB' />
      </Block>
      <Block flex>{grade}</Block>
    </Flex>
  )
}

const grades = [
  'Pre-K',
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
 * Exports
 */

export default {
  render
}
