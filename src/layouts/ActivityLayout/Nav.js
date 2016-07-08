/**
 * Imports
 */

import ActivityDropdownMenu from 'components/ActivityDropdownMenu'
import AssignButton from 'components/AssignButton'
import {Block, Fixed, Flex, Text} from 'vdux-ui'
import LikeButton from 'components/LikeButton'
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
  const {activity, user, classId} = props
  const {locallyLiked} = state
  const isPublic = classId === 'public'

  return (
    <Block>
      <Fixed bgColor='white' wide top z={2} boxShadow='card' align='start center' h={53}>
        <Flex align='start center' wide px flex>
          <Button icon='arrow_back' fs='s' onClick={() => window.history.back()} color='text' mr />
          <Text fs='s' lighter>
            {activity.displayName}
          </Text>
        </Flex>
        <Flex align='center center'>
          <NavTile highlight='red' page='students' hide={isPublic}>
            Student Progress
          </NavTile>
          <NavTile highlight='green' page='overview' hide={isPublic}>
            Class Overview
          </NavTile>
          <NavTile highlight='blue' page='preview'>
            Activity Preview
          </NavTile>
          <NavTile highlight='yellow' page='discussion'>
            Discussion
          </NavTile>
        </Flex>
        <Flex flex align='end center' px>
          <LikeButton
            liked={locallyLiked}
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
          <ActivityDropdownMenu activity={activity} hide={user.userType === 'student'} />
        </Flex>
      </Fixed>
      <Block pt={53} hidden mb/>
    </Block>
  )
}

function NavTile ({props, children}) {
  const {highlight, page, ...rest} = props
  const height = '53px'
  const href = getUrl(page)

  return (
    <Block px={10}>
      <Link
        currentProps={{borderBottomColor: highlight}}
        hoverProps={{borderBottomColor: highlight}}
        display='inline-block'
        fs='xxs'
        uppercase
        h={height}
        lh={height}
        textAlign='center'
        borderBottom='3px solid transparent'
        transition='all 0.2s'
        href={href}
        px
        {...rest}>
        {children}
      </Link>
    </Block>
 )
}

/**
 * Helpers
 */

function getUrl(page) {
  let cur = window.location.pathname
  if(cur[cur.length - 1] === '/')
    cur = cur.substring(0, cur.length - 1)
  return cur.substring(0, cur.lastIndexOf('/')) + '/' + page
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
