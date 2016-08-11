/**
 * Imports
 */

import {Modal, ModalBody, ModalFooter, ModalHeader, Block, Text, Flex, Toast} from 'vdux-ui'
import ActivityTileModaled from 'components/ActivityTileModaled'
import {Button, Input, form} from 'vdux-containers'
import {toast, hideToast} from 'reducer/toast'
import {setUrl, back} from 'redux-effects-location'
import {closeModal} from 'reducer/modal'
import PinSelect from './PinSelect'
import Link from 'components/Link'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * <PinModal/>
 */

function render ({props}) {
  const {
    activity, fields, boards, redirect,
    createBoard, creatingBoard = {},
    pin, pinning = {},
    copyActivity, copying = {}
  } = props
  const {value, loaded} = boards

  const busy = creatingBoard.loading || copying.loading || pinning.loading

  if (!loaded) return <span/>

  return (
    <Modal onDismiss={closeModal} w='620' bgColor='grey_light'>
      <Flex>
        <Block flex align='center center' py px='l'>
          <ActivityTileModaled busy={busy} activity={activity} />
        </Block>
        <Flex column bg='white' flex boxShadow='-1px 0 1px 0 rgba(0,0,0,0.1)' relative minHeight='400px'>
          <ModalHeader fs='s' h='56px' lh='56px' p='0' bg='off_white' borderBottom='1px solid grey_light'>
            Select a Board to Pin to:
          </ModalHeader>
          <PinSelect boards={value.items} onSelect={doPin} createBoard={createBoard} busy={busy} absolute h='calc(100% - 56px)' wide />
        </Flex>
      </Flex>
      <ModalFooter m='0'>
        <Text fs='xxs' py='s'>
          <Text pointer underline onClick={closeModal}>cancel</Text>
        </Text>
      </ModalFooter>
    </Modal>
  )

  function * doPin (board) {
    const {displayName, originalDescription} = activity
    const model = {
      displayName: fields.displayName.value === undefined ? displayName : fields.displayName.value,
      originalDescription: fields.originalDescription.value === undefined ? originalDescription : fields.originalDescription.value
    }
    const url = `/activities/${board._id}`

    if (activity.published) {
      const copy = yield copyActivity(activity._id)
      yield pin(board._id, copy._id, model)
    } else {
      yield pin(board._id, activity._id, model)
    }

    yield closeModal()

    if(redirect) {
      yield history.state && history.state.canExit
        ? back()
        : setUrl(url)
    }

    yield toast(
      <Toast key='a'>
        <Block align='space-between center'>
          <Block>
            Pinned to <Link onClick={hideToast} href={url} color='blue'>{displayName}</Link>
          </Block>
          <Button onClick={[() => setUrl(url), hideToast]} bgColor='green'>Go to Board</Button>
        </Block>
      </Toast>
    )
  }
}

/**
 * Exports
 */

export default summon(() => ({
  boards: '/user/boards',
  createBoard: body => ({
    creatingBoard: {
      url: '/board/',
      method: 'POST',
      invalidates: ['/user/boards', '/user'],
      body
    }
  }),
  pin: (boardId, activityId, rest) => ({
    pinning: {
      url: `/share/${activityId}/pin/`,
      method: 'PUT',
      body: {
        to: [boardId],
        ...rest
      },
      invalidates: 'activity_feed'
    }
  }),
  copyActivity: activityId => ({
    copying: {
      url: `/share/${activityId}/copy`,
      method: 'POST'
    }
  })
}))(
  form(() => ({
    fields: ['originalDescription', 'displayName']
  }))({
  render
}))
