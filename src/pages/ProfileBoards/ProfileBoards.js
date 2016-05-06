/**
 * Imports
 */

import BoardTile from 'components/BoardTile'
import element from 'vdux/element'
import {Grid} from 'vdux-ui'

/**
 * <ProfileBoards/>
 */

function render ({props}) {
  const {user, currentUser} = props

  return (
    <Grid>
      {
        user.groups
          .filter(group => group.groupType === 'board')
          .map(group => <BoardTile board={group} currentUser={currentUser} />)
      }
    </Grid>
  )
}

/**
 * Exports
 */

export default {
  render
}
