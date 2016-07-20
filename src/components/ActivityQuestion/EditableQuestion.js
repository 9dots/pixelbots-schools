/**
 * Imports
 */

import LineTextarea from 'components/LineTextarea'
import {Block, Badge} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <EditableQuestion/>
 */

function render ({props}) {
  const {onEdit, object, idx} = props
  const {originalContent} = object

  return (
    <Block>
      <Block align='start' py mb>
        <Badge mr pt={3} size={25}>{idx + 1}</Badge>
        <LineTextarea
          onInput={e => onEdit({...object, originalContent: e.target.value})}
          defaultValue={originalContent} />
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
