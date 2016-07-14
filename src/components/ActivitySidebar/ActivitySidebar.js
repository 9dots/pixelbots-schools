/**
 * Imports
 */

import {questionIcon, totalPoints, totalScore} from 'lib/activity-helpers'
import {Block as ContainerBlock, debounceAction} from 'vdux-containers'
import {Card, Block, Text, Icon} from 'vdux-ui'
import BlockInput from 'components/BlockInput'
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
  const {activity, showScores, canGrade, canSetMax} = props
  const {actor, publishedAt, at = {}, _object} = activity
  const questions = _object[0].attachments
    .filter(att => att.objectType === 'question')

  const {descriptor} = activity.contexts[0]
  const classId = descriptor.id
  const score = showScores ? totalScore(activity) : '--'

  return (
    <Block mt>
      <Card mb align='start center'>
        <Avatar m actor={actor} size={66} border='2px solid white' boxShadow='card' />
        <Block column align='start' fs='xs'>
          <Link href={`/${actor.username}`} bold hoverProps={{textDecoration: 'underline'}}>{actor.displayName}</Link>
          <Text p='xs' hide={classId === 'public'} color='blue'>
            {descriptor.displayName}
          </Text>
          <Text fs='xxs' color='grey_medium' align='start center'>
            <Icon fs='14px' name='schedule' />
            {moment(publishedAt || at.turnedIn).fromNow()}
          </Text>
        </Block>
      </Card>
      <Card hide={!questions.length}>
        <Block p fs='l' borderBottom='1px solid grey_light' fw='lighter' align='center center' boxShadow='0 2px 1px rgba(75,82,87,0.1)'>
          {score} / {totalPoints(activity)}
        </Block>
        <Block maxHeight='calc(100vh - 300px)' overflow='auto' borderBottom='1px solid grey_light'>
          {
            questions.map((q, i) => <ScoreRow
              num={i + 1}
              question={q}
              activity={activity}
              canGrade={canGrade}
              canSetMax={canSetMax}
              showScore={showScores} />)
          }
        </Block>
        <Block pb boxShadow='0 -2px 1px rgba(75,82,87,0.1)'/>
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
    const {question, showScore, canGrade, canSetMax, num} = props
    const {debouncedSetPoints, debouncedSetMax} = state
    const {points} = question
    const {scaled, max} = points
    const curPoints = scaled === undefined || !showScore
      ? undefined
      : max * scaled

    return (
      <ContainerBlock
        tabindex='-1'
        focusProps={{bgColor: 'grey_light'}}
        fw='lighter'
        px
        py='8'
        color='grey_medium'
        fs='s'
        align='space-between center'
        borderTop={num > 1 && '1px solid grey_light'}>
        <Text align='start center'>
          {num}. <Icon pl='s' fs='xs' name={questionIcon(question)} />
        </Text>
        <Block bgColor='white' align='start center' hide={question.poll}>
          <Input
            w={20}
            onInput={setPoints}
            bgColor='transparent'
            inputProps={{borderWidth: 0}}
            disabled={!canGrade}
            defaultValue={curPoints}
            placeholder={canGrade ? curPoints : '--'} />
          <Text bgColor='transparent' color='black'>/</Text>
          <Input
            w={20}
            bgColor='transparent'
            onInput={setMax}
            inputProps={{borderWidth: 0}}
            disabled={!canSetMax}
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
      if (isNaN(max)) return
      if (max === 0) {
        e.target.setCustomValidity('Must not be 0')
        return
      }

      e.target.setCustomValidity()
      yield debouncedSetMax(max)
    }
  }
})

/**
 * Exports
 */

export default {
  render
}