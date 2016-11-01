/**
 * Imports
 */

import {Block} from 'vdux-ui'
import ProfileWidget from './ProfileWidget'
import DraftsWidget from './DraftsWidget'
import ClassesWidget from './ClassesWidget'
import element from 'vdux/element'

/**
 * Feed Widgets
 */

function render ({props}) {
  const {user} = props
  const cardMargin = '8px 6px 12px 0'
  const draftCount = user.drafts.canonicalTotal.items

  return (
    <Block mr>
      <ProfileWidget user={user} w={230} m={cardMargin} mt={0} />
      <DraftsWidget w={230} m={cardMargin} draftCount={draftCount} user={user} />
      <ClassesWidget user={user} w={230} m={cardMargin}/>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
