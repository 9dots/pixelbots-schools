/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text, Flex, Toast} from 'vdux-ui'
import ActivityTileModaled from 'components/ActivityTileModaled'
import {toast, hideToast} from 'reducer/toast'
import {setUrl} from 'redux-effects-location'
import {Button, Input} from 'vdux-containers'
import {closeModal} from 'reducer/modal'
import PinSelect from './PinSelect'
import Link from 'components/Link'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <PinModal/>
 */

function render ({props}) {
  const {activity, boards, createBoard, pin, copyActivity} = props
  const {value, loaded} = boards

  if (!loaded) return <span/>

  return (
    <Modal onDismiss={closeModal} w='620' bgColor='grey_light'>
      <Flex>
        <Block flex align='center center' py px='l'>
          <ActivityTileModaled activity={activity} />
        </Block>
        <Flex column bg='white' flex boxShadow='-1px 0 1px 0 rgba(0,0,0,0.1)' relative minHeight='400px'>
          <ModalHeader fs='s' h='56px' lh='56px' p='0' bg='off_white' borderBottom='1px solid grey_light'>
            Select a Board to Pin to:
          </ModalHeader>
          <PinSelect boards={value.items} onSelect={doPin} createBoard={createBoard} absolute h='calc(100% - 56px)' wide />
        </Flex>
      </Flex>
      <ModalFooter m='0'>
        <Text fs='xxs' py='s'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
        </Text>
      </ModalFooter>
    </Modal>
  )

  function *doPin ({_id, displayName}) {
    if (activity.published) {
      const copy = yield copyActivity(activity._id)
      yield pin(_id, copy._id)
    } else {
      yield pin(_id, activity._id)
    }

    yield closeModal()
    yield toast(
      <Toast key='a'>
        <Block align='space-between center'>
          <Block>
            Pinned to <Link onClick={hideToast} href={`/activities/${_id}`} color='blue'>{displayName}</Link>
          </Block>
          <Button onClick={[() => setUrl(`/activities/${_id}`), hideToast]} bgColor='green'>Go to Board</Button>
        </Block>
      </Toast>)
  }
}

/**
 * Exports
 */

export default summon(() => ({
  boards: '/user/boards',
  createBoard: body => ({
    newBoard: {
      url: '/board/',
      method: 'POST',
      invalidates: ['/user/boards', '/user'],
      body
    }
  }),
  pin: (boardId, activityId) => ({
    pinToBoard: {
      url: `/share/${activityId}/pin/`,
      method: 'PUT',
      body: {
        to: [boardId]
      }
    }
  }),
  copyActivity: activityId => ({
    copyingActivity: {
      url: `/share/${activityId}/copy`,
      method: 'POST'
    }
  })
}))({
  render
})
