/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import {Flex, Box, Text} from 'vdux-ui'
import {Button} from 'vdux-containers'
import HomeLayout from 'layouts/Home'
import element from 'vdux/element'
import Content from './Content'

/**
 * Home Page
 */

function render ({props}) {
  return (
    <HomeLayout action='login'>
      <Flex column align='center center' color='white' maxWidth={714} textAlign='center'>
        <Content />
        <Flex align='center center' my='m' mx='s' pt='m' wide>
          <Box flex='35%'>
            <Button pill mr='m' bgColor='green' wide onClick={e => setUrl('/teacher')}>
              <Text lh='47px' fs='14px' weight='bolder'>
                Teachers, Sign Up
              </Text>
            </Button>
          </Box>
          <Box flex='35%'>
            <Button id='students' pill ml='m' mr='s' my='m' wide onClick={e => setUrl('/student')}>
              <Text lh='47px' fs='14px' weight='bolder'>
                Students, Join Class
              </Text>
            </Button>
          </Box>
        </Flex>
      </Flex>
    </HomeLayout>
  )
}

/**
 * Exports
 */

export default {
  render
}
