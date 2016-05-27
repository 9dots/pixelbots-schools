/**
 * Imports
 */


import InviteTeacherModal from 'modals/InviteTeacherModal'
import InfiniteScroll from 'components/InfiniteScroll'
import RoundedInput from 'components/RoundedInput'
import {Block, Flex, Icon, Grid} from 'vdux-ui'
import {setUrl} from 'redux-effects-location'
import UserTile from 'components/UserTile'
import {openModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'
import map from '@f/map'

/**
 * <Connect/>
 */

function render ({props}) {
  const {people, currentUser, more, url, query} = props
  const {value, loaded, loading} = people
  const inputProps = {
    textAlign: 'left',
    onKeypress: {enter: submitSearch(url)}
  }

  return (
    <Block w='col_main' mx='auto' mt='l' py>
      <Flex align='space-between center' mb='l'>
        <RoundedInput m='0' icon='search' inputProps={inputProps} flex='35%' placeholder='Find teachers to follow…'  />
        <Button bgColor='green' py='m' px='xl' fs='s' fw='lighter' boxShadow='z2' onClick={() => openModal(() => <InviteTeacherModal />)}>
          <Flex align='center center'>
            <Icon name='local_attraction' fs='l' mr='s' />
            Invite a Friend
          </Flex>
        </Button>
      </Flex>
      <Block hide={query} fw='200' fs='m' color='blue' p>
        Recommended Teachers
      </Block>
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

/**
 * Helpers
 */

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

export default summon(({query}) => ({
  people: {
    url: query
      ? `/search/people?query=${query}&maxResults=12`
      : '/user/similar?maxResults=12'
  },
  more: pageToken => ({
    people: {
      params: pageToken && {pageToken}
    }
  })
}))({
  render
})
