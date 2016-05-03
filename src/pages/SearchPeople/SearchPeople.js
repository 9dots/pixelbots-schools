/**
 * Imports
 */

import UserTile from 'components/UserTile'
import {Grid, Block} from 'vdux-ui'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <SearchMyActivities/>
 */

function render ({props}) {
  const {people} = props
  const {value, loading} = people

  return (
    <Block>
      {
        loading
          ? 'Loading...'
          : (
              <Grid>
                {
                  value.items.map(user => <UserTile user={user} />)
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
  people: `/search/people?query=${props.query}&maxResults=12`
}), {
  render
})
