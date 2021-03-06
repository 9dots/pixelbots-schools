/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import {decodeValue, component, element} from 'vdux'
import RoundedInput from 'components/RoundedInput'
import {Block, Text, Flex} from 'vdux-ui'
import isSameDay from '@f/is-same-day'
import reduce from '@f/reduce'
import moment from 'moment'

/**
 * Constants
 */

const absolute = {top: 6, right: 6}

/**
 * <RowFeed/>
 */

export default component({
  render ({props}) {
    const {
      activities = [], more, emptyState, item: Item,
      itemProps = {}, currentUser, search, ...rest
    } = props
    const {value, hasLoaded, loaded, loading, params} = activities
    const searching = !!(params && params.query)
    const items = value && value.items || []

    return (
      <InfiniteScroll loading={loading} more={value && more(value.nextPageToken)} {...rest}>
        {
          <RoundedInput
            hide={!search || !hasLoaded || (!loading && !items.length && !searching)}
            onKeypress={{enter: decodeValue(search)}}
            placeholder='Search your activities...'
            inputProps={{textAlign: 'left', appearance: 'none', h: '17px', lh: '17px'}}
            key={props.boardId}
            type='search'
            icon='search'
            py='8px'
            absolute={absolute}
            z='1'
            w='242px' />
        }
        {
          loaded && renderItems(
            items,
            Item,
            itemProps,
            loading
              ? null
              : (searching ? <EmptySearch /> : emptyState),
            currentUser
          )
        }
      </InfiniteScroll>
    )
  }
})

/**
 * Helpers
 */

function renderItems (items, Item, itemProps, emptyState, currentUser) {
  if (!items.length && emptyState) return emptyState

  let prevDate = new Date(0)
  return reduce((list, item, i) => {
    const date = new Date(
      item.published
        ? item.publishedAt
        : item.updatedAt || item.createdAt
    )

    if (!isSameDay(date, prevDate)) {
      list.push((
        <Block p='m' mt={!i ? 0 : 'm'} fs='s' fw='lighter' color='blue' capitalize boxShadow='card' borderBottom='1px solid rgba(grey, .1)' bg='off_white'>
          {moment(startOfDay(date)).calendar()}
        </Block>
      ))
      prevDate = date
    }

    list.push(<Item activity={item} currentUser={currentUser} {...itemProps} />)
    return list
  }, [], items)
}

function startOfDay (date) {
  return (new Date(date)).setHours(0, 0, 0, 0)
}

/**
 * <EmptySearch/>
 */

function EmptySearch () {
  return (
    <Flex column align='center center' p h='150px'>
      <Text fw='200' fs='s'>
        Sorry, we couldn't find any activities
      </Text>
    </Flex>
  )
}
