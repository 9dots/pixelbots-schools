/**
 * Imports
 */

import InviteTeacherModal from 'modals/InviteTeacherModal'
import {Textarea, Button} from 'vdux-containers'
import EmptyState from 'components/EmptyState'
import {Block, Card, Icon} from 'vdux-ui'
import Loading from 'components/Loading'
import {component, element} from 'vdux'
import Avatar from 'components/Avatar'
import summon from 'vdux-summon'
import live from 'lib/live'
import Form from 'vdux-form'

/**
 * Constants
 */

const focusProps = {borderColor: 'rgba(blue, 0.35)'}

/**
 * <SchoolDiscussion/>
 */

export default summon(({school}) => ({
  comments: school && `/message/${school.channels[0]._id}/list`,
  submit: ({text = ''}) => ({
    submitting: {
      url: '/message',
      method: 'POST',
      body: {
        channel: school.channels[0]._id,
        text
      }
    }
  })
}))(live(({school}) => ({
  comments: {
    url: '/message',
    params: {
      channel: school.channels[0]._id
    }
  }
}))(
  component({
  render ({props, actions}) {
  	const {currentUser, comments, submitting = {}} = props
    const commentList = (comments.value && comments.value.items) || []

    return (
    	<Block>
          <Form onSubmit={props.submit}>
            <Card p>
              <Block align='start start'>
                <Avatar actor={currentUser} size='40px' />
      	    			<Block flex ml>
      		    				<Textarea
                        key={submitting.loading}
        		            border='rgba(grey, 0.15)'
        		            errorPlacement='left'
        		            placeholder='Write your comment…'
        		            borderColor='grey_light'
        		            focusProps={focusProps}
        		            name='text'
        		            lh='1.5em'
        		            rows={3}
        		            p />
      	         </Block>
              </Block>
            <Block align='end center' mt>
              <Button mr py='s' onClick={actions.inviteTeacher}>
                <Icon name='local_activity' fs='s' mr />
                Invite Colleagues
              </Button>
              <Button busy={submitting.loading} bgColor='grey' py='s' type='submit'>Submit</Button>
            </Block>
          </Card>
        </Form>
        {renderComments(comments.value && comments.value.items, comments.loading)}
    	</Block>
    )
  },

  controller: {
    * inviteTeacher ({context}) {
      yield context.openModal(() => <InviteTeacherModal />)
    }
  }
})))

function renderComments (comments, loading) {
  if (loading) return <Loading />

  return comments.length
    ? comments.map(comment => <Block>{comment.text}</Block>)
    : <EmptyState mt p='60px 12px' wide icon='forum' color='blue' bg='grey_light' border='1px solid #D4D4D4'>
        Be the first to add a comment to get your school's discussion board started!
      </EmptyState>
}
