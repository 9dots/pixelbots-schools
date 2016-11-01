/**
 * Imports
 */

import {Block, Dropdown, MenuItem, Icon, Divider, CSSContainer} from 'vdux-containers'
import CreateClassModal from 'modals/CreateClassModal'
import JoinClassModal from 'modals/JoinClassModal'
import LineInput from 'components/LineInput'
import {component, element} from 'vdux'
import ClassItem from './ClassItem'
import summon from 'vdux-summon'

/**
 * <ClassNav/>
 */

export default summon(() => ({
  classes: '/user/classes'
}))(component({
  render ({props, state, actions, children}) {
    const {classes, currentUser} = props
    const {value, loading} = classes
    const numClasses = !loading && value.items.length
    const isStudent = currentUser.userType === 'student'

    return (
      <Dropdown btn={<div>{children}</div>} bg='white' color='black' maxHeight={350} overflow='auto' mt='-6' w='200' left>
        <Block>
          <Block bg='transparent' pt='s' px onClick={actions.stopPropagation} hide={numClasses < 8}>
            <LineInput type='search' onInput={actions.setFilter} placeholder='Filter classes…' />
          </Block>
          <Block>
          {
            !loading &&
            value.items
              .filter(search(state.filter))
              .map(cls => <ClassItem cls={cls} isStudent={isStudent} />)
          }
          <Divider hide={!numClasses} />
          {
            isStudent
              ? <AddClassItem Modal={JoinClassModal} text='Join Class' />
              : <AddClassItem Modal={CreateClassModal} text='New Class' />
          }
          </Block>
        </Block>
      </Dropdown>
    )
  },

  events: {
    stopPropagation (model, e) {
      e.stopPropagation()
    }
  },

  reducer: {
    setFilter: (state, e) => ({filter: e.target.value})
  }
}))

/**
 * <AddClassItem/>
 */

const AddClassItem = component({
  render ({props, actions}) {
    const {text} = props

    return (
      <MenuItem onClick={actions.openModal} py='m' color='text_color' display='flex' align='start center'>
        <Icon name='add' fs='s' mr='m' sq='25' textAlign='center' />
        {text}
      </MenuItem>
    )
  },

  events: {
    * openModal ({context, props}) {
      yield context.openModal(() => props.Modal)
    }
  }
})

/**
 * Helpers
 */

function search (text = '') {
  text = text.toUpperCase()

  return cls => !text
    ? true
    : cls.displayName.toUpperCase().indexOf(text) !== -1
}
