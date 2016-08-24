/**
 * Imports
 */

import OutlineButton from 'components/OutlineButton'
import AssignModal from 'modals/AssignModal'
import SignUpModal from 'modals/SignUpModal'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'

/**
 * <AssignButton/>
 */

function render ({props}) {
  const {text, user, activity, onClick = [], onAssign, ...rest} = props
  const action = () => openModal(() =>
    user
      ? <AssignModal onClose={onAssign} activity={activity} />
      : <SignUpModal />)
  return (
    <OutlineButton
      onClick={[].concat(onClick, action)}
      color='green'
      icon='send'
      {...rest}>
      {text}
    </OutlineButton>
  )
}

/**
 * Exports
 */

export default {
  render
}
