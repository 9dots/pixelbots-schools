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
    boxShadow: 'card',
    bgColor: 'white',
    borderRadius: 0,
    ellipsis: true,
    color: 'text',
    px: true,
    h: 45,
    hoverProps: {highlight: 0.02},
    focusProps: {highlight: 0.02},
    activeProps: {highlight: 0},
  }

  return (
    <Block align='start' mt>
      {
        <Button
          onMouseover={local(active, 'prev')}
          onClick={() => go(prev)}
          disabled={!prev}
          flex={activePrev}
          mr='s'
          {...style}>
          <Icon name='chevron_left' fs='s' />
          <Block ellipsis hide={!prev || !activePrev}>
            {prev && prev.displayName}
          </Block>
        </Button>
      }
      {
        <Button
          onMouseover={local(active, 'next')}
          onClick={() => go(next)}
          disabled={!next}
          flex={activeNext}
          ml='s'
          {...style}>
          <Block ellipsis hide={!next || !activeNext}>
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
