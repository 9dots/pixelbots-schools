/**
 * Imports
 */

import {Facebook, Google} from 'components/OAuthButtons'
import {component, element} from 'vdux'
import {Flex, Block} from 'vdux-ui'

/**
 * <Login/> page
 */

export default component({
  render ({context}) {
    return (
      <Block w='col_s' color='white' p='m'>
        <Flex align='space-between center' pt={10}>
          <Google w='calc(50% - 6px)' onClick={context.signInWithProvider('google')}>Sign in With Google</Google>
          <Facebook w='calc(50% - 6px)' onClick={context.signInWithProvider('facebook')}>Sign in With Facebook</Facebook>
        </Flex>
      </Block>
    )
  }
})
