/**
 * Imports
 */

import FloatingArrow from './FloatingArrow'
import InfoBlocks from './InfoBlocks'
import Testimonials from './Testimonials'
import CallToAction from './CallToAction'
import {Button} from 'vdux-containers'
import {Block, Flex, Text} from 'vdux-ui'
import element from 'vdux/element'
import {desk} from 'lib/assets'
import Header from './Header'
import Footer from './Footer'

/**
 * Home Layout
 */

function render ({props, children}) {
  const {action} = props

  return (
    <Block bg='#FFF'>
      <Header action={action} />
      <Flex wide align='center center' bg={`url(${desk}) center /cover`} h='100vh'>
        <Block absolute top='0' bottom='0' right='0' left='0' bg='rgba(32,26,22,0.5)' z='0'/>
        <Block z='1'>
          {children}
        </Block>
        <FloatingArrow z='1' />
      </Flex>
      <InfoBlocks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
