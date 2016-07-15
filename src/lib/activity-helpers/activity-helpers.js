/**
 * Imports
 */

import getProp from '@f/get-prop'

/**
 * Activity Helpers
 */

function questionIcon (question) {
  if (question.poll) return 'equalizer'

  switch (question.attachments[0].objectType) {
    case 'choice':
      return 'done_all'
    case 'shortAnswer':
      return 'edit'
    case 'text':
      return 'message'
  }

  return 'help'
}

function totalPoints (activity) {
  if (!activity._object || !activity._object[0] || !activity._object[0].attachments) return

  return activity._object[0].attachments
    .reduce((total, att) => total +
      (att.objectType === 'question' && !att.poll
        ? att.points.max
        : 0), 0)
}

function totalScore (activity) {
  if (!activity._object || !activity._object[0] || !activity._object[0].attachments) return

  return activity._object[0].attachments
    .reduce((total, {objectType, poll, points}) => total +
      (objectType === 'question' && !poll && points.scaled
          ? points.scaled * points.max
          : 0), 0)
}

function activitySort (sort) {
  return (a, b) => {
    if(!sort) return
    const prop = sort.property
    const prop1 = getProp(prop, a).toString().toUpperCase() || ''
    const prop2 = getProp(prop, b).toString().toUpperCase() || ''

    return prop1 > prop2 ? 1 * sort.dir : -1 * sort.dir
  }
}

const statusMap = {
  unopened: 1,
  opened: 2,
  turnedIn: 3,
  graded: 4,
  returned: 5
}


/**
 * Exports
 */

export {
  activitySort,
  questionIcon,
  totalPoints,
  totalScore,
  statusMap
}
