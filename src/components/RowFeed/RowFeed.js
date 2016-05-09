/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import ActivityRow from 'components/ActivityRow'
import isSameDay from '@f/is-same-day'
import element from 'vdux/element'
import moment from 'moment'
import {Block} from 'vdux-ui'

/**
 * <RowFeed/>
 */

function render ({props}) {
  const {items = [], more} = props
  let prevDate = new Date(0)

  return (
    <InfiniteScroll more={more}>
      {
        items.reduce((list, item) => {
          const date = new Date(item.publishedAt || item.createdAt)
          if (!isSameDay(date, prevDate)) {
            list.push((
              <Block p='m' mt='m' fs='s' fw='lighter' color='blue'>
                {moment(date).format('MMMM DD, YYYY')}
              </Block>
            ))
            prevDate = date
          }

          list.push(<ActivityRow activity={item} />)
          return list
        }, [])
      }
    </InfiniteScroll>
  )
}

/**
 * Helpers
 */

function formatDate (date) {
  return
}

/**
 * Exports
 */

export default {
  render
}
