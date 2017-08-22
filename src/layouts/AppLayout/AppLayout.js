/**
 * Imports
 */

import {component, element} from 'vdux'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import {Block, Icon} from 'vdux-ui'
import Nav from './Nav'

/**
 * <AppLayout/>
 */

export default component({
  render ({props, children, context}) {
    const {currentUser: user} = props

    return (
      <Block class='app' pt={50}>
      	<Block bgColor='grey' fixed top wide h='50' px color='white' z={99998} h={50} align='start center' boxShadow='0 1px 2px rgba(0,0,0,.3)' align='space-between center' >
      		<Block fs='s' bold letterSpacing='1px'>
            PixelBot School
          </Block>
          <Dropdown wide btn={<Btn user={user} />}>  
            <MenuItem wide onClick={context.signOut} align='start center'>
              <Icon name='exit_to_app' fs='s' mr='s' />
              Log Out
            </MenuItem>
          </Dropdown>
    		</Block>
        {children}
      </Block>
    )
  }
})

const Btn = component({
  render({props, context}) {
    const {user} = props
    return ( 
      <Block align='start center'>
        <Block circle='32' bgImg={user.photoURL} bgSize='cover' bgColor='#999' mr />
        <Block>{user.displayName}</Block>
        <Icon name='arrow_drop_down' fs='s' ml='s' />
      </Block>
    )
  }
})
