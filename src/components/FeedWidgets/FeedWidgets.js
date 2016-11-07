/**
 * Imports
 */

import {Block, Card, Icon} from 'vdux-ui'
import Link from 'components/Link'
import ProfileWidget from './ProfileWidget'
import DraftsWidget from './DraftsWidget'
import ClassesWidget from './ClassesWidget'
import element from 'vdux/element'

/**
 * Feed Widgets
 */

function render ({props}) {
  const {user, ...rest} = props
  const cardMargin = '8px 6px 12px 0'
  const draftCount = user.drafts.canonicalTotal.items

  return (
    <Block mr {...rest}>
      <ProfileWidget user={user} w={230} m={cardMargin} mt={0} />
      <DraftsWidget w={230} m={cardMargin} draftCount={draftCount} user={user} />
      <ClassesWidget user={user} w={230} m={cardMargin}/>
      <Link ui={Card} w={230} m={cardMargin} align='start center' pointer p href='/feed' hide={user.userType === 'student'}>
        <Icon fs='m' mr name='dashboard'/>
        <Block flex>My Feed</Block>
        <Icon fs='s' name='keyboard_arrow_right'/>
      </Link>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
