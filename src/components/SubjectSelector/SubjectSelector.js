/**
 * Imports
 */

import {Flex, Block} from 'vdux-containers'
import mapValues from '@f/map-values'
import element from 'vdux/element'
import {Checkbox} from 'vdux-ui'

/**
 * <SubjectSelector/>
 */

function render ({props}) {
  const {selected, toggle} = props

  return (
    <Block
      focusProps={{
        boxShadow: '0 0 3px rgba(35,168,223,0.5)',
        borderColor: 'bluemedium'
      }}
      border='1px solid #CCC'
      overflow='auto'
      tabindex='-1'
      w='col_med'
      rounded
      h='200'
      wrap
      p >
      {
        mapValues((subjects, category) => item(subjects, category, selected, toggle), subjectMap)
      }
    </Block>
  )
}

function item (subjects, category, selected, toggle)  {
  return (
    <Block whiteSpace='nowrap' pl='s'>
      <Block capitalize fw='bolder' py='s'>{category}:</Block>
      {
        subjects.map(subject => option(subject, selected.indexOf(subject) !== -1, () => toggle(subject)))
      }
    </Block>
  )
}

function option (subject, selected, toggle)  {
  return (
    <Flex align='start center' px py='s'>
      <Checkbox label={subject} checked={selected} mr onChange={toggle} />
    </Flex>
  )
}


const subjectMap = {
  'Creative Arts': [
    'Art',
    'Dance',
    'Drama',
    'Music'
  ],
  'Health & PE': [
    'Driver\'s Educations',
    'Health Education',
    'Physical Education'
  ],
  'Language Arts': [
    'English',
    'ESL',
    'Journalism',
    'Reading',
    'Speech'
  ],
  'Mathematics': [
    'Algebra',
    'Basic Math',
    'Calculus',
    'Geometry',
    'Statistics',
    'Trigonometry'
  ],
  'Science': [
    'Basic Science',
    'Biology',
    'Chemistry',
    'Environmental Science',
    'Physics',
    'Psychology'
  ],
  'Social Studies': [
    'Economics',
    'European History',
    'Geography',
    'Government',
    'History',
    'U.S. History',
    'World History'
  ],
  'World Languages': [
    'American Sign Language',
    'Chinese (Mandarin)',
    'French',
    'German',
    'Italian',
    'Japanese',
    'Latin',
    'Spanish'
  ],
  'more': [
    'Computer Science',
    'Computer Technology',
    'Professional Development',
    'Special Education',
    'Vocational Studies',
    'Other'
  ]
}

/**
 * Exports
 */

export default {
  render
}
