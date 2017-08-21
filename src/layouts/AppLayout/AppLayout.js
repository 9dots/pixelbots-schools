/**
 * Imports
 */

import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import {Block} from 'vdux-ui'
import Nav from './Nav'

/**
 * <AppLayout/>
 */

export default component({
  render ({props, children, context}) {
    return (
      <Block class='app' pt={50}>
      	<Block bgColor='grey' fixed top wide h='50' px color='white' z={99998} h={50} align='start center' fs='s' bold boxShadow='0 1px 2px rgba(0,0,0,.3)' align='space-between center' >
      		<Block>PixelBot School</Block>
          <Button bgColor='grey' borderColor='white' borderWidth={2} bold letterSpacing='1px' px='m' onClick={context.signOut}>LOG OUT</Button>
    		</Block>
        {children}
      </Block>
    )
  }
})
