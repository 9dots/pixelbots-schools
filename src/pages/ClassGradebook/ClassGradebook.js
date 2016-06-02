/**
 * Imports
 */

import PageTitle from 'components/PageTitle'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <ClassGradebook/>
 */

function render ({props}) {
  const {group} = props

  return (
    <Block>
      <PageTitle title={`${group.displayName} | Gradebook`} />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
