/**
 * Imports
 */

import DeleteActivityModal from 'modals/DeleteActivityModal'
import OutlineButton from 'components/OutlineButton'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'

/**
 * <DeleteButton/>
 */

function render ({props}) {
  const {text, user, activity, onClick = [], ...rest} = props
  const action = () => openModal(() => <DeleteActivityModal activity={activity} />)
  return (
    <OutlineButton
      onClick={[].concat(onClick, action)}
      color='grey_medium'
      icon='delete'
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
