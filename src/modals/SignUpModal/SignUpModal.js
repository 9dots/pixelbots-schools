/**
 * Imports
 */

import {Modal, ModalHeader, Flex, Box, Text, Block} from 'vdux-ui'
import {setUrl} from 'redux-effects-location'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
import HomeOwl from 'components/HomeOwl'
import Link from 'components/Link'
import element from 'vdux/element'

/**
 * <SignUpModal/>
 */

function render ({props}) {
  const btnProps = {
    pill: true,
    my: 's',
    wide: true,
    border: '1px solid rgba(black, .1)'
  }

  return (
    <Modal onDismiss={closeModal} pb='l' relative>
      <Button icon='cancel' color='text' fs='s' absolute right top m='s' pointer onClick={closeModal} />
      <ModalHeader w='col_s' m='auto'>
        Sign Up Today To Get Free Access To All Of Weo!
      </ModalHeader>
      <HomeOwl width={100} link={false} mx='auto' mb />
      <Flex align='center center' wide>
        <Box flex='35%' mx='s'>
          <Button {...btnProps} bgColor='green' onClick={e => setUrl('/teacher')}>
            <Text lh='47px' fs='14px' fw='bolder'>
              Teachers, Sign Up
            </Text>
          </Button>
        </Box>
        <Box flex='35%' mx='s'>
          <Button {...btnProps} onClick={e => setUrl('/student')}>
            <Text lh='47px' fs='14px' fw='bolder'>
              Students, Join Class
            </Text>
          </Button>
        </Box>
      </Flex>
      <Block textAlign='center' p m>
        <Link href='/login' hoverProps={{underline: true}} >Already have an account? Login here</Link>
      </Block>
    </Modal>
  )
}

/**
 * Exports
 */

export default {
  render
}
