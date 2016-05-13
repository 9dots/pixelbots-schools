/**
 * Imports
 */

import InfiniteScroll from 'components/InfiniteScroll'
import ActivityRow from 'components/ActivityRow'
import isSameDay from '@f/is-same-day'
import {Block, Text, Flex} from 'vdux-ui'
import RoundedInput from 'components/RoundedInput'
import Loading from 'components/Loading'
import element from 'vdux/element'
import reduce from '@f/reduce'
import moment from 'moment'

/**
 * <RowFeed/>
 */

function render ({props}) {
  const {activities = [], more, search} = props
  const {value, loaded, loading} = activities

  return (
    <InfiniteScroll more={more}>
      <RoundedInput
        w='25%'
        onKeypress={{enter: e => search(e.target.value)}}
        placeholder='Search your activities...'
        type='search'
        absolute
        inputProps={{textAlign: 'left'}}
        icon='search'
        right='6px' />
        {
          loaded && renderItems(value.items)
        }
        {
          (loaded && (loading || !value.items.length)) && Empty()
        }
      <Loading show={loading}/>
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

function Empty() {
  return (
    <Flex column align='center center' p h='150px'>
      <Text fw='200' fs='s'>
        Sorry, we couldn't find any activities
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
