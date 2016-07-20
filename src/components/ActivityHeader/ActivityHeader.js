/**
 * Imports
 */

import {Block as ContainerBlock, Button} from 'vdux-containers'
import CommoncoreBadge from 'components/CommoncoreBadge'
import LineInput from 'components/LineInput'
import {Block, Text} from 'vdux-ui'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <ActivityHeader/>
 */

function render ({props}) {
  const {editing, open, editable, activity, clickableTags} = props
  const {displayName, originalDescription, tags, commonCore} = activity
  const editableProps = editable
    ? {cursor: 'move', hoverProps: {bgColor: 'grey_light'}, onClick: open}
    : {}

  if (editing) return <EditingHeader {...props} />

  return (
    <ContainerBlock p='12px 24px' {...editableProps}>
      <Block fs='xl' fw='800'>{displayName}</Block>
      <Block mt='s' lighter>{originalDescription}</Block>
      <Block align='start center' mt='xs'>
        {
          map(({displayName}) => <Label text={displayName} clickable={clickableTags} />, tags)
        }
        <CommoncoreBadge hide={!commonCore} placement='right' />
      </Block>
    </ContainerBlock>
  )
}

/**
 * <EditingHeader/>
 */

function EditingHeader ({props}) {
  const {activity, onEdit, open} = props
  const {displayName, originalDescription} = activity

  return (
    <Block column>
      <Button onClick={open}>Done</Button>
      <Block align='start center'>
        <Text>Title:</Text>
        <LineInput
          onInput={e => onEdit({displayName: e.target.value})}
          defaultValue={displayName} />
      </Block>
      <Block align='start center'>
        <Text>Description:</Text>
        <LineInput
          onInput={e => onEdit({originalDescription: e.target.value})}
          defaultValue={originalDescription} />
      </Block>
      <Block align='start center'>
        <Text>Label:</Text>
        <Block>Grade selector</Block>
        <Block>Subject selector</Block>
      </Block>
    </Block>
  )
}
/**
 * <Label/>
 */

function Label ({props}) {
  const {text, clickable} = props
  const clickableProps = clickable
    ? {
        onClick: () => setUrl(`/search/activities/${text}`),
        pointer: true,
        hoverProps: {
          bgColor: 'transparent',
          color: 'blue'
        }
      }
    : {}

  return (
    <Block
      border='1px solid blue'
      color='white'
      lh='22px'
      bg='blue'
      fs='xxs'
      mr='s'
      pill
      px
      {...clickableProps}>
      {text}
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
