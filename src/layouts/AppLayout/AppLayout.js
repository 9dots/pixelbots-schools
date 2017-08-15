/**
 * Imports
 */

import {component, element} from 'vdux'
import {Block} from 'vdux-ui'
import Nav from './Nav'

/**
 * <AppLayout/>
 */

export default component({
  render ({props, children}) {
    return (
      <Block class='app' pt={50}>
      	<Block bgColor='grey' fixed top wide p color='white' z={99998} h={50} align='start center' fs='s' bold boxShadow='0 1px 2px rgba(0,0,0,.3)'>
      		PixelBot Schools
    		</Block>
        {children}
      </Block>
    )
  }
})
