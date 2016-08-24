/**
 * Imports
 */

import OutlineButton from 'components/OutlineButton'
import SignUpModal from 'modals/SignUpModal'
import {openModal} from 'reducer/modal'
import PinModal from 'modals/PinModal'
import element from 'vdux/element'

/**
 * <PinButton/>
 */

function render ({props}) {
  const {text, user, activity, onClick = [], onPin, ...rest} = props
  const action = () => openModal(() =>
    user
      ? <PinModal onClose={onPin} activity={activity} />
      : <SignUpModal />)
  return (
    <OutlineButton
      onClick={[].concat(onClick, action)}
      color='blue'
      weoIcon='pin'
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
