/**
 * Imports
 */

import Loading from 'components/Loading'
import Document from 'vdux/document'
import element from 'vdux/element'

/**
 * <InfiniteScroll/>
 */

function render ({props, children}) {
  const {more, threshold = 0, loading} = props

  return (
    <div>
      {children}
      <Loading show={loading} h='200' />
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
