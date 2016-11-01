/**
 * Imports
 */

import CreateClassModal from 'modals/CreateClassModal'
import JoinClassModal from 'modals/JoinClassModal'
import {setUrl} from 'redux-effects-location'
import {Block, Card, Text, Icon} from 'vdux-ui'
import {MenuItem} from 'vdux-containers'
import {openModal} from 'reducer/modal'
import Link from 'components/Link'
import element from 'vdux/element'
import summon from 'vdux-summon'

function render ({props}) {
  const {classes, user} = props
  const {value, loading} = classes
  const clsLength = !loading && value.items.length

  return (
    <Card hide={clsLength < 1} {...props}>
      <Block p uppercase boxShadow={clsLength > 5 && '0 2px 1px rgba(75,82,87,0.1)'} z='1' relative>
        My Classes
      </Block>
      <Block maxHeight='247px' overflow='auto' border='1px solid rgba(75,82,87,0.05)' borderWidth='1px 0'>
        { !loading && value.items.sort(cmp).map(item) }
        {
          user.userType === 'student'
            ? <AddClassItem Modal={JoinClassModal} text='Join Class' />
            : <AddClassItem Modal={CreateClassModal} text='New Class' />
        }
      </Block>
      <Block boxShadow={clsLength > 5 && '0 -2px 1px rgba(75,82,87,0.1)'} z='1' relative p/>
    </Card>
  )
}

function item (cls) {
  const {_id, displayName} = cls
  return (
    <Link
      currentProps={{borderLeftColor: 'blue', highlight: 0.05, color: 'text'}}
      borderLeft='3px solid transparent'
      href={`/class/${_id}/feed`}
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

/**
 * Exports
 */

export default summon(() => ({
  classes: '/user/classes'
}))({
  render
})
