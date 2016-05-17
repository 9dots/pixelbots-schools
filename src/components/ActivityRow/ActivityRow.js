/**
 * Imports
 */

import {Flex, Block, Card, Text, Image} from 'vdux-ui'
import {setUrl} from 'redux-effects-location'
import Figure from 'components/Figure'
import resize from 'lib/resize-image'
import element from 'vdux/element'
import Meta from './Meta'

/**
 * Activity Tile
 */

function render ({props}) {
  const {activity} = props
  const {image, displayName, description, _id} = activity
  const imageUrl = image && image.url ? resize(image.url, 350) : false
  const url = `/activity/${_id}/public/preview`

  return (
    <Card h={132} wide mt={0} borderBottom='rgba(52, 52, 52, 0.08)' cursor='zoom-in' onClick={() => setUrl(url)}>
      <Flex tall align='start center'>
        <Flex p='m' tall column align='space-between' flex='50%'>
          <Block fs='s' fw='200'>{displayName}</Block>
          <Block fs='xs' lh='20px' maxHeight='40px' overflow='hidden' fw='200' color='midgray'>{description}</Block>
          <Meta activity={activity} />
        </Flex>
        <Block
          backgroundImage={image && `url(${imageUrl})`}
          backgroundPosition='center center'
          backgroundSize='cover'
          overflow='hidden'
          boxShadow='card'
          hide={!imageUrl}
          flex='20%'
          h='108px'
          relative
          rounded
          my='m' />
      </Flex>
    </Card>
  )
}

/**
 * Exports
 */

export default {
  render
}