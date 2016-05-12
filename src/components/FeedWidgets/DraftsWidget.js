/**
 * Imports
 */

import {Block, Flex, Card, Icon} from 'vdux-ui'
import {setUrl} from 'redux-effects-location'
import element from 'vdux/element'
import WeoIcon from 'components/WeoIcon'

function render ({props}) {
  const {draftCount} = props
  const size = '25px'

  return (
    <Card align='start center' pointer p {...props} hide={!draftCount} onClick={() => setUrl('/activities/drafts')}>
      <WeoIcon fs='m' mr name='drafts'/>
      <Flex align='start center' flex>
        Drafts
        <Block circle={size} lh={size} ml fs='xxs' bg='yellow' color='white' textAlign='center'>
          {draftCount < 100 ? draftCount : '99+'}
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
