/**
 * Imports
 */

import BlockInput from 'components/BlockInput'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {Button} from 'vdux-containers'
import {Block} from 'vdux-ui'
import Link from 'components/Link'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'
/**
 * <ForgotPassword/>
 */

function render ({props, local, state}) {
  const {sendReset} = props
  const {success} = state
  return (
    <Block w='col_s' p='m' color='white' textAlign='center'>
      {
        success
          ? <Block lighter fs='s'>
              Reset request confirmed. Check your email.
            </Block>
          : <ForgotForm local={local} sendReset={sendReset} />
      }
    </Block>
  )
}

function ForgotForm ({props}) {
  const {sendReset, local} = props
  return (
    <Block>
      <Form onSubmit={sendReset} onSuccess={local(setSuccess)}>
        <BlockInput autofocus placeholder='EMAIL OR USERNAME' name='username' />
        <Button type='submit' wide bgColor='green' h={43} mt={10} lh='43px' fs={15}>
          Reset Password
        </Button>
      </Form>
      <Block mt>
        <Link href='/login' color='grey_light' hoverProps={{underline: true}}>
          Nevermind
        </Link>
      </Block>
    </Block>
  )
}

/**
 * Actions
 */

const setSuccess = createAction('<ForgotPassword />: setSuccess')

/**
 * Reducer
 */
const reducer = handleActions({
  [setSuccess]: state => ({...state, success: true })
})

/**
 * Exports
 */

export default summon(props => ({
  sendReset: ({username}) => ({
    sendingReset: {
      url: '/user/forgot',
      method: 'POST',
      body: {
        username
      }
    }
  })
}))({
  render,
  reducer
})
