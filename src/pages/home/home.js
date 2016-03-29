/**
 * Imports
 */

import {Flex, Button, Box, Text} from 'vdux-ui'
import {setUrl} from 'redux-effects-location'
import HomeLayout from 'layouts/Home'
import element from 'vdux/element'
import Content from './Content'

/**
 * Home Page
 */

function render ({props}) {
  return (
    <HomeLayout action='login'>
      <Flex column align='center center' color='white' style={{maxWidth: 714, textAlign: 'center'}}>
        <Content />
        <Flex align='center center' my='m' mx='s' pt='m' wide>
          <Box flex='35%'>
            <Button pill mr='m' bg='green' wide onClick={e => setUrl('/teacher')}>
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
