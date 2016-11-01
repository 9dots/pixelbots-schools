/**
 * Imports
 */

import ActivityDropdownMenu from 'components/ActivityDropdownMenu'
import ActivityCardActions from 'components/ActivityCardActions'
import {Flex, Block, Card, Text, Image} from 'vdux-ui'
import {wrap, CSSContainer} from 'vdux-containers'
import {component, element} from 'vdux'
import Figure from 'components/Figure'
import resize from 'lib/resize-image'
import BgImg from 'components/BgImg'
import Meta from './Meta'

/**
 * <ActivityRow/>
 */

export default wrap(CSSContainer, {
  hoverProps: {hover: true}
})(component({
  render ({props, context, actions}) {
    const {
      hover, activity, metaUi: MetaUi = Meta, ddMenu,
      badgeUi: BadgeUi = Badge, currentUser, options
    } = props
    const {image, displayName, description, _id: id} = activity

    return (
      <Card h={132} wide mt={0} borderBottom='rgba(52, 52, 52, 0.08)' cursor='pointer' onClick={context.setUrl(`/activity/${id}`)}>
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
          <Flex column flex='28%' pl align='space-between' tall>
            {
              props.badgeUi &&
                <Flex flex align='end start'>
                  <BadgeUi activity={activity} currentUser={currentUser} />
                </Flex>
            }
            {
              options && hover &&
                <Flex align='end center'>
                  <ActivityCardActions {...options} align='end center' wide activity={activity} user={currentUser} />
                  {
                    ddMenu &&
                      <Block mr ml='-6' onClick={actions.stopPropagation}>
                        <ActivityDropdownMenu activity={activity} />
                      </Block>
                  }
                </Flex>
            }
          </Flex>
        </Flex>
      </Card>
    )
  },

  events: {
    stopPropagation (model, e) {
      e.stopPropagation()
    }
  }
}))

/**
 * <Badge/>
 */

function Badge () {
  return <span/>
}
