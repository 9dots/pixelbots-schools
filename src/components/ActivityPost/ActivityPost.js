/**
 * Imports
 */

import LineTextarea from 'components/LineTextarea'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <ActivityPost/>
 */

function render ({props}) {
  const {object, editing, open, editable} = props

  if (editing) return <EditablePost {...props} />

  return (
    <Block
      fs='s'
      fw='100'
      lh='1.5em'
      class='markdown'
      innerHTML={object.content} />
  )
}

/**
 * <EditablePost/>
 */

function EditablePost ({props}) {
  const {object, onEdit, open} = props
  const {originalContent} = object

  return (
    <Block>
      <LineTextarea
        onInput={e => onEdit({...object, originalContent: e.target.value})}
        defaultValue={originalContent} />
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
