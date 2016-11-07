/**
 * Imports
 */

import CreateClassModal from 'modals/CreateClassModal'
import JoinClassModal from 'modals/JoinClassModal'
import {setUrl} from 'redux-effects-location'
import {Block, Card, Text, Icon} from 'vdux-ui'
import handleActions from '@f/handle-actions'
import RoundedInput from 'components/RoundedInput'
import createAction from '@f/create-action'
import {MenuItem} from 'vdux-containers'
import {openModal} from 'reducer/modal'
import Link from 'components/Link'
import element from 'vdux/element'
import summon from 'vdux-summon'

function render ({props, state, local}) {
  const {classes, user} = props
  const {value, loading} = classes
  const clsLength = !loading && value.items.length
  const {drafts: {canonicalTotal: {items}}, userType} = user
  console.log(items)
  const offset = userType === 'teacher'
    ? items ? '440px' : '370px'
    : '262px'

  return (
    <Card {...props}>
      <Block p uppercase boxShadow='0 2px 1px rgba(75,82,87,0.1)' z='1' relative align='space-between center'>
        <Block>Classes</Block>
        <RoundedInput  type='search' onInput={local(setFilter)} placeholder='Filter…' py='s' px={10} m={0} bgColor='#FDFDFD' inputProps={{textAlign: 'left'}} w={120} hide={clsLength < 7} />
      </Block>
      <Block maxHeight={`calc(100vh - ${offset})`} overflow='auto' border='1px solid rgba(75,82,87,0.05)' borderWidth='1px 0'>
        {[
          !state.filter &&
            item({_id: 'all', displayName: 'All Classes'}),
          !loading && value.items.filter(search(state.filter)).sort(cmp).map(item),
          user.userType === 'student'
            ? <AddClassItem Modal={JoinClassModal} text='Join Class' />
            : <AddClassItem Modal={CreateClassModal} text='New Class' />
        ]}
      </Block>
      <Block boxShadow='0 -2px 1px rgba(75,82,87,0.1)' z='1' relative p/>
    </Card>
  )
}

function item (cls) {
  const {_id, displayName} = cls
  return (
    <Link
      currentProps={{borderLeftColor: 'blue', highlight: 0.05, color: 'text'}}
      borderLeft='3px solid transparent'
      href={`/class/${_id}`}
      align='start center'
      ui={MenuItem}
      p>
      <Block circle='25px' lh='25px' mr textAlign='center' bg='green' color='white' uppercase>{displayName[0]}</Block>
      <Text capitalize>{displayName}</Text>
    </Link>
  )
}

function AddClassItem ({props}) {
  const {Modal, text} = props
  return (
    <MenuItem onClick={() => openModal(() => <Modal />)} py='m' color='text_color' display='flex' align='start center'>
      <Icon name='add' fs='s' mr='m' sq='25' textAlign='center' />
      {text}
    </MenuItem>
  )
}

/**
 * Helpers
 */

function cmp (a, b) {
  return a.displayName.toUpperCase() > b.displayName.toUpperCase()
    ? 1
    : -1
}

function search (text = '') {
  text = text.toUpperCase()
  return cls => !text
    ? true
    : cls.displayName.toUpperCase().indexOf(text) !== -1
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

export default summon(() => ({
  classes: '/user/classes'
}))({
  render,
  reducer
})
