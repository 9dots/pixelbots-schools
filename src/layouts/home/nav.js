/**
 * Imports
 */

import {CSSContainer, Flex, Block, Text} from 'vdux-containers'
import HomeOwl from 'components/HomeOwl'
import {logo120} from 'lib/assets'
import element from 'vdux/element'

/**
 * Menu
 */

const links = {
  About: 'http://about.weo.io',
  Training: 'http://about.weo.io/training/',
  Blog: 'http://about.weo.io/blog/',
  Help: 'http://about.weo.io/help/'
}

/**
 * Render
 */

function render () {
  return (
    <Flex align='start center' flex color='white' py={2}>
      <HomeOwl />
      {
        Object
          .keys(links)
          .map(item)
      }
    </Flex>
  )
}

function item (text) {
  return (
    <CSSContainer ui={Block} tag='a' href={links[text]} p={13} color='white' transition='color 0.1s 0s ease-in-out' hoverProps={{color: '#9c9999'}} >
      <Text uppercase weight='400' lh='1em' letterSpacing='2px' antialiased>
        {text}
      </Text>
    </CSSContainer>
  )
}

/**
 * Exports
 */

export default {
  render
}
