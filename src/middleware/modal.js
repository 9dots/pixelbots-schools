/**
 * Imports
 */

import {openModal, closeModal} from 'reducer/modal'
import applyClasses from '@f/apply-classes'
import {urlDidUpdate} from 'reducer/url'

/**
 * Apply classes to the body when modals are opened
 */

function middleware ({dispatch, getState}) {
  return next => action => {
    switch (action.type) {
      case openModal.type:
        applyClasses({modal: true}, document.body)
        break
      case closeModal.type:
        applyClasses({modal: false}, document.body)
        break
      case urlDidUpdate.type:
        if (getState().app.modal) {
          dispatch(closeModal())
        }
        break
    }

    return next(action)
  }
}

/**
 * Exports
 */

export default middleware
