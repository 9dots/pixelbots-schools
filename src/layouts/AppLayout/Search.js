/**
 * Imports
 */

import RoundedInput from 'components/RoundedInput'
import {component, element} from 'vdux'
import {Button, Block} from 'vdux-ui'

/**
 * <Search/> site search input/icon (depending on whether
 * we are currently searching)
 */

export default component({
  initialState: ({props}) => ({
    opened: props.searching
  }),


  render ({props, actions, state}) {
    const {url, searching, query, ...rest} = props
    const {opened} = state

    return (
      <Block relative h='34px' {...rest}>
        <RoundedInput
          bgColor={opened ? 'rgba(white,0.8)' : 'transparent'}
          pointerEvents={opened ? 'auto' : 'none'}
          onKeypress={{enter: actions.submitSearch(url)}}
          inputProps={{textAlign: 'left'}}
          borderColor='transparent'
          placeholder='Search Weo'
          transition='all .24s'
          defaultValue={query}
          w={opened ? 220 : 0}
          autofocus={opened}
          activeProps={{}}
          focusProps={{}}
          h='34'
          m='0'/>
        <Button
          icon={opened ? 'close' : 'search'}
          color={opened ? 'text' : 'white'}
          onClick={actions.toggle}
          absolute
          m='auto'
          bottom
          right={opened ? 9 : 8}
          top='1'
          fs='m'
          />
      </Block>
    )
  },

  events: {
    * submitSearch ({context, actions}, url, value) {
      if (!value) return

      const parts = url.split('/').filter(Boolean)
      parts[2] = value
      yield parts[0] === 'search'
          ? context.setUrl('/' + parts.join('/'))
          : context.setUrl('/search/activities/' + value)
    }
  },

  reducer: {
    toggle: state => ({opened: !state.opened})
  }
})
