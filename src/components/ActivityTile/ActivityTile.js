/**
 * Imports
 */

import ActivityCardActions from 'components/ActivityCardActions'
import {Flex, Block, Card, Text, Icon} from 'vdux-ui'
import {wrap, CSSContainer} from 'vdux-containers'
import {setUrl} from 'redux-effects-location'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import WeoIcon from 'components/WeoIcon'
import Figure from 'components/Figure'
import element from 'vdux/element'
import ForkMeta from './ForkMeta'
import Meta from './Meta'

/**
 * Activity Tile
 */

function render ({props}) {
  const {activity, showFork} = props
  const {image, displayName, description} = activity
  const TileMeta = showFork ? ForkMeta : Meta

  return (
    <Card w={230} relative my={8} mx={6}>
      <Activity {...props} hoverProps={{hover: true}} />
      <Block px={12} py={6} fs='xxs' borderTop='rgba(0, 0, 0, 0.04)' bgColor='#FCFCFC'>
        <TileMeta activity={activity} />
      </Block>
    </Card>
  )
}

/**
 * Actions
 */

const localLike = createAction('<ActivityTile/>: local like')

/**
 * <Activity/> component
 */

const Activity = wrap(CSSContainer)({
  render ({props, local, state}) {
    const {activity, user = {}, hover, actions = []} = props
    const {image, displayName, description, _id, likers, repinCount, replies} = activity
    const url = `/activity/${_id}/public/preview`

    const {locallyLiked} = state
    const likes = likers.length + (locallyLiked ? 1 : 0)

    return (
      <Flex column cursor='zoom-in' pb onClick={() => setUrl(url)}>
        {
          actions.length && hover &&
            <ActivityCardActions liked={locallyLiked} localLike={local(localLike)} actions={actions} assign activity={activity} user={user} absolute wide z='1' />
        }
        <Figure key='img' {...image} thumb={true} opacity={hover && .88} />
        <Block textAlign='center' m='m'>
          <Text my='s' fs='s' display='block' fw='200'>{displayName}</Text>
          <Text fs='xxs' wordBreak='break-word'>{description}</Text>
        </Block>
        <Flex align='center center' color='grey_medium' fs='xxs' maxHeight='14px'>
          <Flex align='center center' hide={!likes}>
            <Icon name='favorite' fs='xs'/>
            <Text mr='4' ml='2'>{likes}</Text>
          </Flex>
          <Flex align='center center' hide={!repinCount}>
            <WeoIcon name='pin' fs='14' mb='-2'/>
            <Text mr='4' ml='2'>{repinCount}</Text>
          </Flex>
          <Flex align='center center' hide={!replies.canonicalTotal.items}>
            <Icon name='mode_comment' fs='xs' mb='-2'/>
            <Text mr='4' ml='2'>{replies.canonicalTotal.items}</Text>
          </Flex>
        </Flex>
      </Flex>
    )
  },

  /**
   * Reducer
   */

  reducer: handleActions({
    [localLike]: state => ({
      ...state,
      locallyLiked: !state.locallyLiked
    })
  })
})

/**
 * Exports
 */

export default {
  render
}
