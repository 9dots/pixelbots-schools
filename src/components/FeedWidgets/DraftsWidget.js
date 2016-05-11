/**
 * Imports
 */

import {Block, Flex, Card, Icon} from 'vdux-ui'
import element from 'vdux/element'
import WeoIcon from 'components/WeoIcon'

function render ({props}) {
  const {draftCount} = props
  const size = '25px'

  return (
    <Card align='start center' p {...props} hide={!draftCount}>
      <WeoIcon fs='s' mr name='drafts'/>
      <Flex align='start center' flex>
        Drafts
        <Block circle={size} lh={size} ml='s' bg='yellow' color='white' textAlign='center'>
          {draftCount}
        </Block>
      </Flex>
      <Icon fs='s' name='keyboard_arrow_right'/>
    </Card>
  )
}

/**
 * Exports
 */

export default {
  render
}
