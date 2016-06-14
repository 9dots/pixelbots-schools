/**
 * Imports
 */

import BlockInput from 'components/BlockInput'
import handleActions from '@f/handle-actions'
import {setUrl} from 'redux-effects-location'
import createAction from '@f/create-action'
import {Button} from 'vdux-containers'
import {Block} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'
/**
 * <ResetPassword/>
 */

function render ({props, local, state}) {
  const {resetPassword} = props
  const {success} = state

  return (
    <Block w='col_s' p='m' color='white' textAlign='center'>
      {
        success
          ? <SuccessBlock />
          : <ResetForm resetPassword={resetPassword} local={local} />
      }
    </Block>
  )
}

function ResetForm ({props}) {
  const {resetPassword, local} = props
  return (
    <Form onSubmit={resetPassword} onSuccess={local(setSuccess)}>
      <BlockInput type='password' autofocus placeholder='PASSWORD'/>
      <BlockInput type='password' autofocus placeholder='CONFIRM PASSWORD' name='password' />
      <Button type='submit' wide bgColor='green' h={43} mt={10} lh='43px' fs={15}>
        Reset Password
      </Button>
    </Form>
  )
}

function SuccessBlock () {
  return (
    <Block fs='s' lighter>
      <Block>
        Password Reset Successful!
      </Block>
      <Button py px={40} fs='s' mt='l' boxShadow='z2' lighter onClick={() => setUrl('/login')}>
        Login Now
      </Button>
    </Block>
  )
}

/**
 * Actions
 */

const setSuccess = createAction('<ResetPassword />: setSuccess')

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
  resetPassword: ({password}) => ({
    resetingPassword: {
      url: '/user/reset',
      method: 'POST',
      body: {
        password
      }
    }
  })
}))({
  render,
  reducer
})
