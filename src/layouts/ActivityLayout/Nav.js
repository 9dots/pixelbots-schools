/**
 * Imports
 */

import ActivityDropdownMenu from 'components/ActivityDropdownMenu'
import AssignButton from 'components/AssignButton'
import {Block, Fixed, Flex, Text} from 'vdux-ui'
import LikeButton from 'components/LikeButton'
import {back} from 'redux-effects-location'
import handleActions from '@f/handle-actions'
import PinButton from 'components/PinButton'
import createAction from '@f/create-action'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import Link from 'components/Link'


/**
 * Activity Nav
 */

function render({props, local, state}) {
  const {
    activity, user, isPublic, isInstance, instance,
    progress, overview, preview, discussion
  } = props
  const {_id: id, displayName} = activity
  const {locallyLiked} = state
  const comments = activity.replies.canonicalTotal.items

  return (
    <Block>
      <Fixed bgColor='white' wide top z={3} boxShadow='card' align='start center' h={53}>
        <Flex align='start center' wide px flex>
          <Button icon='arrow_back' fs='s' onClick={back} color='text' mr />
          <Text fs='s' lighter>{displayName}</Text>
        </Flex>
        <Flex align='center center'>
          <NavTile highlight='red' path={`${id}/students`} hide={!progress}>
            Student Progress
          </NavTile>
          <NavTile highlight='green' path={`${id}/overview`} hide={!overview}>
            Class Overview
          </NavTile>
          <NavTile highlight='blue' path={`${id}/preview`} hide={!preview}>
            Activity Preview
          </NavTile>
          <NavTile highlight='blue' path={`${id}/instance/${user._id}`} hide={!instance}>
            Activity
          </NavTile>
          <NavTile highlight='yellow' path={`${id}/discussion`} hide={!discussion}>
            <Text color='grey_medium' mr='s' hide={!comments}>
              {comments}
            </Text>
            Discussion
          </NavTile>
        </Flex>
        <Block flex px>
          <Flex flex align='end center' hide={isInstance}>
            <LikeButton
              liked={locallyLiked}
              hide={!isPublic}
              localLike={local(localLike)}
              activity={activity}
              user={user}/>
            <AssignButton
              activity={activity}
              hide={!isPublic}
              text='Assign'
              user={user}/>
            <PinButton
              activity={activity}
              user={user}
              text='Pin'/>
            <ActivityDropdownMenu
              reassign={!isInstance && !isPublic}
              hide={user.userType === 'student'}
              activity={activity}/>
          </Flex>
        </Block>
      </Fixed>
      <Block pt={53} hidden mb/>
    </Block>
  )
}

function NavTile ({props, children}) {
  const {highlight, page, path, ...rest} = props
  const height = '53px'

  return (
    <Block px={10} {...rest}>
      <Link
        currentProps={{borderBottomColor: highlight}}
        hoverProps={{borderBottomColor: highlight}}
        borderBottom='3px solid transparent'
        href={`/activity/${path}`}
        display='inline-block'
        transition='all 0.2s'
        textAlign='center'
        lh={height}
        h={height}
        uppercase
        fs='xxs'
        replace
        px='s'>
        {children}
      </Link>
    </Block>
 )
}
/**
 * initialState
 */

function initialState () {
  return {
    locallyLiked: 0
  }
}

/**
 * Actions
 */

const localLike = createAction('<Nav/>: local like')

/**
 * Reducer
 */

const reducer = handleActions({
  [localLike]: (state, inc) => ({
    ...state,
    locallyLiked: state.locallyLiked + inc
  })
})

/**
 * Exports
 */

export default {
  initialState,
  render,
  reducer
}
