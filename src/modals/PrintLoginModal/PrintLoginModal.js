/**
 * Imports
 */

import {Modal, Block, Icon, Text} from 'vdux-ui'
import {component, element} from 'vdux'
import {Button, Image} from 'vdux-containers'
import {apple, bat, bea, butterfly, camel,
  cupcake, dino, don, elephant, gorilla,
  kitty, lotus, monster, narwhal, octopus,
  penguin, pop, potato, rabbit, ramen,
  redpanda, remy, rhino, tiger, whale, yellow} from '../AvatarPickerModal/avatars/index.js'

const animalImages= {"apple": apple, "bat": bat, "bea": bea, "butterfly": butterfly, "camel": camel,
"cupcake": cupcake, "dino": dino, "don": don, "elephant": elephant, "gorilla": gorilla,
"kitty": kitty, "lotus": lotus, "monster": monster, "narwhal": narwhal, "octopus": octopus,
"penguin": penguin, "pop": pop, "potato": potato, "rabbit": rabbit, "ramen": ramen,
"redpanda": redpanda, "remy": remy, "rhino": rhino, "tiger": tiger, "whale":whale, "yellow": yellow }

/**
 * Constants
 */

const overlayPrint = {
  overflow: 'visible',
  w: '100%',
  h: 'auto',
  position: 'relative'
}

/**
 * <PrintLoginModal/>
 */

export default component({
  render ({props, actions, context}) {
    const {users} = props

    return (
      <Modal mt='0' w='800px' onDismiss={context.closeModal} pb='s' overlayProps={{printProps: overlayPrint}} printProps={{w: '100%', h: 'auto'}} relative>
        <Block p bg='grey' align='space-between' printProps={{display: 'none'}}>
          <Button bgColor='off_white' color='text' onClick={context.closeModal}>
            Cancel
          </Button>
          <Button onClick={actions.print}>
            <Icon name='print' fs='s' mr='s' /> Print
          </Button>
        </Block>
        {
            users.map((u, i) => <InfoBlock last={users.length === i + 1} user={u} />)
          }
      </Modal>
    )
  },

  controller: {
    print () {
      window.print()
    }
  }
})

/**
 * <InfoBlock/>
 */

function InfoBlock ({props}) {
  const {user, last} = props
  return (
    <Block borderBottom={!last && '1px dashed grey_medium'} p='l' pageBreakInside='avoid' relative>
      <Block border='1px solid grey_medium' align='start center' borderRadius='10'>
        <Block fs='l' color='blue' flex='35%' maxWidth='35%' overflow='hidden' textAlign='center'>
          {user.displayName}
        </Block>
        <Block tag='ol' fs='s' flex='50%'>
          <Block align='start center' mt='s'>
              <Text bold flex='40%'>username:</Text>
              <Text fontFamily='monospace'>{user.username}</Text>
          </Block>
          <Block align='start right'>
            <Text bold flex='40%'> password: </Text>
            <Image h='100px' w='100px' src={animalImages[user.pictureName]} />
          </Block>
        </Block>
      </Block>
    </Block>
  )
}
