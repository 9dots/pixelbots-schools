/**
 * Imports
 */

import {wrap, CSSContainer, Button} from 'vdux-containers'
import {generateObjectId} from 'middleware/objectId'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {Icon, Block} from 'vdux-ui'
import element from 'vdux/element'

/**
 * initialState
 */

function initialState ({props}) {
  return {
    open: props.startsOpen
  }
}

/**
 * <AttachmentMenu/>
 */

function render ({props, state, local}) {
  const {attach, startsOpen} = props

  const menu = [
    <Close onClick={local(toggle)} absolute='top -10px right -10px' hide={startsOpen} />,
    <AttachButton onClick={createAndAttach('question')} icon='help' color='red' text='Question' hoverProps={{hover: true}} />,
    <AttachButton onClick={createAndAttach('video')} icon='videocam' color='yellow' text='Video' hoverProps={{hover: true}} />,
    <AttachButton onClick={createAndAttach('link')} icon='link' color='blue' text='Link' hoverProps={{hover: true}} />,
    <AttachButton onClick={createAndAttach('image')} icon='camera_alt' color='green' text='Image' hoverProps={{hover: true}} />,
    <AttachButton onClick={createAndAttach('document')} icon='insert_drive_file' color='red' text='Document' hoverProps={{hover: true}} />,
    <AttachButton onClick={createAndAttach('post')} icon='subject' color='text' text='Text' hoverProps={{hover: true}} />
  ]

  return (
    <Block relative bgColor='grey_light' border='1px dashed grey_medium' wide mb='l' h={130} align='space-around center' px='l'>
      {
        state.open
          ? menu
          : <Button onClick={local(toggle)} pointer circle={55} boxShadow='card'>
              <Icon name='add' color='white' />
            </Button>
      }
    </Block>
  )

  function createAndAttach (type) {
    return function * () {
      const id = yield generateObjectId()
      yield attach({
        _id: id,
        objectType: type
      })
      yield local(toggle)()
    }
  }
}

/**
 * <Close/>
 */

function Close ({props}) {
  return (
    <Icon
      border='2px solid white'
      align='center center'
      bgColor='black'
      boxShadow='z1'
      color='white'
      name='close'
      circle={24}
      pointer
      fs='xs'
      {...props} />
  )
}

const AttachButton = wrap(CSSContainer)({
  render ({props, children}) {
    const {
      attach, type, text, onClick, icon, color, hover
    } = props

    return (
      <Block
        textAlign='center'
        onClick={onClick}
        pointer>
        <Icon
          transform={hover ? 'translateY(-6px)' : ''}
          transition='transform .15s'
          color={color}
          name={icon}
          fs={42}
          sq={50}/>
        <Block fs='s' lighter>{text}</Block>
      </Block>
    )
  }
})


/**
 * Actions
 */

const toggle = createAction('<ActivityEditor/>: toggle attachments')

/**
 * Reducer
 */

const reducer = handleActions({
  [toggle]: state => ({
    ...state,
    open: !state.open
   })
})


/**
 * Exports
 */

export default {
  initialState,
  render,
  reducer
}
