/**
 * Imports
 */

import {Button, Dropdown, MenuItem, Checkbox, Tooltip} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import subjects from '@weo-edu/subjects'
import mapValues from '@f/map-values'
import element from 'vdux/element'
import {Block, Icon} from 'vdux-ui'
import map from '@f/map'

/**
 * Render
 */


function render ({props, local, state}) {
  const current = state.category
  const {selected, toggle, max} = props
  const {error} = state
  const sbjList = []
  const counts = {}

  const selectedList = mapValues(t => { return t.displayName }, selected)

  mapValues((cat, key) =>
    cat.forEach(({displayName}) => {
      if(selectedList.indexOf(displayName) !== -1) {
        sbjList.push(displayName)
        counts[key] = counts[key] ? ++counts[key] : 1
      }
  }), subjects)

  const text = sbjList.length ? sbjList.join(', ') : 'Subject Selector'
  const btnStyle = sbjList.length ? {'bold': true, color: 'blue'} : {}

  return (
    <Dropdown w={505} left btn={<DDBtn {...btnStyle} text={text}/>} onClick={e => e.stopPropagation()} onClose={local(setError, null)}>
      <Block align='start' my={-6}>
        <Block flex='35%' borderRight='1px solid grey_light' py={6}>
          {
            map(category =>
              <Category
                onClick={local(setCategory, category)}
                category={category}
                current={current}
                count={counts[category]}/>,
            Object.keys(subjects))
          }
        </Block>
        <Block flex py={6}>
          {
            current
              ? map(subject => <Item tag={subject} selected={sbjList} toggle={toggleSubject} error={error === subject.displayName} />, subjects[current])
              : <Block p='8px 16px' fs='xs' color='grey_medium'>
                  Select a Subject Area
                </Block>

          }
        </Block>
      </Block>
    </Dropdown>
  )

  function * toggleSubject (subject) {
    if (sbjList.indexOf(subject.displayName) === -1 && sbjList.length + 1 > max) {
      yield local(setError, subject.displayName)()
    } else {
      yield local(setError, null)()
      yield toggle(subject)
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
      <Icon fs='s' name='keyboard_arrow_down' color='text' />
    </Button>
  )
}

function Category ({props}) {
  const {current, category, count, ...rest} = props
  const curProps = current === category
    ? {bgColor: 'blue', color: 'white'}
    : {}
  return (
    <MenuItem bold fs='xs' p='3px 6px 3px 12px' align='start center' capitalize {...rest} {...curProps}>
      <Block flex>
        {category}
        <Block tag='span' hide={!count} ml='s' italic fs='xxs'>
          ({count})
        </Block>
      </Block>
      <Icon name='keyboard_arrow_right' fs='s' />
    </MenuItem>
  )
}

function Item ({props}) {
  const {tag, selected, toggle, error} = props
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
      <Tooltip tooltipProps={{color: 'white', show: error, bgColor: 'red'}} placement='right' message='3 subjects max' />
    </MenuItem>
  )
}

/**
 * Actions
 */

const setCategory = createAction('<SubjectSelector />: setCategory')
const setError = createAction('<GradeSelector/>: set error')

/**
 * Reducer
 */

const reducer = handleActions({
  [setCategory]: (state, category) => ({...state, category}),
  [setError]: (state, error) => ({...state, error})
})

/**
 * Exports
 */

export default {
  render,
  reducer
}
