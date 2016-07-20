/**
 * ObjectID middleware
 */

function middleware () {
  // XXX: Hack
  // Import this here so that the action creator can be
  // required on the server
  const ObjectId = require('objectid-browser')

  return next => action => {
    return action.type === 'NEW_OBJECTID'
      ? (new ObjectId()).toString()
      : next(action)
  }
}

/**
 * New object id
 */

function generateObjectId () {
  return {
    type: 'NEW_OBJECTID'
  }
}

/**
 * Exports
 */

export default middleware
export {
  generateObjectId
}
