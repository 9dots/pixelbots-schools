/**
 * Imports
 */

import AppLayout from 'layouts/AppLayout'
import FourOhFour from 'pages/FourOhFour'
import maybeOver from '@f/maybe-over'
import {Card, Flex} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'
import Header from './Header'

/**
 * <ProfileLayout/>
 */

function render ({props, children}) {
  const {user, page} = props

  return (
    <AppLayout {...props} bgColor={user.value ? user.value.color : undefined}>
      <Flex mt={18} px='s' column mx='auto' align='center center' w='col_main'>
        {internal(user, children)}
      </Flex>
    </AppLayout>
  )
}

function internal ({value, loading, error}, children) {
  if (loading) return ''
  if (error) return <FourOhFour />

  return [
    <Header user={value} />,
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
