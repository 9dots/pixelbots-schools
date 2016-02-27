/**
 * Imports
 */

import {xx_small, mrg_right, ellipsis, bold, link} from 'lib/styles'
import CommoncoreBadge from 'components/commoncore-badge'
import {row, column, align, flex} from 'lib/layout'
import Avatar from 'components/avatar'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Meta bar
 */

function render ({props}) {
  const {actor, tags} = props

  return (
    <div class={[row, align.start_center, meta, xx_small]}>
      <Avatar class={mrg_right} actor={actor} />
      <div class={[flex, ellipsis, align.stretch, column]}>
        <div class={[column, align.spaceAround]}>
          <span class={[bold, link]}>{actor.displayName}</span>
          <span>{tags}</span>
        </div>
      </div>
      <CommoncoreBadge />
    </div>
  )
}

/**
 * Styles
 */

const {meta} = css({
  meta: {
    margin: '12px 0 0',
    borderTop: '1px solid rgba(0, 0, 0, 0.04)',
    padding: '6px 12px',
    background: '#FCFCFC'
  }
})

/**
 * Exports
 */

export default {
  render
}
