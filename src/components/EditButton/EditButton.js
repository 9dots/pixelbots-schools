/**
 * Imports
 */

import OutlineButton from 'components/OutlineButton'
import {setUrl} from 'redux-effects-location'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <EditButton/>
 */

function render ({props}) {
  const {onClick = [], text, activity, copy, copyActivity, intent, ...rest} = props
  const action = () => setUrl(`/activity/${activity._id}/edit`)
  return (
    <OutlineButton
      onClick={[].concat(onClick, handleClick)}
      color='grey_medium'
      icon='edit'
      {...rest}>
      {text}
    </OutlineButton>
  )

  function * handleClick () {
    let act = activity
    if (copy) act = yield copyActivity()
    yield setUrl(`/activity/${act._id}/edit${intent ? '/' + intent : ''}`)
  }
}

/**
 * Exports
 */

export default summon(({activity}) => ({
  copyActivity: () => ({
    copyingActivity: {
      url: `/share/${activity._id}/copy`,
      method: 'POST'
    }
  })
}))({
  render
})
