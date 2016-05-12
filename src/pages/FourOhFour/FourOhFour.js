/**
 * Imports
 */

import element from 'vdux/element'
import {Text, Flex, Icon} from 'vdux-ui'
import {setUrl} from 'redux-effects-location'

/**
 * <FourOhFour/>
 */

function render ({props}) {
  return (
    <Flex column absolute h='90%' wide top align='center center' pointer onClick={() => setUrl('/')} fw='200' capitalize>
      <Icon name='highlight_off' fs='160px' color='red' m/>
      <Text fs='xl' mb fw='bold'>
        404.
        <Text color='midgray' fw='100'> Page not found.</Text>
      </Text>
      <Text fs='m'>Click to return home.</Text>
    </Flex>
  )
}

/**
 * Exports
 */

export default {
  render
}
