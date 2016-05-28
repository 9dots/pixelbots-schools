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
 * <ActivityRow/>
 */

function render ({props}) {
  const {activity, metaUi: MetaUi = Meta, badgeUi: BadgeUi = Badge, currentUser} = props
  const {image, displayName, description, _id: id} = activity
  const imageUrl = image && image.url ? resize(image.url, 350) : false
  const url = `/activity/${id}/public/preview`

  return (
    <Card h={132} wide mt={0} borderBottom='rgba(52, 52, 52, 0.08)' cursor='zoom-in' onClick={() => setUrl(url)}>
      <Flex tall align='start start'>
        <Flex p='m' tall column align='space-between' flex='50%'>
          <Block fs='s' fw='200'>{displayName}</Block>
          <Block fs='xs' lh='20px' maxHeight='40px' overflow='hidden' fw='200' color='midgray'>{description}</Block>
          <MetaUi activity={activity} currentUser={currentUser} />
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
          <Flex flex align='end start'>
            <BadgeUi activity={activity} currentUser={currentUser} />
          </Flex>
      </Flex>
    </Card>
  )
}

function Badge () { return <span/> }

/**
 * Exports
 */

export default {
  render
}
