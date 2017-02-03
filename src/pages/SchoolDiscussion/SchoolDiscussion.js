/**
 * Imports
 */

import InviteTeacherModal from 'modals/InviteTeacherModal'
import SchoolComment from 'components/SchoolComment'
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

export default summon(({school, currentUser}) => ({
  comments: school && `/message/${school.channels[0]._id}/list`,
  people: `/school/${currentUser.school}/teachers`,
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
  	const {currentUser, comments, submitting = {}, people = {}} = props
    const commentList = (comments.value && comments.value.items) || []

    const teachCount = people.loading
      ? ''
      : people.value.items.length

    return (
    	<Block>
        <Form onSubmit={props.submit}>
          <Card p='l' bg='#FCFCFC'>
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
  		            rows={4}
  		            p />
      	       </Block>
            </Block>
            <Block align='start start' mt>
              <Block flex ml={52} fs='xxs' color='grey_medium' italic>
                {
                  teachCount - 1
                    ? `${teachCount} teachers in this school.`
                    : <Block lh='17px'>
                        No other teachers are in your school yet.
                        <br/>
                        Invite your colleagues to join!
                      </Block>
                }
              </Block>
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
  const sorted = comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return comments.length
    ? sorted.map(comment => <SchoolComment comment={comment} />)
    : <EmptyState mt p='60px 12px' wide icon='forum' color='blue' bg='grey_light' border='1px solid #D4D4D4'>
        Be the first to add a comment to get your school's discussion board started!
      </EmptyState>
}
