/**
 * Imports
 */

import ActivityCardActions from 'components/ActivityCardActions'
import {Flex, Block, Card, Text, Image} from 'vdux-ui'
import {wrap, CSSContainer} from 'vdux-containers'
import {setUrl} from 'redux-effects-location'
import Figure from 'components/Figure'
import resize from 'lib/resize-image'
import BgImg from 'components/BgImg'
import element from 'vdux/element'
import Meta from './Meta'

/**
 * <ActivityRow/>
 */

function render ({props}) {
  return (
    <Activity {...props} hoverProps={{hover: true}} />
  )
}

const Activity = wrap(CSSContainer)({
  render ({props}) {
    const {
      hover, activity, metaUi: MetaUi = Meta,
      badgeUi: BadgeUi = Badge, currentUser, actions = []
    } = props
    const {image, displayName, description, _id: id, published} = activity
    const url =  `/activity/${id}` + (published ? '/public/preview' :  '/edit')

    return (
      <Card h={132} wide mt={0} borderBottom='rgba(52, 52, 52, 0.08)' cursor='zoom-in' onClick={() => setUrl(url)}>
        <Flex tall align='start start'>
          <Flex p='m' tall column align='space-between' flex='50%'>
            <Block fs='s' fw='200'>{displayName}</Block>
            <Block fs='xs' lh='20px' maxHeight='40px' overflow='hidden' fw='200' color='text'>{description}</Block>
            <MetaUi activity={activity} currentUser={currentUser} />
          </Flex>
          <Block flex='22%' mr>
          {
            image && image.url &&
              <BgImg
                backgroundPosition='center center'
                img={image.url}
                thumb={350}
                backgroundSize='cover'
                overflow='hidden'
                boxShadow='card'
                wide
                h='108px'
                relative
                rounded
                my='m' />
          }
          </Block>
          <Flex flex align='end start'>
            {
              hover &&
                <ActivityCardActions actions={actions} align='end center' wide activity={activity} user={currentUser} assign spread={false} />
            }
            <BadgeUi activity={activity} currentUser={currentUser} />
          </Flex>
        </Flex>
      </Card>
    )
  }
})

function Badge () { return <span/> }

/**
 * Exports
 */

export default {
  render
}
