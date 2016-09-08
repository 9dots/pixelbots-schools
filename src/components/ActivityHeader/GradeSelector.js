/**
 * Imports
 */

import {Button, Dropdown, MenuItem, Checkbox, Tooltip} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import mapValues from '@f/map-values'
import grades from '@weo-edu/grades'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'
import map from '@f/map'

/**
 * Render
 */


function render ({props, local, state}) {
  const {selected, toggle, max = Infinity} = props
  const {error} = state

  const selectedList = mapValues(t => t.displayName, selected)
  const gradeList = grades.reduce((arr, {displayName}) =>
    selectedList.indexOf(displayName) !== -1
      ? arr.concat(displayName)
      : arr.concat([])
  , [])

  const text = gradeList.length ? gradeList.join(', ') : 'Grade Selector'

  return (
    <Dropdown onClick={e => e.stopPropagation()} wide btn={<DDBtn text={text}/>} onClose={local(setError, null)}>
      { map(grade => <Item tag={grade} selected={gradeList} toggle={toggleGrade} error={error === grade.displayName} max={max} />, grades) }
    </Dropdown>
  )

  function * toggleGrade (grade) {
    if (gradeList.indexOf(grade.displayName) === -1 && gradeList.length + 1 > max) {
      yield local(setError, grade.displayName)()
    } else {
      yield toggle(grade)
    }
  }
}

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
      wide
      px
      {...rest}>
      <Block flex ellipsis>{text}</Block>
      <Icon fs='s' name='keyboard_arrow_down' />
    </Button>
  )
}

function Item ({props}) {
  const {tag, selected, toggle, error, max} = props
  const {displayName} = tag
  const checked = selected.indexOf(displayName) !== -1
  const errorProps = error
    ? {bgColor: 'rgba(red_light, .5)', hoverProps: {}}
    : {}

  return (
    <MenuItem
      onClick={() => toggle(tag)}
      align='start center'
      {...errorProps}
      p='5px 8px'
      tag='label'
      capitalize
      fs='xs'>
      <Checkbox mr='s' onClick={e => e.stopPropagation()} checkProps={{sq: 15}} checked={checked}/>
      <Block flex>
        {displayName}
      </Block>
      <Tooltip tooltipProps={{color: 'white', show: error, bgColor: 'red'}} placement='right' message={`You may only select up to ${max} grades.`} />
    </MenuItem>
  )
}

/**
 * Actions
 */

const setError = createAction('<GradeSelector/>: set error')

/**
 * Reducer
 */

const reducer = handleActions({
  [setError]: (state, error) => ({
    ...state,
    error
  })
})

/**
 * Exports
 */

export default {
  render,
  reducer
}
