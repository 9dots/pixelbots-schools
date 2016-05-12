/**
 * Imports
 */

import {Flex, Block, DecoLine, Button} from 'vdux-containers'
import {Google, Facebook} from 'components/OAuthButtons'
import BlockInput from 'components/BlockInput'
import {postLogin} from 'reducer/currentUser'
import validate from 'lib/validate'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Form from 'vdux-form'

/**
 * Student signup page
 */

function render ({props}) {
  const {createStudent} = props

  return (
    <Form onSubmit={createStudent} onSuccess={user => postLogin(user, user.token)} validate={validateStudent}>
      <input type='hidden' name='userType' value='student' />
      <Flex>
        <BlockInput name='name[givenName]' placeholder='FIRST NAME' />
        <BlockInput name='name[familyName]' placeholder='LAST NAME' ml={6} />
      </Flex>
      <BlockInput name='username' placeholder='USERNAME' />
      <BlockInput name='email' placeholder='EMAIL (OPTIONAL)' />
      <BlockInput type='password' name='password' placeholder='PASSWORD' />
      <BlockInput type='password' name='confirm_password' placeholder='CONFIRM PASSWORD' />
      <Block color='white'>
        <Button type='submit' wide bgColor='green' h={43} mt={10} lh='43px' fs={15}>
          Sign Up Now
        </Button>
        <Flex align='space-around center' m='m'>
          <DecoLine w='36%' />or<DecoLine w='36%' />
        </Flex>
        <Flex align='space-between center' pt={10}>
          <Google w='calc(50% - 6px)' onClick={() => oauthCreate('google', {userType: 'student'})}>Sign in With Google</Google>
          <Facebook w='calc(50% - 6px)' onClick={() => oauthCreate('facebook', {userType: 'student'})}>Sign in With Facebook</Facebook>
        </Flex>
      </Block>
    </Form>
  )
}

/**
 * validateStudent
 */

function validateStudent (model) {
  const result = validate.student(model)

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
 * Exports
 */

export default summon(props => ({
  createStudent: body => ({
    newStudent: {
      url: '/auth/user',
      method: 'POST',
      body
    }
  })
}))({
  render
})
