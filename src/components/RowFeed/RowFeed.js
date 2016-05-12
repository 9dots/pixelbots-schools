/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import ActivityRow from 'components/ActivityRow'
import isSameDay from '@f/is-same-day'
import {Block, Input} from 'vdux-ui'
import element from 'vdux/element'
import reduce from '@f/reduce'
import moment from 'moment'

/**
 * <RowFeed/>
 */

function render ({props}) {
  const {activities = [], more, search} = props
  const {value, loading} = activities

  return (
    <InfiniteScroll more={more}>
      <Input
        w='25%'
        onKeypress={{enter: e => search(e.target.value)}}
        placeholder='Search your activities...'
        type='search' />
        {
          loading || renderItems(value.items)
        }
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

/**
 * Exports
 */

export default {
  render
}
