/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text, Icon} from 'vdux-ui'
import {Button, Toggle, Tooltip, form} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <ActivitySettingsModal/>
 */

function render ({props}) {
  const {activity, fields, onEdit} = props
  const {discussion, hideOnTurnIn, textToSpeech} = fields
  const ttProps ={
    immediate: true,
    cursor: 'default',
    color: 'grey_medium',
    tooltipProps: {
      whiteSpace: 'pre',
      textAlign: 'center'
    }
  }

  return (
    <Modal onDismiss={closeModal}>
      <ModalBody column align='center center' pb='l'>
        <ModalHeader>
          Activity Settings
        </ModalHeader>
        <Block borderBottom='1px solid grey_light' py='16' wide>
          <Toggle
            checked={discussion.value}
            label='Enable Discussion'
            value
            name='discussion'/>
        </Block>
        <Block borderBottom='1px solid grey_light' py='16' wide align='start center'>
          <Toggle
            label='Activity hidden while turned in'
            checked={hideOnTurnIn.value}
            name='hideOnTurnIn'
            value
            flex/>
          <Tooltip message={'Keep turned in Activity\nhidden until it\'s returned'} {...ttProps} >
            <Icon name='help' fs='s'/>
          </Tooltip>
        </Block>
        <Block py='16' wide align='start center'>
          <Toggle
            label='Text to speech (Available for Chrome and Safari)'
            checked={textToSpeech.value}
            name='textToSpeech'
            value
            flex/>
          <Tooltip message={'Supported Browser:\nChrome 33+ and Safari 7+'} {...ttProps} >
            <Icon name='help' fs='s'/>
          </Tooltip>
        </Block>
      </ModalBody>
      <ModalFooter bg='greydark'>
        <Text fs='xxs'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
          <Text mx>or</Text>
        </Text>
        <Button
          onClick={() => save()}>Save</Button>
      </ModalFooter>
    </Modal>
  )

  function * save () {
    yield onEdit({
      discussion: !!discussion.value,
      hideOnTurnIn: !!hideOnTurnIn.value,
      textToSpeech: !!textToSpeech.value
    })
    yield closeModal()
  }
}

/**
 * Exports
 */

export default form(({activity}) => ({
  fields: ['discussion', 'hideOnTurnIn', 'textToSpeech'],
  defaults: {
    discussion: activity.discussion,
    hideOnTurnIn: activity.hideOnTurnIn,
    textToSpeech: activity.textToSpeech
  }
}))({
  render
})
