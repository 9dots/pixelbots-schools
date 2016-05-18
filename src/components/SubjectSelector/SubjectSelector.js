/**
 * Imports
 */

import {Flex, Block} from 'vdux-containers'
import element from 'vdux/element'
import mapValues from '@f/map-values'

/**
 * <SubjectSelector/>
 */

function render ({props}) {
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
        mapValues(item, subjectMap)
      }
    </Block>
  )
}

function item(subjects, category)  {
  return (
    <Block whiteSpace='nowrap' pl='s'>
      <Block capitalize fw='bolder' py='s'>{category}:</Block>
      {
        subjects.map(option)
      }
    </Block>
  )
}

function option(subject)  {
  return (
    <Flex align='start center' px py='s'>
      <Block mr>
        <Block sq='16' rounded border='1px solid #BBB' />
      </Block>
      <Block flex>{subject}</Block>
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
