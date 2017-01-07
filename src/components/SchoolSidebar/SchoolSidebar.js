/**
 * Imports
 */

import {Button, Icon} from 'vdux-containers'
import {Block, Card, Divider, MenuItem} from 'vdux-ui'
import {component, element} from 'vdux'
import Link from 'components/Link'

/**
 * <School Sidebar/>
 */

export default component({
  render ({props}) {
    return (
    	<Block mr>
	    	<Card w={230} mb>
	    		<Block bg='blue' h='60' />
	    		<Block align='start' p='s'>
							<Block bg='yellow' circle='75px' m='-37.5px 6px 0 0' boxShadow='z1' border='2px solid white' />
	        		<Block overflow='hidden' flex>
		            <Block ellipsis fw='bolder'>
		              9 Dots Community Learning Center
		            </Block>
		            <Block ellsipis fs='xxs'>
		              Los Angeles, CA
		            </Block>
		          </Block>
	          </Block>
	    		<Divider m='s' color='#EEE'/>
	    		<Block align='center center' p pb='18px'>
	    			<Button py='s' px='32px'>
	    				<Icon fs='s' name='local_activity' mr />
	    				Invite Colleagues
	    			</Button>
					</Block>
	    	</Card>
	    	<Card>
	    		<Block boxShadow='0 2px 1px rgba(75,82,87,0.1)' z='1' relative p/>
		        <Item icon='forum' href='/school/discussion'>
		        	Discussion
		        </Item>
		        <Item icon='school' href='/school/teachers'>
		        	Teachers
		        </Item>
		        <Item icon='people' href='/school/students'>
		        	Students
		        </Item>
		        <Item icon='view_headline' href='/school/stream'>
		        	Stream
		        </Item>
	    		<Block boxShadow='0 -2px 1px rgba(75,82,87,0.1)' z='1' relative p/>
	    	</Card>
	    </Block>
    )
  }
})

const Item = component({
	render({props, children}) {
		const {icon, href} = props
		return (
			<Link currentProps={{borderLeftColor: 'blue', highlight: 0.05, color: 'text'}}
		  	borderLeft='3px solid transparent'
		  	href={href}
			  align='start center'
			  ui={MenuItem}
			  color='grey_medium'
			  hoverProps={{color: 'text'}}
			  p>
				<Icon name={icon} fs='s' mr />
				{ children }
			</Link>
		) 
	}
})
