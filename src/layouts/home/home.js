/**
 * Imports
 */

import FloatingArrow from './FloatingArrow'
import InfoBlocks from './InfoBlocks'
import {Block, Flex} from 'vdux-ui'
import element from 'vdux/element'
import {chalk} from 'lib/assets'
import Header from './Header'

/**
 * Home Layout
 */

function render ({props, children}) {
  const {action} = props

  return (
    <Block bgColor='#fdfdfd'>
      <Header action={action} />
      <Flex wide align='center center' bg={`url(${chalk})`} bgSize='cover' bgPos='center bottom' absolute h='100vh'>
        {children}
        <FloatingArrow />
      </Flex>
      <InfoBlocks />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
