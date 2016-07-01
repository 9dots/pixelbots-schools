/**
 * Imports
 */

import BlockInput from 'components/BlockInput'
import handleActions from '@f/handle-actions'
import {setUrl} from 'redux-effects-location'
import createAction from '@f/create-action'
import {Button} from 'vdux-containers'
import Schema from '@weo-edu/schema'
import {password} from 'lib/schemas/user'
import validate from '@weo-edu/validate'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
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
  const {resetPassword, resettingPassword = {}, local} = props
  const {loading} = resettingPassword

  return (
    <Form onSubmit={resetPassword} onSuccess={local(setSuccess)} validate={validatePassword}>
      <BlockInput type='password' autofocus placeholder='PASSWORD' name='password'/>
      <BlockInput type='password' placeholder='CONFIRM PASSWORD' name='confirm_password' />
      <Button type='submit' busy={loading} wide bgColor='green' h={43} mt={10} lh='43px' fs={15}>
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

function validatePassword (model) {
  const result = validate(Schema()
    .prop('password', password)
    .required('password'))(model)

  if (model.password !== model.confirm_password) {
    result.valid = false
    result.errors = result.errors || []
    result.errors.push({
      field: 'confirm_password',
      message: 'Must match password'
    })
  }

  delete model.confirm_password
  return result
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

export default summon(({token}) => ({
  resetPassword: ({password}) => ({
    resettingPassword: {
      url: `/user/reset?token=${token}`,
      method: 'PUT',
      body: {
        password
      }
    }
  })
}))({
  render,
  reducer
})
