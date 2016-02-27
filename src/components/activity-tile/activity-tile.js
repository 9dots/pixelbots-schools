/**
 * Imports
 */

import {mrg_vert, mrg_right, xx_small, bold, link, ellipsis} from 'lib/styles'
import {column, row, align, flex} from 'lib/layout'
import Avatar from 'components/avatar'
import Figure from 'components/figure'
import Card from 'components/card'
import element from 'vdux/element'
import css from 'jss-simple'
import Meta from './meta'

/**
 * Activity Tile
 */

function render ({props}) {
  const {activity} = props
  const {actor, tags, commonCore, image, displayName, description} = activity

  return (
    <Card class={tile}>
      <div class={[column]}>
        <actions/>
        <div class={[thumb, mrg_vert]}>
          <Figure {...image} thumb={true} />
        </div>
        <div>
          <h2>{displayName}</h2>
          <p>{description}</p>
        </div>
        <Meta actor={actor} tags={tags} commonCore={commonCore} />
      </div>
    </Card>
  )
}

/**
 * Styles
 */

const {thumb, tile, meta} = css({
  tile: {
    width: 230,
    position: 'relative',
    margin: '8px 6px'
  },
  thumb: {
    maxHeight: 350
  }
})

/**
 * Exports
 */

export default {
  render
}
