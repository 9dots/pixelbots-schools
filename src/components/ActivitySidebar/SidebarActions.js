/**
 * Imports
 */

import {Button, Dropdown, MenuItem} from 'vdux-containers'
import {statusMap} from 'lib/activity-helpers'
import {Block, Text, Icon} from 'vdux-ui'
import RedoModal from 'modals/RedoModal'
import {openModal} from 'reducer/modal'
import Confirm from 'modals/Confirm'
import element from 'vdux/element'
import summon from 'vdux-summon'

/**
 * Render
 */

function render ({props}) {
  const {
    questions, count, isStudent,
    setStatus, settingStatus = {}, activity
  } = props
  const {status} = activity
  const {loading} = settingStatus
  const canTurnIn = count === questions.length

  return (
    <Block>
      <Block hide={!isStudent || status >= statusMap.turnedIn}>
        <Block wide bgColor='grey_medium' align='center center' relative p={0} overflow='hidden' opacity='.5' rounded hide={canTurnIn} h={32} >
          <Block
            w={count / questions.length * 100 + '%'}
            absolute={{top: 0, left: 0}}
            transition='width .6s ease'
            bg='blue'
            tall/>
          <Text relative z='2' color='white'>Progress: {count} of {questions.length}</Text>
        </Block>
        <Button
          hide={!canTurnIn}
          h={32}
          wide
          onClick={() => openModal(() =>
            <ConfirmTurnIn
              message='You will not be able to change answers afterwards.'
              header='Turn In Now?'
              activity={activity} />)}>
          Turn In
        </Button>
      </Block>
      <Block align='start space-between' hide={isStudent}>
        <Button flex onClick={() => setStatus('returned')} disabled={status >= statusMap.returned || loading} busy={loading}>
          Return
        </Button>
        <Dropdown disabled={loading} btn={<Btn disabled={loading} />} w={120}>
          <MenuItem align='start center' onClick={() => openModal(() => <RedoModal instanceIds={activity._id} />)}>
            <Icon name='redo' mr fs='xs' />
            Redo
          </MenuItem>
          <MenuItem align='start center' onClick={() => setStatus('turned_in')}>
            <Icon name='file_download' mr fs='xs'/>
            Collect
          </MenuItem>
        </Dropdown>
      </Block>
    </Block>
  )
}

const ConfirmTurnIn = summon(({activity}) => ({
  onAccept: () => ({
    accepting: {
      url: `/instance/${activity._id}/turned_in`,
      invalidates: [
        `/share/${activity._root[0].id}/`,
        `/share/${activity._root[0].id}/instance/${activity.actor.id}`
      ],
      method: 'PUT'
    }
  })
}))(Confirm)

function Btn({props}) {
  return (
    <Button
      activeProps={{bgColor: 'rgba(black, .1)'}}
      icon='more_vert'
      bgColor='white'
      color='text'
      circle='32'
      fs='m'
      ml
      {...props}/>
  )
}

/**
 * Export
 */

export default summon(({activity}) => ({
  setStatus: status => ({
    settingStatus: {
      url: `/instance/${activity._id}/${status}`,
      method: 'PUT'
    }
  })
}))({
  render
})
