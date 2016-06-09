/**
 * Imports
 */

import NewMenuItem from 'components/NewMenuItem'
import {Checkbox} from 'vdux-containers'
import validate from 'lib/validate'
import element from 'vdux/element'
import summon from 'vdux-summon'
import {Block} from 'vdux-ui'
import map from '@f/map'

/**
 * ClassSelect
 */

function render({props}) {
  const {classes, createClass, ...rest} = props
  const {value, loaded} = classes

  return (
    <Block overflowY='auto' {...rest}>
      {
        loaded &&
          map(cls => <ClassItem cls={cls} />, value.items)
      }
      <NewMenuItem key='newMenuItem' onSubmit={createClass} validate={validate.group} type='Class' />
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
 * Exports
 */

export default summon(props => ({
  classes: '/user/classes',
  createClass: body => ({
    newClass: {
      url: '/group/',
      method: 'POST',
      invalidates: ['/user/classes', '/user'],
      body
    }
  })
}))({
  render
})