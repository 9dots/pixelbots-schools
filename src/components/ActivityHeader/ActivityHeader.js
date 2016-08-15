/**
 * Imports
 */

import ActivitySettingsModal from 'modals/ActivitySettingsModal'
import {Block as ContainerBlock, Button} from 'vdux-containers'
import CommoncoreBadge from 'components/CommoncoreBadge'
import SubjectSelector from './SubjectSelector'
import {setUrl} from 'redux-effects-location'
import handleActions from '@f/handle-actions'
import LineInput from 'components/LineInput'
import createAction from '@f/create-action'
import GradeSelector from './GradeSelector'
import {Block, Text, Icon} from 'vdux-ui'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <ActivityHeader/>
 */

function render ({props, state, local}) {
  const {editing, open, editable, activity, clickableTags} = props
  const {displayName, originalDescription, tags, commonCore} = activity
  const editableProps = editable
    ? {hoverProps: {bgColor: 'off_white'}, onClick: open}
    : {}

  if (editing) return <EditingHeader {...props} setErrorSelect={local(setErrorSelect)} errorSelect={state.errorSelect} />

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

const EditingHeader = {
  render: function ({props}) {
    const {activity, onEdit, open, setErrorSelect, errorSelect} = props
    const {displayName, originalDescription, tags} = activity


    return (
      <Block bgColor='white' z={2} relative p={24} pt={18}  boxShadow='0 0 12px rgba(black, .5)' fs='s' lighter>
        <Block align='start center'>
          <Text textAlign='right' minWidth={100} mr='l'>Title:</Text>
          <LineInput
            fs='s'
            lighter
            autofocus
            onFocus={e => e.target.select()}
            onInput={e => onEdit({displayName: e.target.value || 'Untitled Activity'})}
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
        <Block align='start center' mt={18} relative z={1}>
          <Text textAlign='right' minWidth={100} mr='l'>Label:</Text>
          <Block align='start' flex>
            <Block flex='45%' mr>
              <GradeSelector selected={tags} toggle={toggleTag} error={errorSelect} />
            </Block>
            <Block flex='45%' mr>
              <SubjectSelector selected={tags} toggle={toggleTag} error={errorSelect}  />
            </Block>
          </Block>
        </Block>
        <Block bgColor='off_white' border='1px solid grey_light' borderWidth='1px 0' p m={-24} mt='l' align='end'>
          <Button bgColor='grey' px mr='s' onClick={() => openModal(() => <ActivitySettingsModal activity={activity} onEdit={onEdit} />)}>
            <Icon color='white' fs='s' name='settings' />
          </Button>
          <Btn onClick={open}>Done</Btn>
        </Block>
      </Block>
    )

    function * toggleTag(tag) {
      yield setErrorSelect(null)
      const newArr = tags.slice()
      const i = tags.findIndex(({displayName}) => displayName === tag.displayName)

      if(i === -1) {
        if(tags.length < 5) {
          newArr.push(tag)
        } else {
          yield setErrorSelect(tag.displayName)
        }
      } else {
        newArr.splice(i, 1)
      }


      yield onEdit({tags: newArr})
    }
  },
  onRemove: function * ({props}) {
    yield props.setErrorSelect(null)
  }
}

function Btn ({props, children}) {
  return (
    <Button
      hoverProps={{highlight: 0.025}}
      focusProps={{highlight: 0.025}}
      border='1px solid grey_medium'
      bgColor='off_white'
      color='text'
      px
      {...props}>
      {children}
    </Button>
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
      capitalize
      lh='22px'
      bg='blue'
      fs='xxs'
      mr='xs'
      pill
      px
      {...clickableProps}>
      {text}
    </ContainerBlock>
  )
}

/**
 * Actions
 */

const setErrorSelect = createAction('<ActivityHeader />: set error select')

/**
 * Reducer
 */

const reducer = handleActions({
  [setErrorSelect]: (state, errorSelect) => ({...state, errorSelect})
})

/**
 * Exports
 */

export default {
  render,
  reducer
}
