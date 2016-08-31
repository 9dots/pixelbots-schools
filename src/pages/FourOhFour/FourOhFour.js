/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import {Text, Flex, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <FourOhFour/>
 */

function render ({props}) {
  return (
    <Flex column absolute h='90%' wide maxWidth='100%' top align='center center' pointer onClick={() => setUrl('/')} fw='200' capitalize {...props}>
      <Icon name='highlight_off' fs='160px' color='red' m/>
      <Text fs='xl' mb fw='bold'>
        404.
        <Text fw='300'> Page not found.</Text>
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
