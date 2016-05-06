/**
 * Imports
 */

import BoardTile from 'components/BoardTile'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <ProfileBoards/>
 */

function render ({props}) {
  const {user} = props
  console.log('groups', user.groups)

  return (
    <Block>
      {
        user.groups
          .filter(group => group.groupType === 'board')
          .map(group => <BoardTile board={group} />)
      }
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
