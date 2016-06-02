/**
 * Imports
 */

import PageTitle from 'components/PageTitle'
import AppLayout from 'layouts/AppLayout'
import FourOhFour from 'pages/FourOhFour'
import {pickerColors} from 'lib/colors'
import maybeOver from '@f/maybe-over'
import {Card, Flex} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Header from './Header'

/**
 * <ProfileLayout/>
 */

function render ({props, children}) {
  const {username, currentUser} = props
  const isCurrentUser = username === currentUser.username
  const user = isCurrentUser
    ? {value: currentUser, loaded: true}
    : props.user

  return (
    <AppLayout {...props} bgColor={user.value && (user.value.color || pickerColors[0])}>
      <PageTitle title={`${user.value && user.value.displayName} | Profile`} />
      <Flex mt={18} px='s' column mx='auto' align='center center' w='col_main'>
        {internal(isCurrentUser, user, children)}
      </Flex>
    </AppLayout>
  )
}

function internal (isCurrentUser, {value, loading, error}, children) {
  if (loading) return ''
  if (error) return <FourOhFour />

  return [
    <Header user={value} isCurrentUser={isCurrentUser}  />,
    maybeOver(value, children)
  ]
}

/**
 * Exports
 */

export default summon(props => ({
  user: `/user/${props.username}`
}))({
  render
})
