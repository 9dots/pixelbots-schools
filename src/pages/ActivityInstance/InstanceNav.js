/**
 * Imports
 */

import {activitySort} from 'lib/activity-helpers'
import summonChannels from 'lib/summon-channels'
import {setUrl} from 'redux-effects-location'
import {Button} from 'vdux-containers'
import findIndex from '@f/find-index'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <InstanceNav/>
 */

function render ({props}) {
  const {activities, activity, currentUser} = props
  const {loaded, value} = activities

  if (!loaded) {
    return <span/>
  }

  const instances = value.items

  instances.sort(activitySort(sort))

  const idx = findIndex(instances, inst => inst._id === activity._id)
  const prev = instances[idx - 1]
  const next = instances[idx + 1]
  const sort = currentUser.shareStudentSort || {property: 'name.givenName', dir: 1}

  return (
    <Block>
      {prev && <Button onClick={() => go(prev)}>{prev.actor.displayName}</Button>}
      {next && <Button onClick={() => go(next)}>{next.actor.displayName}</Button>}
    </Block>
  )

  function go (inst) {
    return setUrl(`/activity/${activity.root.id}/instance/${inst.actor.id}`)
  }
}

/**
 * Exports
 */

export default summonChannels(({activity}) => `share!${activity.root.id}.instances`)({
  onCreate: () => console.log('onCreate'),
  render
})
