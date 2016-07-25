/**
 * Imports
 */

import LineTextarea from 'components/LineTextarea'
import MarkdownHelper from 'components/MarkdownHelper'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <ActivityPost/>
 */

function render ({props}) {
  const {object, editing, open, editable} = props

  if (editing) return <EditablePost {...props} />

  return (
    <Block>
      <Block
        fs='s'
        fw='100'
        lh='1.5em'
        class='markdown'
        innerHTML={object.content} />
    </Block>
  )
}

/**
 * <EditablePost/>
 */

function EditablePost ({props}) {
  const {object, onEdit, open} = props
  const {originalContent} = object

  return (
    <Block py align='start'>
      <Block flex>
        <LineTextarea
          autofocus
          fs='s'
          lighter
          onInput={e => onEdit({...object, originalContent: e.target.value})}
          defaultValue={originalContent} />
      </Block>
      <MarkdownHelper mt={8} menuProps={{mr: -12}} />
    </Block>

  )
}

/**
 * Exports
 */

export default {
  render
}
