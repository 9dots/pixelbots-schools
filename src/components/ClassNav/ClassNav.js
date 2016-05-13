/**
 * Imports
 */

import {Block, Dropdown, MenuItem, Icon, Divider, CSSContainer} from 'vdux-containers'
import CreateClassModal from 'modals/CreateClassModal'
import handleActions from '@f/handle-actions'
import LineInput from 'components/LineInput'
import createAction from '@f/create-action'
import {openModal} from 'reducer/modal'
import ClassItem from './ClassItem'
import element from 'vdux/element'

/**
 * <ClassNav/>
 */

function render ({props, state, local, children}) {
  const {classes = []} = props

  return (
    <Dropdown btn={<div>{children}</div>} bg='white' color='black' maxHeight={350} overflow='auto' mt='-6' w='200' left>
      <Block bg='transparent' pt='s' px onClick={e => e.stopPropagation()} hide={classes.length < 8}>
        <LineInput type='search' onInput={local(setFilter)} placeholder='Filter classes…' />
      </Block>
      {
        classes
          .filter(search(state.filter))
          .sort(cmp)
          .map(cls => <ClassItem cls={cls} />)
      }
      <Divider />
      <MenuItem onClick={() => openModal(<CreateClassModal />)} py='m' color='text_color' display='flex' align='start center'>
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
 * Helpers
 */

function search (text) {
  return cls => text === undefined
    ? true
    : cls.displayName.toUpperCase().indexOf(text) !== -1
}

function cmp (a, b) {
  return a.displayName.toUpperCase() > b.displayName.toUpperCase()
    ? 1
    : -1
}

/**
 * Exports
 */

export default {
  render,
  reducer
}
