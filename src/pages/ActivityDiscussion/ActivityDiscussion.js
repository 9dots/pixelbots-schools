/**
 * Imports
 */

import summonChannels from 'lib/summon-channels'
import Loading from 'components/Loading'
import CommentForm from './CommentForm'
import Avatar from 'components/Avatar'
import {Block, Card} from 'vdux-ui'
import element from 'vdux/element'
import getProp from '@f/get-prop'
import moment from 'moment'
import map from '@f/map'

/**
 * <ActivityPreview/>
 */

function render ({props}) {
  const { currentUser, activities, activity, classId } = props
  const {value, loading, loaded} = activities

  if(loading && !loaded) return <Loading show h={200} />

  const comments = value.items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

  return (
    <Card w='col_main' mx='auto' mb='l'>
      <Block p fs='l' lighter bg='grey' color='white'>
        Discussion
      </Block>
      <Block p='xl' fs='s' lighter hide={comments.length}>
        No one has made any comments yet. Be the first to share!
      </Block>
      {
        map((comment, i) => <Comment i={i} comment={comment}/>, comments)
      }
      <CommentForm id={activity._id} currentUser={currentUser} classId={classId} />
    </Card>
  )
}

function Comment({props}) {
  const {comment, i} = props
  const {actor, createdAt} = comment
  const content = getProp('_object.0.originalContent', comment)

  return (
    <Block px='l' pt={i ? 0 : 'l'} pb='l' align='start start' relative>
      <Block w={4} absolute left={38} tall top bgColor='#EEE' />
      <Avatar boxSizing='content-box' border='3px solid white' mr actor={actor} relative ml={-3} />
      <Block flex px='l' py rounded bgColor='off_white' border='1px solid #E0E0E0' relative>
        <Block bold mb>{actor.displayName}</Block>
        <Block lighter>
          {content}
        </Block>
        <Block fs='xxs' color='grey_medium' lighter absolute top right m>
          { moment(createdAt).fromNow() }
        </Block>
        <Arrow />
      </Block>
    </Block>
  )
}

function Arrow() {
  return (
    <span>
      <Block
        absolute={{top: 8, right: '100%'}}
        border='10px solid transparent'
        borderRightColor='#CCC'/>
      <Block
        absolute={{top: 8, right: '100%'}}
        border='10px solid transparent'
        borderRightColor='off_white'
        mr={-1}/>
    </span>
  )
}

/**
 * Exports
 */

export default summonChannels(
  props => `share!${props.activity._id}.replies`
)({
  render
})
