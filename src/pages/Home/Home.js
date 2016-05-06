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
  return (
    <Flex column align='center center' color='white' maxWidth={714} textAlign='center'>
      <Content />
      <Flex align='center center' my='m' mx='s' pt='m' wide>
        <Box flex='35%'>
          <Button pill mr='m' bgColor='green' wide onClick={e => setUrl('/teacher')}>
            <Text lh='47px' fs='14px' fw='bolder'>
              Teachers, Sign Up
            </Text>
          </Button>
        </Box>
        <Box flex='35%'>
          <Button id='students' pill ml='m' mr='s' my='m' wide onClick={e => setUrl('/student')}>
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
