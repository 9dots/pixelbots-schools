/**
 * Imports
 */

import applyClasses from '@f/apply-classes'
import {openModal, closeModal} from 'reducer/modal'

/**
 * Apply classes to the body when modals are opened
 */

function middleware () {
  return next => action => {
    switch (action.type) {
      case openModal.type:
        applyClasses({modal: true}, document.body)
        break
      case closeModal.type:
        applyClasses({modal: false}, document.body)
        break
    }

    return next(action)
  }
}

/**
 * Exports
 */

export default middleware
