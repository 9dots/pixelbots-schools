/**
 * Imports
 */

import {Button, Textarea} from 'vdux-containers'
import summonChannels from 'lib/summon-channels'
import {Block, Card, Text} from 'vdux-ui'
import Loading from 'components/Loading'
import Avatar from 'components/Avatar'
import element from 'vdux/element'
import getProp from '@f/get-prop'
import moment from 'moment'
import map from '@f/map'

/**
 * <ActivityPreview/>
 */

function render ({props}) {
  const {currentUser, activities} = props
  const {value, loading, loaded} = activities
  if(loading && !loaded)
    return <Loading show h={200} />

  const {items: comments} = value
  return (
    <Card w='col_main' mx='auto'>
      <Block p fs='l' lighter bg='grey' color='white'>
        Discussion
      </Block>
      <Block p='xl' fs='s' lighter hide={comments.length}>
        No one has made any comments yet. Be the first to share!
      </Block>
      {
        map(comment => <Comment comment={comment}/>, comments)
      }
      <Block p='l' bg='off_white' borderTop='1px solid rgba(black, .05)' align='start start'>
        <Avatar actor={currentUser} size='40px' />
        <Block flex mx>
          <Textarea
            focusProps={{border: '1px solid rgba(37, 168, 224, 0.35)'}}
            activeProps={{border: '1px solid rgba(37, 168, 224, 0.35)'}}
            placeholder='Write your comment…'
            borderColor='grey_light'
            lh='1.5em'
            rows={2}
            p/>
        </Block>
        <Button bgColor='grey'>Submit</Button>
      </Block>
    </Card>
  )
}

function Comment({props}) {
  const {comment} = props
  const {actor, createdAt} = comment
  const content = getProp('_object.0.originalContent', comment)

  return (
    <Block p='l' align='start start' relative>
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
