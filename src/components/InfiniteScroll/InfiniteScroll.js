/**
 * Imports
 */

import element from 'vdux/element'
import Document from 'vdux/document'

/**
 * <InfiniteScroll/>
 */

function render ({props, children}) {
  const {more, threshold = 0} = props

  return (
    <div>
      {children}
      <Document onScroll={handleScroll(more, threshold)} />
    </div>
  )
}

/**
 * Actions
 */

function handleScroll (more, threshold = 0) {
  return e => {
    if (delta() <= threshold) {
      return more()
    }
  }
}

function delta () {
  return document.body.scrollHeight - (document.body.scrollTop + window.innerHeight)
}

/**
 * Exports
 */

export default {
  render
}
