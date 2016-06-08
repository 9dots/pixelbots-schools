/**
 * Imports
 */

import BlockInput from 'components/BlockInput'
import {Block, Button} from 'vdux-containers'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import element from 'vdux/element'
import Form from 'vdux-form'

/**
 * <NewMenuItem/>
 */

function render ({props, local, state}) {
  const {
    type = 'Item', openedProps = {}, closedProps = {},
    onSubmit, validate, ...rest
  } = props
  const {opened} = state
  return (
    <Form onSubmit={onSubmit} onSuccess={local(toggle)} validate={validate} relative>
      {
        opened
          ? <Block
              highlight='0.03'
              bgColor='white'
              p
              {...rest}
              {...openedProps}>
              <BlockInput
                errorPlacement='top'
                placeholder={type + ' Name …'}
                name='displayName'
                autofocus/>
              <Block align='start center' mt>
                <Button px mr bgColor='grey' text='Cancel' onClick={local(toggle)}/>
                <Button px text='Create' type='submit' />
              </Block>
            </Block>
          : <Block
              onClick={local(toggle)}
              hoverProps={{highlight: 0.03}}
              align='start center'
              bgColor='white'
              pointer
              p
              {...rest}
              {...closedProps}>
              <Button bgColor='red' h='32px' w='38px' p='0' mr icon='add' fs='s'/>
              New {type}
            </Block>
      }
    </Form>
  )
}

/**
 * Actions
 */

const toggle = createAction('<PinSelect />: toggle')

/**
 * Reducer
 */
const reducer = handleActions({
  [toggle]: state => ({...state, opened: !state.opened })
})

/**
 * Exports
 */

export default {
  render,
  reducer
}
