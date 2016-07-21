/**
 * Imports
 */

import {generateObjectId} from 'middleware/objectId'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <AttachmentMenu/>
 */

function render ({props, state, local}) {
  const {attach} = props

  const menu = [
    <Close onClick={local(toggle)} absolute='top -10px right -10px' />,
    <AttachButton onClick={createAndAttach('question')} icon='help' color='red' text='Question' />,
    <AttachButton onClick={createAndAttach('video')} icon='videocam' color='yellow' text='Video' />,
    <AttachButton onClick={createAndAttach('link')} icon='link' color='blue' text='Link' />,
    <AttachButton onClick={createAndAttach('image')} icon='camera_alt' color='green' text='Image' />,
    <AttachButton onClick={createAndAttach('document')} icon='insert_drive_file' color='red' text='Document' />,
    <AttachButton onClick={createAndAttach('post')} icon='subject' color='black' text='Text' />
  ]

  return (
    <Block m relative bgColor='grey_light' outline='1px dashed' wide h={50} align='center center'>
      {
        state.open
          ? menu
          : <Icon onClick={local(toggle)} align='center center' pointer circle={40} name='add' bgColor='blue' color='white' boxShadow='card' />
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
      boxShadow='z1'
      align='center center'
      pointer
      fs='xs'
      circle={24}
      bgColor='black'
      color='white'
      name='close'
      {...props} />
  )
}

function AttachButton ({props, children}) {
  const {attach, type, text, onClick, icon, color} = props

  return (
    <Block onClick={onClick} column align='center center' pointer>
      <Icon color={color} name={icon} />
      {text}
    </Block>
  )
}

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
  render,
  reducer
}
