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
  const {object, remove, open} = props
  return (
    <Block p m={-24} mt={24} borderTop='1px solid grey_light' bgColor='off_white' align='space-between center'>
      <Block align='start center'>
        {children}
      </Block>
      <Block align='end stretch'>
        <Button onClick={() => remove(object)} bgColor='off_white' border='1px solid grey_medium' px hoverProps={{highlight: 0.03}} focusProps={{highlight: 0.03}}>
          <Icon fs='s' name='delete' color='text' />
        </Button>
        <Button onClick={() => open(null)} ml='s' px >Done</Button>
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
