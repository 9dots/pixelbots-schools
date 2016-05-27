/**
 * Imports
 */


import InfiniteScroll from 'components/InfiniteScroll'
import RoundedInput from 'components/RoundedInput'
import {Block, Flex, Icon, Grid} from 'vdux-ui'
import {setUrl} from 'redux-effects-location'
import summonSearch from 'lib/summon-search'
import UserTile from 'components/UserTile'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <Connect/>
 */

function render ({props}) {
  const {people, currentUser, more, url} = props
  const {value, loaded, loading} = people
  const inputProps = {
    textAlign: 'left',
    onKeypress: {enter: submitSearch(url)}
  }

  return (
    <Block w='col_main' mx='auto' mt='l' py>
      <Flex align='space-between center' mb='l'>
        <RoundedInput m='0' icon='search' inputProps={inputProps} flex='35%' placeholder='Find teachers to follow…'  />
        <Button bgColor='green' py='m' px='xl' fs='s' fw='lighter' boxShadow='z2'>
          <Flex align='center center'>
            <Icon name='local_attraction' fs='l' mr='s' />
            Invite a Friend
          </Flex>
        </Button>
      </Flex>
      <InfiniteScroll loading={loading} more={() => value && more(value.nextPageToken)}>
        <Grid>
          {
            loaded && map(user =>
              <UserTile
                currentUser={currentUser._id === user._id}
                user={user} />, value.items)
          }
        </Grid>
      </InfiniteScroll>
    </Block>
  )
}

function submitSearch (url) {
  return e => {
    const parts = url.split('/').filter(Boolean)
    parts[1] = e.target.value
    return setUrl('/' + parts.join('/'))
  }
}

/**
 * Exports
 */

export default summonSearch('people', 'people')({
  render
})
