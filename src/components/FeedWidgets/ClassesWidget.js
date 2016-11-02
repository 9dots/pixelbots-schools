/**
 * Imports
 */

import {Block, Card, Text} from 'vdux-ui'
import {MenuItem} from 'vdux-containers'
import {component, element} from 'vdux'
import summon from 'vdux-summon'

/**
 * <ClassesWidget/>
 */

export default summon(() => ({
  classes: '/user/classes'
}))(component({
  render ({props, context}) {
    const {classes} = props
    const {value, loading} = classes
    const clsLength = !loading && value.items.length

    return (
      <Card hide={clsLength < 1} {...props}>
        <Block p uppercase boxShadow={clsLength > 5 && '0 2px 1px rgba(75,82,87,0.1)'} z='1' relative>
          My Classes
        </Block>
        <Block maxHeight='247px' overflow='auto' border='1px solid rgba(75,82,87,0.05)' borderWidth='1px 0'>
          { !loading && value.items.sort(cmp).map(cls => item(context.setUrl, cls)) }
        </Block>
        <Block boxShadow={clsLength > 5 && '0 -2px 1px rgba(75,82,87,0.1)'} z='1' relative p />
      </Card>
    )
  }
}))

/**
 * Helpers
 */

function item (setUrl, cls) {
  const {_id, displayName} = cls
  return (
    <MenuItem align='start center' p onClick={setUrl(`/class/${_id}/feed`)}>
      <Block circle='25px' lh='25px' mr textAlign='center' bg='green' color='white' uppercase>{displayName[0]}</Block>
      <Text capitalize>{displayName}</Text>
    </MenuItem>
  )
}

function cmp (a, b) {
  return a.displayName.toUpperCase() > b.displayName.toUpperCase()
    ? 1
    : -1
}
