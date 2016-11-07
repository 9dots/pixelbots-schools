/**
 * Imports
 */

import ProfileWidget from './ProfileWidget'
import ClassesWidget from './ClassesWidget'
import DraftsWidget from './DraftsWidget'
import {Card, Icon, Block} from 'vdux-ui'
import {component, element} from 'vdux'
import Link from 'components/Link'

/**
 * <FeedWidgets/>
 */

export default component({
  render ({props}) {
    const {user} = props
    const cardMargin = '8px 6px 12px 0'
    const draftCount = user.drafts.canonicalTotal.items

    return (
      <Block mr>
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
})
