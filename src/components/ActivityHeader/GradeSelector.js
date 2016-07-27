/**
 * Imports
 */

import {Button, Dropdown, MenuItem, Checkbox} from 'vdux-containers'
import grades from '@weo-edu/grades'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'
import map from '@f/map'

/**
 * Render
 */


function render ({props, local, state}) {
  const current = state.category
  return (
    <Dropdown onClick={e => e.stopPropagation()} wide btn={<DDBtn text='Grade Selector'/>}>
      { map(grade => <Item tag={grade}/>, grades) }
    </Dropdown>
  )
}

function DDBtn ({props}) {
  const {text, ...rest} = props
  return (
    <Button
      hoverProps={{highlight: 0.02}}
      focusProps={{highlight: 0.02}}
      bgColor='off_white'
      textAlign='left'
      color='text'
      lh='2.8em'
      ellipsis
      fs='xxs'
      wide
      px
      {...rest}>
      <Block flex ellipsis>{text}</Block>
      <Icon fs='s' name='keyboard_arrow_down' />
    </Button>
  )
}

function Item ({props}) {
  const {tag} = props
  const {displayName} = tag

  return (
    <MenuItem tag='label' fs='xs' p='5px 8px' align='start center' capitalize>
      <Checkbox mr='s' checkProps={{sq: 15}}/>{displayName}
    </MenuItem>
  )
}

/**
 * Exports
 */

export default {
  render
}