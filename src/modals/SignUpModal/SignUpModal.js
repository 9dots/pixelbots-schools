/**
 * Imports
 */

import {Modal, Flex, Box, Text} from 'vdux-ui'
import {setUrl} from 'redux-effects-location'
import {closeModal} from 'reducer/modal'
import {Button} from 'vdux-containers'
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
    boxShadow: 'z3'
  }

  return (
    <Modal onDismiss={closeModal}>
      <Flex align='center center' my='m' mx='s' pt='m' wide>
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
      <Link href='/login'>Already have an account? Login here</Link>
    </Modal>
  )
}

/**
 * Exports
 */

export default {
  render
}
