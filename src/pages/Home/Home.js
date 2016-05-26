/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import {Flex, Box, Text} from 'vdux-ui'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import Content from './Content'

/**
 * Home Page
 */

function render ({props}) {
  const btnProps = {
    pill: true,
    my: 's',
    wide: true,
    boxShadow: 'z3'
  }
  return (
    <Flex column align='center center' color='white' maxWidth={714} textAlign='center'>
      <Content />
      <Flex align='center center' my='m' mx='s' pt='m' wide>
        <Box flex='35%' mx='s'>
          <Button {...btnProps} bgColor='green' onClick={e => setUrl('/teacher')}>
            <Text lh='47px' fs='14px' fw='bolder'>
              Teachers, Sign Up
            </Text>
          </Button>
        </Box>
        <Box flex='35%' mx='s'>
          <Button {...btnProps} onClick={e => setUrl('/student')}>
            <Text lh='47px' fs='14px' fw='bolder'>
              Students, Join Class
            </Text>
          </Button>
        </Box>
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
