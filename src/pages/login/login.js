/**
 * Imports
 */

import {DecoLine, Flex, Block, Button, Text} from 'vdux-ui'
import {Facebook, Google} from 'components/OAuthButtons'
import BlockInput from 'components/BlockInput'
import {loginUser} from 'reducer/currentUser'
import HomeLayout from 'layouts/Home'
import element from 'vdux/element'
import {link} from 'lib/styles'
import Form from 'vdux-form'

/**
 * Login page
 */

function render ({props}) {
  return (
    <HomeLayout action='signup'>
      <Block w='col_sm' color='white' p='m'>
        <Form onSubmit={loginUser}>
          <BlockInput autofocus placeholder='USERNAME OR EMAIL' name='username' />
          <BlockInput placeholder='PASSWORD' type='password' name='password' />
          <Button type='submit' wide bgColor='green' h={43} mt={10} lh={43} fs={15}>
            Log In
          </Button>
          <Flex align='space-around center' m='m'>
            <DecoLine w='36%' />or<DecoLine w='36%' />
          </Flex>
        </Form>
        <Flex align='space-between center' pt={10}>
          <Google w='calc(50% - 6px)'>Sign in With Google</Google>
          <Facebook w='calc(50% - 6px)'>Sign in With Facebook</Facebook>
        </Flex>
        <a class={link} href='/forgot'>
          <Block color='grey_light' mx='auto' mt='m' style={{textAlign: 'center'}}>
            Forgot your password?
          </Block>
        </a>
      </Block>
    </HomeLayout>
  )
}

/**
 * Exports
 */

export default {
  render
}
