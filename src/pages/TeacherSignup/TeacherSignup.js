/**
 * Imports
 */

import {createTeacher, oauthCreate} from 'reducer/currentUser'
import {Google, Facebook} from 'components/OAuthButtons'
import {DecoLine, Block, Flex} from 'vdux-ui'
import {Button} from 'vdux-containers'
import BlockInput from 'components/BlockInput'
import validate from 'lib/validate'
import element from 'vdux/element'
import {parse} from 'parse-name'
import Form from 'vdux-form'

/**
 * Teacher signup page
 */

function render () {
  return (
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
      <Form onSubmit={submitTeacher} validate={validate.teacher} cast={cast}>
        <Block w='col_sm' color='white'>
          <input type='hidden' name='userType' value='teacher' />
          <BlockInput name='name' placeholder='FULL NAME' />
          <BlockInput name='email' placeholder='EMAIL' />
          <BlockInput name='password' placeholder='PASSWORD' type='password' />
          <Button type='submit' wide bgColor='green' h={43} mt={10} lh='43px' fs={15}>
            Sign Up Now
          </Button>
          <Flex align='space-around center' m='m'>
            <DecoLine w='36%' />or<DecoLine w='36%' />
          </Flex>
          <Flex align='space-between center' pt={10}>
            <Google w='calc(50% - 6px)' onClick={() => oauthCreate('google', {userType: 'teacher'})}>Sign in With Google</Google>
            <Facebook w='calc(50% - 6px)' onClick={() => oauthCreate('facebook', {userType: 'teacher'})}>Sign in With Facebook</Facebook>
          </Flex>
        </Block>
      </Form>
    </Flex>
  )
}

/**
 * submitTeacher
 *
 * Submit the teacher model and pass the error
 * back to the form if we get one
 */

function *submitTeacher (model, cb) {
  try {
    yield createTeacher(model)
  } catch (err) {
    if (err.status === 400) {
      cb(null, err.value.errors)
    }
  }
}

/**
 * cast
 *
 * Cast a teacher signup form object into the form that
 * the API and validator expects
 */

function cast (user) {
  const {first, last, title} = parse(user.name)

  return {
    ...user,
    name: {
      givenName: first,
      familyName: last,
      honorificPrefix: title
    }
  }
}

/**
 * Exports
 */

export default render
