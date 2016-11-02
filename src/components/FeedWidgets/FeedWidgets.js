/**
 * Imports
 */

import ProfileWidget from './ProfileWidget'
import ClassesWidget from './ClassesWidget'
import DraftsWidget from './DraftsWidget'
import {component, element} from 'vdux'
import {Block} from 'vdux-ui'

/**
 * <FeedWidgets/>
 */

export default component({
  render ({props}) {
    const {user} = props
    const cardMargin = '8px 6px 12px'
    const draftCount = user.drafts.canonicalTotal.items

    return (
      <Block>
        <ProfileWidget user={user} w={230} m={cardMargin} />
        <DraftsWidget w={230} m={cardMargin} draftCount={draftCount} />
        <ClassesWidget w={230} m={cardMargin} />
      </Block>
    )
  }
})
