/**
 * Imports
 */

import {Google, Facebook, Microsoft} from 'components/OAuthButtons'
import {postLogin, oauthCreate} from 'reducer/auth'
import BlockInput from 'components/BlockInput'
import {DecoLine, Block, Flex} from 'vdux-ui'
import {track} from 'middleware/analytics'
import {Button} from 'vdux-containers'
import validate from 'lib/validate'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {parse} from 'parse-name'
import Form from 'vdux-form'

/**
 * Teacher signup page
 */

function render ({props}) {
  const {createTeacher, creatingTeacher = {}} = props
  const {loading} = creatingTeacher

  return (
    <Flex>
      <Flex column w='col_m' color='white' align='center'>
        <Block mt='-30px' fs='xl' mb='m'>
          Welcome to Weo
        </Block>
        <Block ln='30px' fs='m'>
          Join our growing community<br/>
          of educators today.
        </Block>
        <Block fs='s' mt='m'>
          Free for teachers. Forever.
        </Block>
      </Flex>
      <Form onSubmit={createTeacher} onSuccess={user => [postLogin(user.token), track({name: 'Created Teacher', traits: user})]} validate={validate.teacher} cast={cast}>
        <Block w='col_s' color='white'>
          <input type='hidden' name='userType' value='teacher' />
          <BlockInput autofocus name='name' placeholder='FULL NAME' />
          <BlockInput name='email' placeholder='EMAIL' />
          <BlockInput name='password' placeholder='PASSWORD' type='password' />
          <Button type='submit' busy={loading} wide bgColor='green' h={43} mt={10} lh='43px' fs={15}>
            Sign Up Now
          </Button>
          <Flex align='space-around center' m='m'>
            <DecoLine w='36%' />or<DecoLine w='36%' />
          </Flex>
          <Flex align='space-between center' pt={10}>
            <Google w='calc(50% - 6px)' onClick={() => oauthCreate('google', {userType: 'teacher'})}>Sign in With Google</Google>
            <Facebook w='calc(50% - 6px)' onClick={() => oauthCreate('facebook', {userType: 'teacher'})}>Sign in With Facebook</Facebook>
          </Flex>
          <Microsoft w='100%' mt onClick={() => oauthCreate('office365', {userType: 'teacher'})}>Sign in With Office365</Microsoft>
        </Block>
      </Form>
    </Flex>
  )
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

export default summon(props => ({
  createTeacher: body => ({
    creatingTeacher: {
      url: '/auth/user',
      method: 'POST',
      body
    }
  })
}))({
  render
})
