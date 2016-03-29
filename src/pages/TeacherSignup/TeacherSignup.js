/**
 * Imports
 */

import {Google, Facebook} from 'components/OAuthButtons'
import {DecoLine, Block, Button, Flex} from 'vdux-ui'
import BlockInput from 'components/BlockInput'
import HomeLayout from 'layouts/Home'
import element from 'vdux/element'

/**
 * Teacher signup page
 */

function render () {
  return (
    <HomeLayout action='login'>
      <Flex>
        <Flex column w='col_med' color='white' align='center'>
          <Block mt='-30px' fs='xl' mb='m'>
            Welcome to Weo
          </Block>
          <Block ln='30px' fs='m'>
            Join our growing community<br />
            of edudcators today.
          </Block>
          <Block fs='s' mt='m'>
            Free for teachers. Forever.
          </Block>
        </Flex>
        <Block w='col_sm' color='white'>
          <BlockInput placeholder='FULL NAME' />
          <BlockInput placeholder='EMAIL' />
          <BlockInput placeholder='PASSWORD' type='password' />
          <Button wide bgColor='green' h={43} mt={10} lh={43} fs={15}>
            Sign Up Now
          </Button>
          <Flex align='space-around center' m='m'>
            <DecoLine w='36%' />or<DecoLine w='36%' />
          </Flex>
          <Flex align='space-between center' pt={10}>
            <Google w='calc(50% - 6px)'>Sign in With Google</Google>
            <Facebook w='calc(50% - 6px)'>Sign in With Facebook</Facebook>
          </Flex>
        </Block>
      </Flex>
    </HomeLayout>
  )
}

/**
 * Exports
 */

export default render
