/**
 * Imports
 */

import RoundedInput from 'components/RoundedInput'
import handleActions from '@f/handle-actions'
import {setUrl} from 'redux-effects-location'
import createAction from '@f/create-action'
import {Button, Block} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <Search/> site search input/icon (depending on whether
 * we are currently searching)
 */

function initialState({props}) {
  const {url} = props
  const isSearch = url.split('/').filter(Boolean)[0] === 'search'

  return {
    opened: isSearch
  }
}

function render ({props, local, state}) {
  const {url, searching, query} = props
  const {opened} = state
  console.log(searching, opened)

  return (
    <Block relative h='34px'>
      <RoundedInput
        onKeypress={{enter: submitSearch(url)}}
        inputProps={{textAlign: 'left'}}
        bgColor={opened ? 'rgba(white,0.8)' : 'transparent'}
        pointerEvents={!opened && 'none'}
        borderColor={!opened && 'transparent'}
        defaultValue={query}
        focusProps={{}}
        w={opened ? 200 : 0}
        h='34'
        placeholder='Search Weo'
        autofocus={opened}
        transition='all .35s'
        m='0'/>
        <Button
          icon={opened ? 'close' : 'search'}
          color={opened ? 'text' : 'white'}
          absolute
          m='auto'
          bottom
          right={opened ? 9 : 8}
          top='1'
          fs='m'
          onClick={local(toggle)}
          />
    </Block>
  )
}

/**
 * Submit the search
 */

function submitSearch (url) {
  return e => {
    const parts = url.split('/').filter(Boolean)
    parts[2] = e.target.value
    return parts[0] === 'search'
        ? setUrl('/' + parts.join('/'))
        : setUrl('/search/activities/' + e.target.value)
  }
}

/**
 * Actions
 */

const toggle = createAction('<Search />: toggle')

/**
 * Reducer
 */
const reducer = handleActions({
  [toggle]: state => ({...state, opened: !state.opened })
})

/**
 * Exports
 */

export default {
  initialState,
  render,
  reducer
}
