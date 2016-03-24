/**
 * Imports
 */

import {wide, col_sm, pad, mrg, mrg_top, white, link, grey_light, center} from 'lib/styles'
import {Facebook, Google} from 'components/OAuthButtons'
import BlockInput from 'components/BlockInput'
import {loginUser} from 'reducer/currentUser'
import * as mixins from 'lib/styles/mixins'
import {DecoLine, Flex} from 'vdux-ui'
import {row, align} from 'lib/layout'
import HomeLayout from 'layouts/Home'
import * as colors from 'lib/colors'
import element from 'vdux/element'
import Form from 'vdux-form'
import css from 'jss-simple'

/**
 * Login page
 */

function render ({props}) {
  return (
    <HomeLayout action='signup'>
      <div class={[col_sm, pad, white]}>
        <Form onSubmit={loginUser}>
          <BlockInput autofocus class={[wide, mrg]} placeholder='USERNAME OR EMAIL' name='username' />
          <BlockInput class={[wide, mrg]} placeholder='PASSWORD' type='password' name='password' />
          <button type='submit' class={[btn, wide]}>Log In</button>
          <Flex align='space-around center' m={2}>
            <DecoLine />or<DecoLine />
          </Flex>
        </Form>
        <Flex align='space-around center'>
          <Google>Sign in With Google</Google>
          <Facebook>Sign in With Facebook</Facebook>
        </Flex>
        <a href='/forgot'>
          <div class={[grey_light, center, link, mrg_top]}>
            Forgot your password?
          </div>
        </a>
      </div>
    </HomeLayout>
  )
}

/**
 * Styles
 */

const {btn} = css({
  btn: {
    ...mixins.btn(colors.green, '#fff'),
    marginTop: 10,
    height: 43,
    lineHeight: '43px',
    width: '100%',
    fontSize: '15px'
  }
})

/**
 * Exports
 */

export default {
  render
}
