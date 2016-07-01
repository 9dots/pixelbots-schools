/**
 * Imports
 */

import QuestionOverview from './QuestionOverview'
import summonChannels from 'lib/summon-channels'
import FourOhFour from 'pages/FourOhFour'
import Loading from 'pages/Loading'
import Histogram from './Histogram'
import {Block, Flex} from 'vdux-ui'
import element from 'vdux/element'
import getProp from '@f/get-prop'

/**
 * <ActivityOverview/>
 */

function render ({props}) {
  const {students, activity, activities} = props
  const {value, loading, error} = activities

  if (loading) return <Loading show={true} />
  if (error) return <FourOhFour />

  const instances = value.items
  const data = getData(activity, students)

  return (
    <Block w='col_main' mx='auto'>
      <Histogram data={data}/>
      <QuestionOverview instances={instances} {...props} />
    </Block>
  )
}

/**
 * Helpers
 */

function getData (activity, students) {
  const total = totalPoints(activity)
  const {instances: {total: {'0': {actors}}}} = activity
  let averagePoints = 0
  let averagePercent = 0
  let numReturned = 0
  let binMax = 0
  let bins = []

  for(var i = 0; i < 10; i++) {
    bins[i] = []
  }

  students.forEach(function(student) {
    const actor = actors[student._id]

    if (!actor) return

    const {pointsScaled = 0, status = 1} = actor
    const points = pointsScaled * total
    const percent = pointsScaled * 100


    const instance = {
      points: round(points),
      percent: round(percent) + '%',
      displayName: student.displayName
    }

    console.log('instance', instance, status)
    if(status >= 5) {
      numReturned++
      averagePoints += points
      averagePercent += percent
      const i = percentToIndex(percent)
      bins[i].push(instance)
      binMax = Math.max(bins[i].length, binMax)
    }
  })

  // Prevent division by zero
  numReturned = numReturned || 1

  return {
    averagePercent: round(averagePercent / numReturned) + '%',
    averagePoints: round(averagePoints / numReturned),
    numStudents: students.length,
    totalPoints: total,
    numReturned,
    binMax,
    bins
  }
}

function percentToIndex (percent) {
  return Math.max(Math.min(9, Math.floor(percent / 10)), 0)
}

function round (num) {
  return Math.round(num * 10) / 10
}

function totalPoints (activity) {
  if (!activity._object || !activity._object[0] || !activity._object[0].attachments) return

  return activity._object[0].attachments
    .reduce((total, att) => total +
      (att.objectType === 'question' && !att.poll
        ? att.points.max
        : 0), 0)
  }


/**
 * Exports
 */

export default summonChannels(
  props => `share!${props.activity._id}.instances`
)({
  render
})
