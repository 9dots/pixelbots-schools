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
  const cardMargin = '8px 6px 12px'

  return (
    <Block>
      <ProfileWidget w={230} m={cardMargin} />
      <DraftsWidget w={230} m={cardMargin} />
      <ClassesWidget w={230} m={cardMargin} />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}