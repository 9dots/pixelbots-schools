/**
 * Imports
 */

import {Button} from 'vdux-containers'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ObjectControls/>
 */

function render ({props, children}) {
  const {remove, open} = props
  return (
    <Block p m={-24} mt={24} borderTop='1px solid grey_light' bgColor='off_white' align='space-between center'>
      <Block>
        {children}
      </Block>
      <Block align='end center'>
        <Button onClick={remove} bgColor='off_white' border='1px solid grey_medium' px h={32} hoverProps={{highlight: 0.03}} focusProps={{highlight: 0.03}}>
          <Icon fs='s' name='delete' color='text' />
        </Button>
        <Button onClick={open} ml='s' px h={32}>Done</Button>
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
