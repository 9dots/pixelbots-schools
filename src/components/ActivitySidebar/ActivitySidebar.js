/**
 * Imports
 */

import {questionIcon, totalPoints, totalScore, statusMap} from 'lib/activity-helpers'
import {Block as ContainerBlock, debounceAction} from 'vdux-containers'
import ActivityBadge from 'components/ActivityBadge'
import {Card, Block, Text, Icon} from 'vdux-ui'
import BlockInput from 'components/BlockInput'
import SidebarActions from './SidebarActions'
import Avatar from 'components/Avatar'
import {Input} from 'vdux-containers'
import Link from 'components/Link'
import element from 'vdux/element'
import summon from 'vdux-summon'
import moment from 'moment'

/**
 * <ActivitySidebar/>
 */

function render ({props}) {
  const {activity, showScores, canGrade, canSetMax, isStudent, isRedo} = props
  const {actor, publishedAt, at = {}, _object, status, published} = activity
  const isInstance = activity.shareType === 'shareInstance'
  let count = 0
  const questions = _object[0].attachments
    .filter(att => {
      if(att.objectType === 'question') {
        count = att.response.length ? count + 1 : count
        return true
      }
    })

  const {descriptor} = activity.contexts[0]
  const classId = descriptor.id
  const score = showScores ? totalScore(activity) : '-'

  return (
    <Block mt>
      <Card mb relative>
        <Block p align='start center'>
          <Avatar mr actor={actor} size={60} />
          <Block column align='start' fs='xs'>
            <Link
              hoverProps={{textDecoration: 'underline'}}
              href={`/${actor.username}`}
              mb='xs'>
              {actor.displayName}
            </Link>
            <Text my='xs' hide={classId === 'public' || isInstance || !published} color='blue'>
              {descriptor.displayName}
            </Text>
            <Text fs='12px' color='grey_medium' align='start center' hide={isInstance || !published}>
              <Icon fs='xs' name='schedule' mr='xs' />
              { moment(publishedAt || at.turnedIn).fromNow() }
            </Text>
            <Text hide={!isInstance || (activity.status < statusMap.turnedIn)} color='grey_medium' fs='12px'>
              {moment(at.turnedIn).format('M/D/YY LT')}
            </Text>
          </Block>
        </Block>
        <ActivityBadge hide={!isInstance} status={status} userType={isStudent ? 'student' : 'teacher'} text={false} absolute top right />
      </Card>
      <Card hide={!questions.length}>
        <Block p fs='l' borderBottom='1px solid grey_light' fw='lighter' align='center center' ellipsis boxShadow='0 1px 1px rgba(75,82,87,0.08)' relative z='2'>
          {score} / {totalPoints(activity)}
        </Block>
        <Block maxHeight='calc(100vh - 347px)' overflow='auto' borderBottom='1px solid grey_light'>
          {
            questions.map((q, i) => <ScoreRow
              num={i + 1}
              question={q}
              isRedo={isRedo}
              activity={activity}
              canGrade={canGrade}
              isStudent={isStudent}
              canSetMax={canSetMax}
              showScore={showScores} />)
          }
        </Block>
        <Block p boxShadow='0 -2px 1px rgba(75,82,87,0.08)' relative z='2'>
          {
            isInstance &&
              <SidebarActions
                questions={questions}
                count={count}
                activity={activity}
                isStudent={isStudent} />
          }
        </Block>
      </Card>
    </Block>
  )
}

const ScoreRow = summon(({activity, question}) => ({
  setPoints: scaled => ({
    settingPoints: {
      url: `/instance/${activity._id}/score/${question._id}`,
      invalidates: `/instance/${activity._id}`,
      method: 'PUT',
      body: {
        scaled
      }
    }
  }),
  setMax: max => ({
    settingMax: {
      url: `/share/${activity._id}/max_points/${question._id}`,
      invalidates: `/share/${activity._id}`,
      method: 'PUT',
      body: {
        max
      }
    }
  })
}))({
  initialState ({props}) {
    return {
      debouncedSetPoints: debounceAction(props.setPoints, 500),
      debouncedSetMax: debounceAction(props.setMax, 500)
    }
  },

  render ({props, state}) {
    const {
      question, showScore, canGrade, isRedo,
      canSetMax, num, activity, isStudent
    } = props
    const {debouncedSetPoints, debouncedSetMax} = state
    const {points} = question
    const {scaled, max} = points
    const curPoints = scaled === undefined || !showScore
      ? undefined
      : max * scaled


    const color = getColor(activity, question, canGrade, isStudent, isRedo)
    const inputProps = {
      m: 0,
      onFocus: e => e.target.select(),
      inputProps: {
        textAlign: 'center',
        borderWidth: 0,
        bg: 'transparent',
        type: 'number'
      }
    }

    return (
      <ContainerBlock
        focusProps={{borderLeftColor: 'blue', bg: 'off_white'}}
        tag='label'
        borderLeft='3px solid transparent'
        align='space-between center'
        p='6px 12px 6px 9px'
        relative
        color='grey_medium'
        tabindex='-1'
        fw='lighter'
        fs='s'>
        <Block w='calc(100% + 3px)' hide={num == 1} absolute left='-3' top borderTop='1px solid grey_light'/>
        <Text align='start center' color={color}>
          {num}. <Icon pl='s' fs='xs' name={questionIcon(question)} />
        </Text>
        <Block
          border={'1px solid transparent'}
          borderColor={canGrade ? 'grey_light' : 'transparent'}
          bg={canGrade ? 'white' : 'transparent'}
          align='start center'
          hide={question.poll}
          key={activity.id}
          w='50%'>
          <Input
            {...inputProps}
            onInput={setPoints}
            disabled={!canGrade}
            color={canGrade ? 'text' : 'grey_medium'}
            defaultValue={curPoints}
            placeholder={canGrade ? curPoints : '-'} />
          <Text bgColor='transparent' color='black'>/</Text>
          <Input
            {...inputProps}
            onInput={setMax}
            disabled={!canSetMax}
            color={canSetMax ? 'text' : 'grey_medium'}
            defaultValue={max} />
        </Block>
      </ContainerBlock>
    )

    function * setPoints (e) {
      const points = Number(e.target.value)
      if (isNaN(points)) return
      yield debouncedSetPoints(points / max)
    }

    function * setMax (e) {
      const max = Number(e.target.value)

      console.log('max', max)
      if (isNaN(max)) return
      if (max === 0) {
        e.target.setCustomValidity('Must not be 0')
        return
      }

      e.target.setCustomValidity('')
      yield debouncedSetMax(max)
    }
  }
})

/**
 * Helpers
 */

function getColor (activity, question, canGrade, isStudent, isRedo) {
  const {status} = activity
  const {points, poll, response} = question

  if(canGrade) {
    return poll
      ? 'grey_medium'
      : points.scaled !== undefined ? 'green' : 'yellow'
  } else if(isStudent) {
    if(status === statusMap.turnedIn || status === statusMap.graded) {
      return 'grey_medium'
    } else if (isRedo || status === statusMap.returned) {
      if(poll) return 'grey_medium'

      if(!points.scaled || points.scaled < .6)
        return 'red'
      else if(points.scaled < 1)
        return 'yellow'

      return 'green'
    } else {
      return response.length ? 'green' : 'yellow'
    }
  }
}

/**
 * Exports
 */

export default {
  render
}
