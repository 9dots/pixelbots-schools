/**
 * Imports
 */

import BoardTile from 'components/BoardTile'
import {Grid, Block} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <SearchMyActivities/>
 */

function render ({props}) {
  const {boards, currentUser} = props
  const {value, loading} = boards

  return (
    <Block>
      {
        loading
          ? 'Loading...'
          : (
              <Grid>
                {
                  value.items.map(board => <BoardTile board={board} currentUser={currentUser} />)
                }
              </Grid>
            )
      }
    </Block>
  )
}

/**
 * Exports
 */

export default summon(props => ({
  boards: `/search/boards?query=${props.query}&maxResults=12`
}), {
  render
})
