/**
 * Imports
 */

import {row, column, align} from 'lib/layout'
import reduce from '@f/reduce-array'
import element from 'vdux/element'
import css from 'jss-simple'
import map from '@f/map'

/**
 * Grid component
 */

function render ({props, children}) {
  const {itemsPerColumn = 4} = props
  const columns = toColumns(children, itemsPerColumn)

  return (
    <div class={row}>
      {
        map(col =>
          <div class={[column, align.start_center]}>{col}</div>, columns)
      }
    </div>
  )
}

/**
 * Helpers
 */

function toColumns (items, n) {
  return reduce((memo, item, i) => {
    if (!memo[i % n]) memo.push([])
    memo[i % n].push(item)
    return memo
  }, [], items)
}

/**
 * Exports
 */

export default {
  render
}
