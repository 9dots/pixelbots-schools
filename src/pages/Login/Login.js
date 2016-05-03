/**
 * Imports
 */

import {DecoLine, Flex, Block, Text} from 'vdux-containers'
import {loginUser, oauthLogin} from 'reducer/currentUser'
import {Facebook, Google} from 'components/OAuthButtons'
import BlockInput from 'components/BlockInput'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import Form from 'vdux-form'

/**
 * Login page
 */

function render ({props}) {
  return (
    <Block w='col_sm' color='white' p='m'>
      <Form onSubmit={submitLogin}>
        <BlockInput autofocus placeholder='USERNAME OR EMAIL' name='username' />
        <BlockInput placeholder='PASSWORD' type='password' name='password' />
        <Button type='submit' wide bgColor='green' h={43} mt={10} lh='43px' fs={15}>
          Log In
        </Button>
        <Flex align='space-around center' m='m'>
          <DecoLine w='36%' />or<DecoLine w='36%' />
        </Flex>
      </Form>
      <Flex align='space-between center' pt={10}>
        <Google w='calc(50% - 6px)' onClick={() => oauthLogin('google')}>Sign in With Google</Google>
        <Facebook w='calc(50% - 6px)' onClick={() => oauthLogin('facebook')}>Sign in With Facebook</Facebook>
      </Flex>
      <Text tag='a' href='/forgot' hoverProps={{textDecoration: 'underline'}} pointer>
        <Block color='grey_light' mx='auto' mt='m' textAlign='center'>
          Forgot your password?
        </Block>
      </Text>
    </Block>
  )
}

/**
 * submitLogin
 *
 * Submit login credentials and pass back any errors that might
 * occur
 */

function *submitLogin (model, cb) {
  try {
    yield loginUser(model)
  } catch (err) {
    if (err.status >= 400 && err.status < 500) {
      cb(null, err.value.errors)
    }
  }
}

/**
 * Exports
 */

export default {
  render
}
