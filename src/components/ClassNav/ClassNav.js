/**
 * Imports
 */

import {Block, Text, Input, Dropdown} from 'vdux-containers'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <ClassNav/>
 */

function render ({props, children}) {
  const {classes = []} = props

  return (
    <Dropdown btn={<div>{children}</div>} bg='white' color='black' style={{maxHeight: 350, overflow: 'auto'}}>
      <Block bg='transparent'>
        <Input type='search' placeholder='Filter classes…' />
      </Block>
      {
        map(classItem, classes)
      }
    </Dropdown>
  )
}

function classItem (cls) {
  return (
    <Text transform='capitalize' color='text_color' py='m' px='s'>
      <Text inlineBlock circle mx='s' bg='green' color='white' lh='25px' transform='uppercase' style={{textAlign: 'center'}}>
        {cls.displayName[0]}
      </Text>
      <Text ellipsis>
        {cls.displayName}
      </Text>
    </Text>
  )
}

/**
 * Exports
 */

export default {
  render
}
