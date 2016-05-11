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
  const cardMargin = '8px 6px 12px'
  const draftCount = user.drafts.canonicalTotal.items

  return (
    <Block>
      <ProfileWidget user={user} w={230} m={cardMargin} />
      <DraftsWidget w={230} m={cardMargin} draftCount={draftCount} />
      <ClassesWidget w={230} m={cardMargin} classes={user.groups.filter(group => group.groupType === 'class')}/>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}