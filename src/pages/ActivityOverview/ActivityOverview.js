/**
 * Imports
 */

import Histogram from './Histogram'
import element from 'vdux/element'
import getProp from '@f/get-prop'
import {Block} from 'vdux-ui'

/**
 * <ActivityOverview/>
 */

function render ({props}) {
  const {students, activity} = props
  const data = getData(activity, students)


  return (
    <Block w='col_main' mx='auto'>
      <Histogram data={data}/>
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
  let bins = []
  for(var i = 0; i < 10; i++) {
    bins[i] = []
  }

  const instances = students.map(function(student) {
    const actor = actors[student._id]
    const {pointsScaled = 0, status = 1} = actor
    const points = pointsScaled * total
    const percent = pointsScaled * 100


    const instance = {
      points: round(points),
      percent: round(percent) + '%',
      displayName: student.displayName
    }

    if(status >= 5) {
      numReturned++
      averagePoints += points
      averagePercent += percent
      bins[percentToIndex(percent)].push(instance)
    }

    return instance
  })

  return {
    bins,
    numReturned,
    totalPoints: total,
    numStudents: students.length,
    averagePercent: round(averagePercent / numReturned) + '%',
    averagePoints: round(averagePoints / numReturned)
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

export default {
  render
}
