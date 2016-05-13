/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import ActivityRow from 'components/ActivityRow'
import isSameDay from '@f/is-same-day'
import {Block, Text, Flex, Icon} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import Loading from 'components/Loading'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import reduce from '@f/reduce'
import moment from 'moment'

/**
 * <RowFeed/>
 */

function render ({props}) {
  const {activities = [], more, search} = props
  const {value, loaded, loading, params} = activities
  const searching = !!(params && params.query)

  return (
    <InfiniteScroll more={() => more(value && value.nextPageToken)}>
      <RoundedInput
        key={props.boardId}
        w='25%'
        hide={!loading && !value.items.length && !searching}
        onKeypress={{enter: e => search(e.target.value)}}
        placeholder='Search your activities...'
        type='search'
        absolute
        inputProps={{textAlign: 'left'}}
        icon='search'
        right='6px' />
        {
          loaded && renderBody(value.items, loading, params)
        }
      <Loading show={activities.loading} h='200'/>
    </InfiniteScroll>
  )
}

function renderItems (items) {
  let prevDate = new Date(0)

  return reduce((list, item, i) => {
    const date = new Date(item.publishedAt || item.createdAt)

    if (!isSameDay(date, prevDate)) {
      list.push((
        <Block p='m' mt={!i ? 0 : 'm'} fs='s' fw='lighter' color='blue'>
          {moment(date).format('MMMM DD, YYYY')}
        </Block>
      ))
      prevDate = date
    }

    list.push(<ActivityRow activity={item} />)
    return list
  }, [], items)
}

function renderBody(items, loading, searching) {
  if(!loading && !items.length)
    return searching ? EmptySearch() : EmptyBoard()
  else
    return renderItems(items)
}

function EmptySearch() {
  return (
    <Flex column align='center center' p h='150px'>
      <Text fw='200' fs='s'>
        Sorry, we couldn't find any activities
      </Text>
    </Flex>
  )
}

function EmptyBoard() {
  return (
    <Flex column align='center center' p='12px 12px 24px' fw='200' bg='#E4E5E7' border='1px solid #D8DADD'>
      <Icon name='dashboard' color='green' fs='120px' p m/>
      <Text fs='m' mb='l'>This is your Board</Text>
      <Button bgColor='green' color='white' my fs='s' fw='lighter' lh='3em' px='35px' boxShadow='card'>Add My First Activity</Button>
      <Text fs='s' lh='30px' textAlign='center' m w='66%' pt pb='l'>
        <Text fw='bold'>Boards </Text>
        are collections of Activities. Save Activities to Boards to keep them organized and easy to find.
      </Text>
    </Flex>
  )
}

/**
 * Exports
 */

export default {
  render
}
