/**
 * Imports
 */

import LineInput from 'components/LineInput'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <EditingMedia/>
 */

function render ({props}) {
  const {object, onEdit} = props
  const {originalContent} = object

  return (
    <Block>
      <LineInput
        onInput={e => onEdit({...object, originalContent: e.target.value})}
        defaultValue={originalContent}
        placeholder='Enter a url...' />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
