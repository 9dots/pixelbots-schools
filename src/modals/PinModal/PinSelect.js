/**
 * Imports
 */

import {MenuItem, Checkbox} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * PinSelect
 */

function render({props}) {
  const {classes, ...rest} = props
  const {value, loading} = classes

  return (
    <Block overflowY='auto' {...rest}>
      {
        !loading &&
          value.items
            .sort(cmp)
            .map(cls => <ClassItem cls={cls} />)
      }
    </Block>
  )
}

function ClassItem({props}) {
  const {cls} = props
  return (
    <Checkbox
      checked={Math.round(Math.random())}
      bgColor='white'
      hoverProps={{highlight: 0.03}}
      pointer
      checkProps={{circle: 25, fs: 'xs', mr: true}}
      p
      label={cls.displayName}/>
  )
}

/**
 * Helpers
 */

function cmp (a, b) {
  return a.displayName.toUpperCase() > b.displayName.toUpperCase()
    ? 1
    : -1
}

/**
 * Exports
 */

export default summon(() => ({
  classes: '/user/boards'
}))({
  render
})