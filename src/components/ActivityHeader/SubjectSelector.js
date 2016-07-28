/**
 * Imports
 */

import {Button, Dropdown, MenuItem, Checkbox} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import subjects from '@weo-edu/subjects'
import element from 'vdux/element'
import {Block, Icon} from 'vdux-ui'
import map from '@f/map'

/**
 * Render
 */


function render ({props, local, state}) {
  const current = state.category
  return (
    <Dropdown w={505} left btn={<DDBtn text='Subject Selector'/>} onClick={e => e.stopPropagation()}>
      <Block align='start' my={-6}>
        <Block flex='35%' borderRight='1px solid grey_light' py={6}>
          {
            map(category =>
              <Category
                onClick={local(setCategory, category)}
                category={category}
                current={current}/>,
            Object.keys(subjects))
          }
        </Block>
        <Block flex py={6}>
          {
            current
              ? map(subject => <Item tag={subject} />, subjects[current])
              : <Block p='8px 16px' fs='xs' color='grey_medium'>
                  Select a Subject Area
                </Block>

          }
        </Block>
      </Block>
    </Dropdown>
  )
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

function Category ({props}) {
  const {current, category, ...rest} = props
  const curProps = current === category
    ? {bgColor: 'blue', color: 'white'}
    : {}
  return (
    <MenuItem bold fs='xs' p='3px 6px 3px 12px' align='start center' capitalize {...rest} {...curProps}>
      <Block flex>{category}</Block>
      <Icon name='keyboard_arrow_right' fs='s' />
    </MenuItem>
  )
}

function Item ({props}) {
  const {tag} = props
  const {displayName} = tag

  return (
    <MenuItem tag='label' fs='xs' p='5px 8px' align='start center' capitalize>
      <Checkbox mr='s' checkProps={{sq: 15}}/>{displayName}
    </MenuItem>
  )
}

/**
 * Actions
 */

const setCategory = createAction('<SubjectSelector />: setCategory')

/**
 * Reducer
 */

const reducer = handleActions({
  [setCategory]: (state, category) => ({...state, category})
})


/**
 * Exports
 */

export default {
  render,
  reducer
}