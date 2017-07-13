/**
 * Imports
 */

import QuestionComments from 'components/QuestionComments'
import {component, element} from 'vdux'
import Figure from 'components/Figure'
import {Block} from 'vdux-ui'

/**
 * Constants
 */

const absolutePos = {right: 0, top: 0}

/**
 * <ActivityAssignmentItem/>
 */

export default component({
  render ({props, actions}) {
    const {
      object, overview, selectObject, showComments, currentUser,
      commentsId, commentList = [], actor, activityId, poll, comments, isStudent, ...rest
    } = props

    return (
      <Block fw='lighter' relative class='question' onClick={!overview && selectObject(object._id)} {...rest}>
        {
          !poll && comments && (!isStudent || commentList.length > 0) &&
          <QuestionComments
            absolute={absolutePos}
            showComments={showComments}
            currentUser={currentUser}
            commentsId={commentsId}
            comments={commentList}
            actor={actor}
            activityId={activityId}
            question={object}
            z='2' />
        }
        <Block>
          {
            object.image && <img src={object.image.url} />
          }
          <Block onClick={object.url && actions.openAssignmentItem}>{object.displayName}</Block>
          <Block>{object.description}</Block>
        </Block>
      </Block>
    )
  },

  controller: {
    * openAssignmentItem ({props}) {
      const {domain, object} = props
      window.open(domain + object.url)
    }
  }
})
