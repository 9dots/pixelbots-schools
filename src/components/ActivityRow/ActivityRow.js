/**
 * Imports
 */

import ActivityDropdownMenu from 'components/ActivityDropdownMenu'
import ActivityCardActions from 'components/ActivityCardActions'
import { wrap, CSSContainer, Button } from 'vdux-containers'
import { stopPropagation, component, element } from 'vdux'
import { Flex, Block, Card } from 'vdux-ui'
import WeoIcon from 'components/WeoIcon'
import BgImg from 'components/BgImg'
import Meta from './Meta'

/**
 * <ActivityRow/>
 */

export default wrap(CSSContainer, {
  hoverProps: { hover: true }
})(
  component({
    render ({ props, context, state, actions }) {
      const {
        activity,
        metaUi: MetaUi = Meta,
        ddMenu,
        badgeUi: BadgeUi = Badge,
        currentUser = {},
        options,
        showClass
      } = props
      const { image, displayName, description, pinned } = activity
      const { isUpdatingPin } = state

      return (
        <Card
          h={132}
          wide
          mt={0}
          borderBottom='rgba(52, 52, 52, 0.08)'
          cursor='pointer'
          onClick={context.setUrl(
            `/activity/${activity.groupId}/${activity.playlistRef}`
          )}>
          <Flex tall align='start start'>
            <Flex p='m' tall column align='space-between' flex='49%'>
              <Block fs='s' fw='200' ellipsis>
                {displayName}
              </Block>
              <Block
                fs='xs'
                lh='20px'
                maxHeight='40px'
                overflow='hidden'
                fw='200'
                color='text'>
                {description}
              </Block>
              <MetaUi
                activity={activity}
                currentUser={currentUser}
                showClass={showClass} />
            </Flex>
            <Block flex='22%' mr>
              {image &&
                image.url && (
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
                )}
            </Block>
            <Flex column flex='28%' pl align='space-between' tall>
              {props.badgeUi && (
                <Flex flex align='end start'>
                  <BadgeUi activity={activity} currentUser={currentUser} />
                </Flex>
              )}
              {
                // (hover || pinned) &&
                //   <Flex align='end center'>
                //     <Block onClick={stopPropagation}>
                //       <Button disabled={isUpdatingPin} m py='s' px hoverProps={{highlight: .01}} focusProps={{highlight: .02}} {...btnProps} onClick={actions.pin}>
                //         <WeoIcon name='pin' fs='21px' mb={-2} />
                //       </Button>
                //     </Block>
                //   </Flex>
              }
              {options && (
                <Flex column wide align='space-between end' tall mb='s'>
                  {
                    <Block hidden={!pinned} sq={60} relative>
                      <Block
                        sq={60}
                        border='30px solid transparent'
                        borderTopColor='red'
                        borderRightColor='red' />
                      <WeoIcon
                        name='pin'
                        color='white'
                        absolute
                        top
                        right
                        mt={8}
                        mr={5} />
                    </Block>
                  }
                  {ddMenu && (
                    <Block
                      mr
                      ml='-6'
                      onClick={stopPropagation}
                      disabled={isUpdatingPin}>
                      <ActivityDropdownMenu
                        pinAction={actions.pin}
                        deleteAction={actions.remove}
                        key={activity.key}
                        activity={activity} />
                    </Block>
                  )}
                </Flex>
              )}
            </Flex>
          </Flex>
        </Card>
      )
    },
    controller: {
      * pin ({ props, actions, context }) {
        const { activity } = props
        const { groupId, playlistRef, pinned, key } = activity

        yield actions.updatingPin(true)
        yield [
          context.fetch(process.env.API_SERVER + '/pinAssignment', {
            method: 'POST',
            headers: { 'CONTENT-TYPE': 'application/json' },
            body: JSON.stringify({ groupId, playlistRef, pinned })
          }),
          context.firebaseUpdate(`/feed/${groupId}/${key}`, {
            pinned: !pinned,
            inverseTimestamp: -Date.now()
          })
        ]
        yield actions.updatingPin(false)
      },
      * remove ({ props, actions, context }) {
        const { activity } = props
        const { groupId, pinned, key } = activity

        yield context.closeModal()
        if (pinned) yield actions.pin()
        yield context.firebaseSet(`/feed/${groupId}/${key}`, null)
      }
    },
    reducer: {
      updatingPin: (state, isUpdatingPin) => ({ isUpdatingPin })
    }
  })
)

/**
 * <Badge/>
 */

function Badge () {
  return <span />
}
