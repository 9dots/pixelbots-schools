/**
 * Imports
 */

import {Block, Dropdown, MenuItem, Icon, Divider, CSSContainer} from 'vdux-containers'
import LineInput from 'components/LineInput'
import element from 'vdux/element'
import map from '@f/map'
import ClassItem from './ClassItem'
import createAction from '@f/create-action'
import handleActions from '@f/handle-actions'

/**
 * <ClassNav/>
 */

function render ({props, state, local, children}) {
  const {classes = []} = props
  const sortedClasses = classes.filter(function(cls) {
      if(state.filter === undefined)
        return true
      return cls.displayName.toUpperCase().indexOf(state.filter.toUpperCase()) !== -1
    }).sort(function(a, b) {
      return a.displayName.toUpperCase() > b.displayName.toUpperCase() ? 1 : -1
    })

  return (
    <Dropdown btn={<div>{children}</div>} bg='white' color='black' maxHeight={350} overflow='auto' mt='-6' w='200' left>
      <Block bg='transparent' pt='s' px onClick={e => e.stopPropagation()} hide={classes.length < 8}>
        <LineInput type='search' onInput={local(setFilter)} placeholder='Filter classes…' />
      </Block>
      { map(cls => <ClassItem cls={cls} />, sortedClasses) }
      <Divider />
      <MenuItem py='m' color='text_color' display='flex' align='start center'>
        <Icon name='add' fs='s' mr='m' sq='25' textAlign='center' />
        New Class
      </MenuItem>
    </Dropdown>
  )
}

/**
 * Actions
 */

const setFilter = createAction('<ClassNav/>: Set filter', e => e.target.value)

/**
 * Reducer
 */

const reducer = handleActions({
  [setFilter]: (state, filter) => ({
    ...state,
    filter
  })
})

/**
 * Exports
 */

export default {
  render,
  reducer
}
