/**
 * Imports
 */

import {Flex, Block, Text} from 'vdux-ui'
import ActionButton from './ActionButton'
import element from 'vdux/element'
import Nav from './Nav'

/**
 * Constants
 */

const buttons = {
  login: <ActionButton link='/login/'>LOG IN</ActionButton>,
  signup: <ActionButton link='/'>SIGN UP</ActionButton>
}

/**
 * Home Header
 */

function render ({props}) {
  const {action} = props
  const button = buttons[action]

  return (
    <Flex tag='header' align='start center' wide py='4px' px='30px' z={1} flex absolute h='53px' bgColor='rgba(255, 255, 255, 0.2)'>
      <Nav />
      <Text tag='a' href='/' ml='m' color='off_white' fs='m' bold style={{letterSpacing: 1}}>
        WEO
      </Text>
      <Flex flex align='end center'>
        {button}
      </Flex>
    </Flex>
  )
}

/**
 * Exports
 */

export default render
