/**
 * Imports
 */

import ObjectControls from 'components/ObjectControls'
import MarkdownHelper from 'components/MarkdownHelper'
import LineTextarea from 'components/LineTextarea'
import {Button} from 'vdux-containers'
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
        textAlign={object.justify}
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
            textAlign={object.justify}
            onInput={e => onEdit({...object, originalContent: e.target.value})}
            defaultValue={originalContent} />
        </Block>
        <Block alignSelf='baseline' ml='s'>
          <MarkdownHelper mt={8} menuProps={{mr: -12}} />
        </Block>
      </Block>
      <ObjectControls {...props}>
        <AlignIcon {...props} justify='left' />
        <AlignIcon {...props} justify='center' mx />
        <AlignIcon {...props} justify='right' />
      </ObjectControls>
    </Block>

  )
}

function AlignIcon ({props}) {
  const {justify, object, onEdit, ...rest} = props

  return (
    <Button
      onClick={() => onEdit({...object, justify})}
      hoverProps={{color: 'text'}}
      color={justify === (object.justify || 'left') ? 'text' : 'grey_medium'}
      icon={`format_align_${justify}`}
      fs={24}
      {...rest} />
  )
}

/**
 * Exports
 */

export default {
  render
}
