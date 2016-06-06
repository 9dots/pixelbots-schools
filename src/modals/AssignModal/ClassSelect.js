/**
 * Imports
 */

import NewMenuItem from 'components/NewMenuItem'
import {Checkbox} from 'vdux-containers'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'

/**
 * ClassSelect
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
      <NewMenuItem type='Class' />
    </Block>
  )
}

function ClassItem({props}) {
  const {cls} = props
  return (
    <Checkbox
      checkProps={{circle: 25, fs: 'xs', ml: 8, mr: 10}}
      checked={Math.round(Math.random())}
      hoverProps={{highlight: 0.03}}
      label={cls.displayName}
      bgColor='white'
      pointer
      p/>
  )
}

/**
 * Helpers
 */

function cmp (a, b) {
  return a.displayName.toUpperCase() > b.displayName.toUpperCase() ? 1 : -1
}

/**
 * Exports
 */

export default summon(() => ({
  classes: '/user/classes'
}))({
  render
})