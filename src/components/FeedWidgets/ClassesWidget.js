/**
 * Imports
 */

import {setUrl} from 'redux-effects-location'
import {Block, Card, Text} from 'vdux-ui'
import {MenuItem} from 'vdux-containers'
import element from 'vdux/element'

function render ({props}) {
  const {classes = []} = props
  const sortedClasses = classes.sort(function(a, b) {
    return a.displayName.toUpperCase() > b.displayName.toUpperCase() ? 1 : -1
  })
  const isOverflown = classes.length > 5
  return (
    <Card {...props}>
      <Block p uppercase boxShadow={isOverflown && '0 2px 1px rgba(75,82,87,0.1)'} z='1' relative>
        My Classes
      </Block>
      <Block maxHeight='245px' overflow='auto' border='1px solid rgba(75,82,87,0.05)' borderWidth='1px 0'>
        { sortedClasses.map(cls => Item(cls)) }
      </Block>
      <Block boxShadow={isOverflown && '0 -2px 1px rgba(75,82,87,0.1)'} z='1' relative p/>
    </Card>
  )
}

function Item (cls) {
  const {id, displayName} = cls
  return (
    <MenuItem align='start center' p onClick={() => setUrl(`/class/${id}/feed`)}>
      <Block circle='25px' lh='25px' mr textAlign='center' bg='green' color='white' uppercase>{displayName[0]}</Block>
      <Text capitalize>{displayName}</Text>
    </MenuItem>
  )
}

/**
 * Exports
 */

export default {
  render
}
