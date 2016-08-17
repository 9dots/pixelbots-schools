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
        <Btn onClick={() => remove(object)}>
          <Icon fs='s' name='delete' color='text' />
        </Btn>
        <Btn onClick={() => open(null)} ml='s'>
          Done
        </Btn>
      </Block>
    </Block>
  )
}

function Btn ({props, children}) {
  return (
    <Button
      hoverProps={{highlight: 0.03}}
      focusProps={{highlight: 0.03}}
      border='1px solid grey_medium'
      bgColor='off_white'
      color='text'
      px
      {...props}>
      {children}
    </Button>
  )
}

/**
 * Exports
 */

export default {
  render
}
