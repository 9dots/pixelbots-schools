/**
 * Imports
 */

import {activitySort, combineInstancesAndStudents} from 'lib/activity-helpers'
import {setUrl} from 'redux-effects-location'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {Button} from 'vdux-containers'
import findIndex from '@f/find-index'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <InstanceNav/>
 */

function render ({props, local, state}) {
  const {instances, activity, instance, students, currentUser} = props
  const {activeBtn = 'next'} = state

  const instStudents = combineInstancesAndStudents(activity, students, instances)
  const sort = currentUser.preferences.shareStudentSort || {property: 'name.givenName', dir: 1}

  instStudents.sort(activitySort(sort))

  const idx = findIndex(instStudents, inst => inst.instanceId === instance._id)
  const prev = instStudents[idx - 1]
  const next = instStudents[idx + 1]

  const activeNext = !prev || (next && activeBtn === 'next')
  const activePrev = !activeNext

  const style = {
    transition: 'flex-grow 0.35s',
    boxShadow: 'card',
    bgColor: 'white',
    borderRadius: 0,
    ellipsis: true,
    color: 'text',
    flex: true,
    px: true,
    h: 45,
    minWidth: '40px',
    hoverProps: {highlight: 0.01},
    focusProps: {outline: '1px solid rgba(blue_light, .4)'},
    activeProps: {highlight: 0},
  }

  return (
    <Block align='start' mt>
      {
        <Button
          onMouseover={local(active, 'prev')}
          onClick={() => go(prev)}
          disabled={!prev}
          mr='s'
          {...style}
          flexGrow={activePrev ?  1 : 0.0001}>
          <Icon name='chevron_left' fs='s' />
          <Block ellipsis hide={!prev || !activePrev} flex>
            {prev && prev.displayName}
          </Block>
        </Button>
      }
      {
        <Button
          onMouseover={local(active, 'next')}
          onClick={() => go(next)}
          disabled={!next}
          ml='s'
          {...style}
          flexGrow={activeNext ?  1 : 0.0001}>
          <Block ellipsis hide={!next || !activeNext} flex>
            {next && next.displayName}
          </Block>
          <Icon name='chevron_right' fs='s' />
        </Button>
      }
    </Block>
  )

  function go (inst) {
    return setUrl(`/activity/${activity._id}/instance/${inst.userId}`, true)
  }
}

/**
 * Actions
 */

const active = createAction('<InstanceNav/>: active')

/**
 * Reducer
 */

const reducer = handleActions({
  [active]: (state, which) => ({...state, activeBtn: which}),
})

/**
 * Exports
 */

export default {
  render,
  reducer
}
