/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import RoundedInput from 'components/RoundedInput'
import {Block, Text, Flex, Icon} from 'vdux-ui'
import Loading from 'components/Loading'
import isSameDay from '@f/is-same-day'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import reduce from '@f/reduce'
import moment from 'moment'

/**
 * <RowFeed/>
 */

function render ({props}) {
  const {
    activities = [], more, search,
    emptyState: Empty, item: Item,
    ...rest
  } = props
  const {value, loaded, loading, params} = activities
  const searching = !!(params && params.query)

  return (
    <InfiniteScroll more={() => more(value && value.nextPageToken)} {...rest}>
      {
        search && <RoundedInput
        hide={!loading && !value.items.length && !searching}
        onKeypress={{enter: e => search(e.target.value)}}
        placeholder='Search your activities...'
        inputProps={{textAlign: 'left'}}
        key={props.boardId}
        type='search'
        icon='search'
        right='6px'
        py='8px'
        absolute
        w='25%' />
      }
      {
        loaded && renderItems(
          value.items,
          Item,
          loading
            ? null
            : (searching ? EmptySearch : Empty)
        )
      }
    </InfiniteScroll>
  )
}

function renderItems (items, Item, Empty) {
  if (!items.length && Empty) return <Empty />

  let prevDate = new Date(0)

  return reduce((list, item, i) => {
    const date = new Date(item.publishedAt || item.createdAt)

    if (!isSameDay(date, prevDate)) {
      list.push((
        <Block p='m' mt={!i ? 0 : 'm'} fs='s' fw='lighter' color='blue' capitalize>
          {moment(startOfDay(date)).calendar()}
        </Block>
      ))
      prevDate = date
    }

    list.push(<Item activity={item} />)
    return list
  }, [], items)
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

/**
 * Helpers
 */

function startOfDay (date) {
 return (new Date(date)).setHours(0, 0, 0, 0)
}

/**
 * Exports
 */

export default {
  render
}
