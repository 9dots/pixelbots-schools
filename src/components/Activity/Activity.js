/**
 * Imports
 */

import {getOverviewQuestions, statusMap, totalScore, totalPoints} from 'lib/activity-helpers'
import ActivityObject from 'components/ActivityObject'
import ActivityHeader from 'components/ActivityHeader'
import {component, element} from 'vdux'
import {Block, Text} from 'vdux-ui'

/**
 * <Activity/>
 */

export default component({
  render ({props, state, context}) {
    const {activity, clickableTags, ...rest} = props
    const isInstance = activity.shareType === 'shareInstance'
    const showPollResults = activity.status >= statusMap.turnedIn
    const rootId = activity._root && activity._root[0] ? activity._root[0].id : activity._id

    return (
      <Block>
        {
          isInstance &&
          <Block fs='m' px='l' hide printProps={{display: 'block'}}>
            <Text bold>
              {activity.actor.displayName}
            </Text>
            <Text ml italic>
              Score:&nbsp;
              {totalScore(activity)} / {totalPoints(activity)}
            </Text>
          </Block>
        }
        <ActivityHeader activity={activity} clickableTags={clickableTags} />
        <ActivityObject
          {...rest}
          rootId={rootId}
          actor={activity.actor}
          activityId={activity._id}
          object={activity._object[0]}
          showPollResults={showPollResults}
          speechEnabled={activity.textToSpeech} />
      </Block>
    )
  }
})
