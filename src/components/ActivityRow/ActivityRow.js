/**
 * Imports
 */

import {Flex, Block, Card, Text, Image} from 'vdux-ui'
import resize from 'lib/resize-image'
import Figure from 'components/Figure'
import element from 'vdux/element'
import Meta from './Meta'

/**
 * Activity Tile
 */

function render ({props}) {
  const {activity} = props
  const {image, displayName, description} = activity
  const url = image && image.url ? resize(image.url, 350) : false

  return (
    <Card h={132} wide mt={0} borderBottom='rgba(52, 52, 52, 0.08)'>
      <Flex tall align='start center'>
        <Flex p='m' tall column align='space-between' flex='50%'>
          <Block fs='s' fw='200'>{displayName}</Block>
          <Block fs='xs' lh='20px' maxHeight='40px' overflow='hidden' fw='200' color='midgray'>{description}</Block>
          <Meta activity={activity} />
        </Flex>
        <Block flex='20%' hide={!url} my='m' h='108px' boxShadow='card' overflow='hidden' rounded relative
          backgroundImage={image && `url(${url})`}
          backgroundSize='cover'
          backgroundPosition='center center'/>
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