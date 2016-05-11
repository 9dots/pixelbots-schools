/**
 * Imports
 */

import {Block, Card, Text} from 'vdux-ui'
import {MenuItem} from 'vdux-containers'
import element from 'vdux/element'
import map from '@f/map'

function render ({props}) {
  const clss = 'Lorem ipsum dolor sit amet consectetur adipiscing elit'.split(' ')
  return (
    <Card {...props}>
      <Block p uppercase boxShadow='0 2px 1px rgba(75,82,87,0.1)' z='1' relative>
        My Classes
      </Block>
      <Block maxHeight='250px' overflow='auto' border='1px solid rgba(75,82,87,0.05)' borderWidth='1px 0'>
        { clss.map(cls => Item(cls)) }
      </Block>
      <Block boxShadow='0 -2px 1px rgba(75,82,87,0.1)' z='1' relative p/>
    </Card>
  )
}

function Item (cls) {
  return (
    <MenuItem align='start center' p>
      <Block circle='25px' lh='25px' mr textAlign='center' bg='green' color='white' uppercase>{cls[0]}</Block>
      <Text capitalize>{cls}</Text>
    </MenuItem>
  )
}

/**
 * Exports
 */

export default {
  render
}
