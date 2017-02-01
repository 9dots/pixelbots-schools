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

/**
 * <School Discussion/>
 */

export default summon(({currentUser}) => ({
  people: `/school/${currentUser.school}/teachers`
}))(component({
  render ({props, actions}) {
  	const {currentUser, people} = props
    const {value, loaded, loading} = people

    if (!loaded && loading) return <Loading show h={200} />

      const teachCount = value.items.length

    return (
    	<Block>
    		<Card p>
    			<Block align='start start'>
	    			<Avatar actor={currentUser} size='40px' />
	    			<Block flex ml>
		    				<Textarea
		            border='rgba(grey, 0.15)'
		            errorPlacement='left'
		            placeholder='Write your comment…'
		            borderColor='grey_light'
		            focusProps={{borderColor: 'rgba(blue, 0.35)'}}
		            name='comment'
		            lh='1.5em'
		            rows={3}
		            p />
	          </Block>
          </Block>
          <Block align='start start' mt>
            <Block flex ml={52} fs='xxs' color='grey_medium' italic>
              {
                teachCount - 1
                  ? `${teachCount} teachers in this school.`
                  : 'No other teachers have joined your school yet.'
              }
            </Block>
            <Button mr py='s' onClick={actions.inviteTeacher}>
              <Icon name='local_activity' fs='s' mr />
              Invite Colleagues
            </Button>
          	<Button bgColor='grey' py='s' type='submit'>Submit</Button>
        	</Block>
    		</Card>
    		<EmptyState mt p='60px 12px' wide icon='forum' color='blue' bg='grey_light' border='1px solid #D4D4D4'>
    			Be the first to add a comment to get your school's discussion board started!
    		</EmptyState>
    	</Block>
    )
  },

  controller: {
    * inviteTeacher ({context}) {
      yield context.openModal(() => <InviteTeacherModal />)
    },
  }
}))
