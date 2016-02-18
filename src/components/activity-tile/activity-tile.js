/**
 * Imports
 */

import {mrg_vert, xx_small} from 'lib/styles'
import {column, row} from 'lib/layout'
import Avatar from 'components/avatar'
import Figure from 'components/figure'
import Card from 'components/card'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Activity Tile
 */

function render ({props}) {
  const {activity} = props

  return (
    <Card class={tile}>
      <div class={[column]}>
        <actions/>
        <div class={[image, mrg_vert]}>
          <Figure {...activity.image} />
        </div>
        <div>
          <h2>{activity.displayName}</h2>
          <p>{activity.description}</p>
        </div>
        <div class={[row, meta, xx_small]}>
          <Avatar actor={activity.actor} />
          <div class={[column]}>
            <span>{activity.actor.displayName}</span>
            <span>{activity.tags}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

/**
 * Styles
 */

const {image, tile, meta} = css({
  tile: {
    width: 230,
    position: 'relative',
    margin: '8px 6px'
  },
  image: {
    maxHeight: 350
  },
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
