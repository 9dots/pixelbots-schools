/**
 * Imports
 */

import {Button} from 'vdux-containers'
import {component, element} from 'vdux'
import {Block, Icon} from 'vdux-ui'

/**
 * <Student Options/>
 */

export default component({
	render({props}) {

		const btnProps = {
		  h: '30',
		  fs: 'xxs',
		  px: 'm',
		  mr: 's',
		  bgColor: 'white',
		  color: 'text',
		  hoverProps: {highlight: 0.02}
		}

		return(
			<Block mb>
				<Button {...btnProps}>
					<Icon fs='s' mr='s' name='add'/>
					Add To Class
				</Button>
				<Button {...btnProps}>
					<Icon fs='s' mr='s' name='lock'/>
					Reset Password
				</Button>
				<Button {...btnProps}>
					<Icon fs='s' mr='s' name='print'/>
					Print Login Info
				</Button>
			</Block>
		)
	}
})