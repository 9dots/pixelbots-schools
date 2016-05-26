/**
 * Imports
 */

import {Block} from 'vdux-containers'
import {Icon} from 'vdux-ui'
import Link from 'components/Link'
import element from 'vdux/element'

/**
 * <NotificationsButton/>
 */

function render ({props}) {
  const {currentUser, ...rest} = props
  const total = currentUser.notifications.canonicalTotal.items - currentUser.readNotifications
  const cSize = '15px'

  return (
    <Link pointer fs='m' px='s' href='/notifications' align='center center' {...rest} relative>
      <Icon name='notifications' fs='m' />
      <Block
        absolute
        top='-6'
        right='-3'
        textAlign='center'
        hide={!total}
        circle={cSize}
        lh={cSize}
        fs='10'
        bg='red'>{total > 99 ? '99+' : total }</Block>
    </Link>
  )
}

/**
 * Exports
 */

export default {
  render
}
