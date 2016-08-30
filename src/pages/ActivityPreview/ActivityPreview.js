/**
 * Imports
 */

import ActivitySidebar from 'components/ActivitySidebar'
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import ShareDropdown from './ShareDropdown'
import createAction from '@f/create-action'
import Activity from 'components/Activity'
import {Block, Card, Icon} from 'vdux-ui'
import WeoIcon from 'components/WeoIcon'
import element from 'vdux/element'

/**
 * <ActivityPreview/>
 */

function render ({props, local, state}) {
  const {activity, currentUser, setSpeaking, speechRate, speakingId, selectObject, selectedObject} = props
  const isTeacher = currentUser.userType === 'teacher'

  return (
    <Block align='center start'>
      <Block align='end start'>
        <Card w={756} mb='l' mr relative printProps={{mb: 0, boxShadow: '0 0 0'}}>
          <Block absolute right top m={8} align='start center' printProps={{hide: true}}>
            <ShareDropdown activity={activity} btn={() => <DDButton icon='share' mr='s'  />} />
            <PrintDropdown setPrintAns={local(setPrintAns)} />
          </Block>
          <Activity
            showAnswers={true}
            selectedObject={selectedObject}
            selectObject={selectObject}
            showAnswersOnPrint={state.printAnswers}
            clickableTags={isTeacher}
            activity={activity}
            setSpeaking={setSpeaking}
            speechRate={speechRate}
            speakingId={speakingId} />
        </Card>
        <Block w={200} relative fixed={{top: 53}} printProps={{hide: true}}>
          <ActivitySidebar activity={activity} currentUser={currentUser} selectObject={selectObject} selectedObject={selectedObject} />
        </Block>
        <Block printProps={{hide: true}} w={200}/>
      </Block>
    </Block>
  )
}

function DDButton({props}) {
  return(
    <Button
      activeProps={{bgColor: 'rgba(black, .15)'}}
      hoverProps={{bgColor: 'rgba(black, .1)'}}
      color='text'
      circle={30}
      fs='s'
      {...props}/>
  )
}

function PrintDropdown({props}) {
  const {setPrintAns} = props
  return (
    <Dropdown z={2} whiteSpace='nowrap' btn={<DDButton icon='print' />} >
      <MenuItem align='start center' onClick={() => print(true)}>
        <Icon name='visibility' fs='s' color='green' mr='s' /> Show Answers
      </MenuItem>
      <MenuItem align='start center' onClick={() => print(false)}>
        <Icon name='visibility_off' fs='s' color='red' mr='s' /> Hide Answers
      </MenuItem>
    </Dropdown>
  )

  function print(show) {
    setTimeout(() => window.print())
    return setPrintAns(show)
  }
}


/**
 * Actions
 */

const setPrintAns = createAction('<ActivityPreview/>: setPrintAns')

/**
 * Reducer
 */

const reducer = handleActions({
  [setPrintAns]: (state, printAnswers) => ({ ...state, printAnswers })
})

/**
 * Exports
 */

export default {
  render,
  reducer
}
