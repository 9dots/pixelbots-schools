/**
 * Imports
 */

import ActivitySettingsModal from 'modals/ActivitySettingsModal'
import {Block as ContainerBlock, Button} from 'vdux-containers'
import CommoncoreBadge from 'components/CommoncoreBadge'
import {setUrl} from 'redux-effects-location'
import LineInput from 'components/LineInput'
import {Block, Text, Icon} from 'vdux-ui'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <ActivityHeader/>
 */

function render ({props}) {
  const {editing, open, editable, activity, clickableTags} = props
  const {displayName, originalDescription, tags, commonCore} = activity
  const editableProps = editable
    ? {hoverProps: {bgColor: 'off_white'}, onClick: open}
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
    <Block bgColor='white' z={2} relative p={24} pt={18}  boxShadow='0 0 12px rgba(black, .5)' fs='s' lighter>
      <Block align='start center'>
        <Text textAlign='right' minWidth={100} mr='l'>Title:</Text>
        <LineInput
          fs='s'
          lighter
          autofocus
          onInput={e => onEdit({displayName: e.target.value})}
          defaultValue={displayName} />
      </Block>
      <Block align='start center' mt='s'>
        <Text textAlign='right' minWidth={100} mr='l'>Description:</Text>
        <LineInput
          fs='s'
          lighter
          onInput={e => onEdit({originalDescription: e.target.value})}
          defaultValue={originalDescription} />
      </Block>
      <Block align='start center' mt>
        <Text textAlign='right' minWidth={100} mr='l'>Label:</Text>
        <Block align='start'>
          <Button bgColor='grey' text='Grade Selector' mr/>
          <Button bgColor='grey' text='Subject selector'/>
        </Block>
      </Block>
      <Block bgColor='off_white' border='1px solid grey_light' borderWidth='1px 0' p m={-24} mt='l' align='end'>
        <Button bgColor='grey' px mr='s' onClick={() => openModal(() => <ActivitySettingsModal activity={activity} onEdit={onEdit} />)}>
          <Icon fs='s' name='settings' />
        </Button>
        <Button onClick={open} px>Done</Button>
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
    <ContainerBlock
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
    </ContainerBlock>
  )
}

/**
 * Exports
 */

export default {
  render
}
