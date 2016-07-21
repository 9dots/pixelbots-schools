/**
 * Imports
 */

import ActivitySidebar from 'components/ActivitySidebar'
import summonChannels from 'lib/summon-channels'
import {statusMap} from 'lib/activity-helpers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import Activity from 'components/Activity'
import InstanceNav from './InstanceNav'
import {Button} from 'vdux-containers'
import {Block, Card} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ActivityInstance/>
 */


function render ({props, local, state}) {
  const {instance, currentUser, activities} = props
  const isTeacher = currentUser.userType === 'teacher'
  const isStudent = currentUser.userType === 'student'
  const isReturned = instance.status === statusMap.returned
  const isRedo = instance.at && instance.at.turnedIn && (instance.status === statusMap.opened)
  const commentsShown = state.commentsId

  const {loaded, error, value} = activities

  if(!loaded) return <span />
  const comments = value.items

  return (
    <Block align='center start'>
      <Card
        transform={`translate3d(-${commentsShown ? 50 : 0}px, 0, 0)`}
        printProps={{mb: 0, boxShadow: '0 0 0'}}
        transition='transform 0.35s'
        relative
        w={756}
        z={1}
        mb='l'>
        <PrintButton />
        <Activity
          showComments={local(showComments)}
          commentsId={state.commentsId}
          comments={comments}
          activity={instance}
          currentUser={currentUser}
          clickableTags={isTeacher}
          showIncorrect={isRedo || instance.status === statusMap.returned}
          showAnswers={isTeacher || instance.status === statusMap.returned}
          answerable={isStudent && instance.status <= statusMap.opened} />
      </Card>
      <Block
        printProps={{hide: true}}
        fixed={{top: 53}}
        transition='opacity 0.35s'
        opacity={commentsShown ?  0.07 : 1}
        pointerEvents={commentsShown ? 'none' : 'all'}
        w={200}
        ml>
        <ActivitySidebar
          canGrade={isTeacher && instance.status >= statusMap.turnedIn}
          canSetMax={false}
          isRedo={isRedo}
          isStudent={isStudent}
          showScores={isTeacher || isReturned}
          activity={instance} />
        {
          isTeacher && <InstanceNav {...props} />
        }
      </Block>
      <Block w={200} printProps={{hide: true}}/>
    </Block>
  )
}

/**
 * Actions
 */

const showComments = createAction('<ActivityInstance/>: showComments')

/**
 * Reducer
 */

const reducer = handleActions({
  [showComments]: (state, id) => ({...state, commentsId: id}),
})

/**
 * <PrintButton/>
 */

function PrintButton () {
  return (
    <Button
      activeProps={{bgColor: 'rgba(black, .15)'}}
      hoverProps={{bgColor: 'rgba(black, .1)'}}
      onClick={() => window.print()}
      absolute={{right: 6, top: 6}}
      printProps={{hide: true}}
      color='text'
      icon='print'
      circle={30}
      fs='s'/>
  )
}


/**
 * Exports
 */

export default summonChannels(
   ({instance}) => `share!${instance.id}.annotations`
)({
  render,
  reducer
})
