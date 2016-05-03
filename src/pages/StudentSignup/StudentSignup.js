/**
 * Imports
 */

import {Flex, Block, DecoLine, Button} from 'vdux-containers'
import {Google, Facebook} from 'components/OAuthButtons'
import {createStudent} from 'reducer/currentUser'
import BlockInput from 'components/BlockInput'
import validate from 'lib/validate'
import element from 'vdux/element'
import Form from 'vdux-form'

/**
 * Student signup page
 */

function render () {
  return (
    <Form onSubmit={submitStudent} validate={validateStudent}>
      <input type='hidden' name='userType' value='student' />
      <Flex>
        <BlockInput name='name[givenName]' placeholder='FIRST NAME' />
        <BlockInput name='name[familyName]' placeholder='LAST NAME' ml={6} />
      </Flex>
      <BlockInput name='username' placeholder='USERNAME' />
      <BlockInput name='email' placeholder='EMAIL (OPTIONAL)' />
      <BlockInput name='password' placeholder='PASSWORD' />
      <BlockInput name='confirm_password' placeholder='CONFIRM PASSWORD' />
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
 * submitStudent
 *
 * Submit the student model and pass the error back to the
 * form if we get one
 */

function *submitStudent (model, cb) {
  try {
    yield createStudent(model)
  } catch (err) {
    if (err.status === 400) {
      cb(null, err.value.errors)
    }
  }
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

  return result
}

/**
 * Exports
 */

export default render
