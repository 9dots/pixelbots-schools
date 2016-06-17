/**
 * Imports
 */

import {Modal, Block, Icon, Text} from 'vdux-ui'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import element from 'vdux/element'

/**
 * <PrintLoginModal/>
 */

function render ({props}) {
  const {user} = props
  return (
    <Modal mt='0' w='800px' onDismiss={closeModal} pb='s'>
      <Block p bg='grey' align='space-between' printProps={{display: 'none'}}>
        <Button bgColor='off_white' color='text' onClick={closeModal}>
          Cancel
        </Button>
        <Button onClick={() => window.print()}>
          <Icon name='print' fs='s' mr='s'/> Print
        </Button>
      </Block>
        {
          user.map((u, i) => <InfoBlock last={user.length === i + 1} user={u}/>)
        }
    </Modal>
  )
}

function InfoBlock ({props}) {
  const {user, last} = props
  return (
    <Block borderBottom={!last && '1px dashed grey_medium'} p pageBreakInside='avoid'>
      <Block border='1px solid grey_medium' align='start center' borderRadius='10'>
        <Block fs='l' color='blue' flex='35%' textAlign='center'>
          {user.displayName}
        </Block>
        <Block tag='ol' fs='s' flex='50%'>
          <Block tag='li' mb='s'>
            Go to <Text color='blue'>weo.io/login</Text>
          </Block>
          <Block tag='li'>
            Log in with the following info:
            <Block align='start center' mt='s'>
              <Text bold flex='40%'>username:</Text>
              <Text fontFamily='monospace'>{user.username}</Text>
            </Block>
            <Block align='start center'>
              <Text bold flex='40%'>password:</Text>
              <Text fontFamily='monospace'>{user.tmpPassword || '<Your Password>'}</Text>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default {
  render
}
