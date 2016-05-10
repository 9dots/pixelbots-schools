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
  const offset = '-9999px'
  const url = image && image.url ? image.url : false
  const isWide = image && parseInt(image.width, 10) > parseInt(image.height, 10)

  return (
    <Card h={132} wide mt={0} borderBottom='rgba(52, 52, 52, 0.08)'>
      <Flex tall align='start center'>
        <Flex p='m' tall column align='space-between' fw='300' flex='50%'>
          <Block fs='s'>{displayName}</Block>
          <Block fs='xs'>{description}</Block>
          <Meta activity={activity} />
        </Flex>
        <Block flex='20%' my='m' h='108px' boxShadow='card' overflow='hidden' rounded relative hide={!url}>
          <Image src={url && resize(url, 350)} absolute m='auto' h={isWide ? '100%' : 'auto'} w={isWide ? 'auto' : '100%'}
            top={offset} left={offset} right={offset} bottom={offset} />
        </Block>
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
