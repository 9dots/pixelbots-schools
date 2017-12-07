/**
 * Imports
 */

import { stopPropagation, component, element } from 'vdux'
import { Modal, ModalFooter, Block } from 'vdux-ui'
import BlockInput from 'components/BlockInput'
import { Button } from 'vdux-containers'
import Form from 'vdux-form'

/**
 * <MediaModal/>
 */

export default component({
  render ({ props, context, actions, state }) {
    return (
      <Modal onDismiss={context.closeModal} w='col_xl'>
        <Block p='l' h={275} align='stretch'>
          <Block column align='center center' wide>
            <Block mb='l' fs='s' lighter>
              Paste your link below.
            </Block>
            <MediaInput
              busy={state.busy}
              mb={40}
              {...props}
              onSubmit={actions.onSubmit} />
          </Block>
        </Block>
        <ModalFooter mt={0} bg='grey'>
          <Button
            bgColor='white'
            color='text'
            hoverProps={{ highlight: 0.03 }}
            focusProps={{ highlight: 0.03 }}
            onClick={context.closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  },

  controller: {
    * onSubmit ({ props, actions, context }, ...args) {
      yield [props.onAccept(...args), actions.setBusy()]
      yield context.closeModal()
    }
  },
  reducer: {
    setBusy: () => ({ busy: true })
  }
})

/**
 * <MediaInput/>
 */

const MediaInput = component({
  render ({ props }) {
    const { placeholder, onSubmit, busy = false, ...rest } = props

    return (
      <Form
        align='start stretch'
        onClick={stopPropagation}
        w='60%'
        onSubmit={onSubmit}
        {...rest}>
        <BlockInput
          placeholder={placeholder || 'Enter a url...'}
          borderRightWidth={0}
          inputProps={{ py: 8 }}
          name='url'
          autofocus
          lighter
          fs='s'
          mb={0} />
        <Button busy={busy} borderRadius='0' type='submit'>
          Submit
        </Button>
      </Form>
    )
  }
})
