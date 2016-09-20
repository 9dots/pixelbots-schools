/**
 * Imports
 */

import Loading from 'components/Loading'
import {postLogin} from 'reducer/auth'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
import qs from 'querystring'

/**
 * onCreate
 */

function * onCreate ({props}) {
  const {url, login} = props
  const [, str] = url.split('?')
  const params = qs.parse(str)

  // XXX Slight hack to avoid doing this on the server
  if (typeof window !== 'undefined') {
    params.redirectUri = window.location.origin + '/clever'

    const {token} = yield login('clever', params)
    yield postLogin(token)
  }
}

/**
 * <Clever/>
 */

function render ({props}) {
  return (
    <Block wide tall align='center center'>
      <Loading />
    </Block>
  )
}

/**
 * Exports
 */

export default summon(() => ({
  login: (provider, body) => ({
    loggingIn: {
      url: '/auth/login/' + provider,
      method: 'PUT',
      body
    }
  })
}))({
  onCreate,
  render
})
