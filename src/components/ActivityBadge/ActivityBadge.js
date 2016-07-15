/**
 * Imports
 */

import {Flex, Text, Icon, Block} from 'vdux-ui'
import statusMap from 'lib/status'
import element from 'vdux/element'

/**
 * <ActivityBadge/>
 */

function render ({props}) {
  const {status, text = true, userType, ...rest} = props
  const {icon, teacherColor, studentColor, displayName} = statusMap[status || 1]
  const height = 19
  const color = userType === 'teacher' ? teacherColor : studentColor

  return (
    <Flex align='end' color={color} {...rest}>
      <Text hide={!text} mt={height/1.5} mr={height/1.5} uppercase fs='xxs'>
        {displayName}
      </Text>
      <Flex align='center center' sq={height} color='white' relative>
        <Icon name={icon} fs='xs' z='1' mr={3} mt={3}/>
        <Block absolute='top right' border={`${height}px solid ${color}`} borderBottomColor='transparent' borderLeftColor='transparent' />
      </Flex>
    </Flex>
  )
}

/**
 * Exports
 */

export default {
  render
}
