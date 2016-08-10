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
      <Block align='start center'>
        {children}
      </Block>
      <Block align='end stretch'>
        <Btn onClick={remove} color='grey_medium'>
          <Icon fs='s' name='delete' color='text' />
        </Btn>
        <Btn color='blue' onClick={open} ml='s'>
          Done
        </Btn>
      </Block>
    </Block>
  )
}

function Btn ({props, children}) {
  const {color, ...rest} = props
  return (
    <Button
      hoverProps={{highlight: 0.025}}
      focusProps={{highlight: 0.025}}
      border={'1px solid ' +  color}
      bgColor='off_white'
      color={color}
      px
      {...rest}>
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
