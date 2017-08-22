/**
 * Imports
 */

import {Facebook, Google} from 'components/OAuthButtons'
import {component, element} from 'vdux'
import {Block} from 'vdux-ui'

/**
 * <Login/> page
 */

export default component({
  render ({context}) {
    return (
      <Block w='col_s' color='white' align='center center'>
        <Google w='60%' h={70} fs='s' borderRadius='7' lighter onClick={context.signInWithProvider('google')}>Sign in With Google</Google>
      </Block>
    )
  }
})
