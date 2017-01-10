/**
 * Imports
 */

import {component, element} from 'vdux'
import {Block, Card} from 'vdux-ui'
import {Textarea, Button} from 'vdux-containers'
import Avatar from 'components/Avatar'
import EmptyState from 'components/EmptyState'

/**
 * <School Discussion/>
 */

export default component({
  render ({props}) {
  	const {currentUser} = props
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
          <Block align='end'>
          	<Button mt bgColor='grey' type='submit'>Submit</Button>
        	</Block>
    		</Card>
    		<EmptyState mt p='60px 12px' wide icon='forum' color='blue' bg='grey_light' border='1px solid #D4D4D4'>
    			Be the first to add a comment to get your school's discussion board started!
    		</EmptyState>
    	</Block>
    )
  }
})
