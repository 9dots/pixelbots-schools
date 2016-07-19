/**
 * Imports
 */

import {Button, Textarea, Block, DropdownMenu, MenuItem, wrap, CSSContainer} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import Avatar from 'components/Avatar'
import Document from 'vdux/Document'
import {Icon, Card, Text} from 'vdux-ui'
import element from 'vdux/element'
import map from '@f/map'
import moment from 'moment'

/**
 * <QuestionComments/>
 */

function render ({props, local, state}) {
  const { comments, currentUser, activities, activity } = props
  const showNew = !comments.length || state.showNew

  return (
    <Block
      onClick={e => e.stopPropagation()}
      absolute={{left: 36, top: 0}}
      w={250}>
      <Block onClick={local(toggleDD, null)}>
        {
          map(comment => <CommentCard toggleDD={local(toggleDD, comment._id)} actor={comment.actor} comment={comment} showDD={state.showDD === comment._id} />, comments)
        }
        <CommentCard
          hide={!showNew}
          comments={comments}
          actor={currentUser}
          activity={activity}
          dismiss={local(toggle)}/>
        <Block hoverProps={{opacity: 1}} opacity='.85' pointer onClick={local(toggle)} align='center center' hide={showNew} hide={currentUser.userType === 'student'}>
          <Icon lh='17px' name='add_circle_outline' fs='s' mr='s'/>
          <Block lh='17px'>Leave a note for {activity.actor.displayName}</Block>
        </Block>
      </Block>
    </Block>
  )
}


const toggleEdit = createAction('<CommentCard/>: toggleEdit')

const CommentCard = wrap(CSSContainer, {
  hoverProps: {hover: true}
})({
  reducer: handleActions({
    [toggleEdit]: state => ({...state, isEdit: !state.isEdit})
  }),
  render ({props, state, local}) {
    const {
      actor, dismiss = local(toggleEdit),
      comment, showDD, toggleDD, comments, ...rest
    } = props
    const {displayName} = actor
    const isEdit = !comment || state.isEdit
    const message = comment && comment._object[0].originalContent
    const time = comment && moment(comment.createdAt).fromNow()

    return (
      <Card p mb {...rest}>
        <EditDropdown
          toggleEdit={local(toggleEdit)}
          toggleDD={toggleDD}
          showDD={showDD}
          transition='opacity .35s'
          opacity={props.hover ? 1 : 0}
          hide={!comment || isEdit} />
        <Block align='start' mb>
          <Avatar actor={actor} mr />
          <Block column align='center'>
            {displayName}
            <Block fs='xxs' color='grey_medium'>
              <Text hide={time}>Leave a note</Text>
              <Text hide={!time}>{time}</Text>
            </Block>
          </Block>
        </Block>
        <Block hide={!isEdit}>
          <Textarea
            focusProps={{border: '1px solid rgba(37, 168, 224, 0.35)'}}
            activeProps={{border: '1px solid rgba(37, 168, 224, 0.35)'}}
            errorPlacement='left'
            placeholder='Write your comment…'
            borderColor='grey_light'
            name='comment'
            defaultValue={message}
            autofocus={isEdit}
            rows={3}
            p='s' />
          <Block mt>
            <Button mr='s' px>
              Save
            </Button>
            <Button bgColor='grey_medium' hide={!comment && !comments.length} px onClick={dismiss}>
              Cancel
            </Button>
          </Block>
        </Block>
        <Block hide={isEdit}>
          {message}
        </Block>
      </Card>
    )
  }
})

function EditDropdown ({props}) {
  const {toggleEdit, toggleDD, showDD, ...rest} = props
  return (
    <Block relative>
      <Block onClick={e => e.stopPropagation()}>
        <Icon
          absolute={{right: -6, top: -6}}
          onClick={toggleDD}
          name='settings'
          pointer
          fs='xxs'
          {...rest} />
      </Block>
      <DropdownMenu
        hide={!showDD}
        w={120}
        m={-6}
        z={2}>
        <MenuItem align='start center' onClick={toggleEdit}>
          <Icon fs='xs' name='edit' mr/>
          Edit
        </MenuItem>
        <MenuItem align='start center'>
          <Icon fs='xs' name='delete' mr />
          Delete
        </MenuItem>
      </DropdownMenu>
    </Block>
  )
}

const toggleDD = createAction('<Comments/>: toggleDD')
const toggle = createAction('<Comments/>: toggle')

const reducer = handleActions({
  [toggle]: state => ({...state, showNew: !state.showNew}),
  [toggleDD]: (state, id) => ({...state, showDD: id})
})


/**
 * Exports
 */

export default{
  render,
  reducer
}
