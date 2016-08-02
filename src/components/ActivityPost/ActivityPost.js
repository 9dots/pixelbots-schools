/**
 * Imports
 */

import ObjectControls from 'components/ObjectControls'
import MarkdownHelper from 'components/MarkdownHelper'
import LineTextarea from 'components/LineTextarea'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <ActivityPost/>
 */

function render ({props}) {
  const {object, editing, open, editable, onEdit, remove, ...rest} = props

  if (editing) return <EditablePost {...props} />

  return (
    <Block {...rest}>
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
    <Block>
      <Block py align='start'>
        <Block flex>
          <LineTextarea
            autofocus
            fs='s'
            lighter
            onInput={e => onEdit({...object, originalContent: e.target.value})}
            defaultValue={originalContent} />
        </Block>
        <Block alignSelf='baseline'>
          <MarkdownHelper mt={8} menuProps={{mr: -12}} />
        </Block>
      </Block>
      <ObjectControls {...props} />
    </Block>

  )
}

/**
 * Exports
 */

export default {
  render
}
