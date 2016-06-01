/**
 * Imports
 */

import {Block, Checkbox} from 'vdux-ui'
import {Flex} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <GradeSelector/>
 */

function render ({props}) {
  const {toggle, selected} = props

  return (
    <Flex
      focusProps={{
        boxShadow: '0 0 3px rgba(blue, 0.5)',
        borderColor: 'blue_medium'
      }}
      border='1px solid #CCC'
      tabindex='-1'
      w='420px'
      rounded
      h='200'
      column
      wrap
      p>
      {
        grades.map(grade => item(grade, selected.indexOf(grade) !== -1, () => toggle(grade)))
      }
    </Flex>
  )
}

function item (grade, selected, toggle)  {
  return (
    <Flex align='start center' flex='20%' w='33%' whiteSpace='nowrap' pl='s'>
      <Checkbox label={grade} checked={selected} mr onChange={toggle} />
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
