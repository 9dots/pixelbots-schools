/**
 * Imports
 */

import {Block, Icon} from 'vdux-ui'
import {Flex, Tooltip} from 'vdux-containers'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'

/**
 * <SettingsRow/>
 */

function render ({props, children}) {
  const {Modal, user, prop, name, placeholder, message, clickable = true, ...rest} = props
  const text = Array.isArray(prop) ? prop.join(', ') : prop
  const keyWidth = '25%'
  const rowProps = {
    hoverProps: {bgColor: clickable && 'rgba(blue_light, .06)'},
    activeProps: {bgColor: clickable && 'rgba(blue_light, .1)'},
    borderBottom: '1px solid grey_light',
    pointer: clickable,
    fw: 'lighter',
    p: 'l',
    fs: 's',
    ...rest
  }

  return (
    <Flex {...rowProps} onClick={() => modal(Modal)}>
      <Block flex={keyWidth} align='start center'>
        {name}
        {
          message &&
          <Tooltip message={message} align='center center' tooltipProps={{whiteSpace: 'normal'}}>
            <Icon name='info' fs='xs' ml='s'  />
          </Tooltip>
        }
      </Block>
      <Block flex color={!text && 'grey_medium'}>
        {
          children.length ? children : text || placeholder
        }
      </Block>
    </Flex>
  )

  function modal(Modal) {
    if(Modal)
      return openModal(() => <Modal user={user} />)
  }
}


/**
 * Exports
 */

export default {
  render
}
