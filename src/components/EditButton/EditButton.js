/**
 * Imports
 */

import OutlineButton from 'components/OutlineButton'
import {setUrl} from 'redux-effects-location'
import element from 'vdux/element'

/**
 * <EditButton/>
 */

function render ({props}) {
  const {onClick = [], text, activity, ...rest} = props
  const action = () => setUrl(`/activity/${activity._id}/edit`)
  return (
    <OutlineButton
      onClick={[].concat(onClick, action)}
      color='grey_medium'
      icon='edit'
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
