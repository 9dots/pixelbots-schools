/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import {Input, Button} from 'vdux-ui'
import element from 'vdux/element'
import qs from 'qs'

/**
 * <Search/> site search input/icon (depending on whether
 * we are currently searching)
 */

function render ({props}) {
  const {url, searching, query} = props

  return (
    searching
      ? <Input
          color='#666'
          bgColor='rgba(255, 255, 255, 0.8)'
          onKeypress={{enter: submitSearch(url)}}
          defaultValue={query}
          inputProps={{
            h: 34,
            w: 230,
            pr: 30,
            pl: 12,
            fs: 'xs',
            autofocus: true
          }}
          borderWidth={0}
          outline='none'
          pill
          placeholder='Search Weo'
          mb='0' />
      : <Button onClick={() => setUrl('/search/activities')} fs='m' tooltip='Search Weo' ttPlacement='bottom' icon='search' tag='div' align='center' display='flex'/>
  )
}

/**
 * Submit the search
 */

function submitSearch (url) {
  return e => {
    const parts = url.split('/').filter(Boolean)
    parts[2] = e.target.value
    return setUrl('/' + parts.join('/'))
  }
}

/**
 * Exports
 */

export default {
  render
}
