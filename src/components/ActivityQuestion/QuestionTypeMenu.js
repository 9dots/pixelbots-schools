/**
 * Imports
 */


import {questionIcon, questionDisplay} from 'lib/activity-helpers'
import {generateObjectId} from 'middleware/objectId'
import {Dropdown, MenuItem, Button} from 'vdux-containers'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * QuestionTypeMenu
 */

function render ({props}) {
  const {attach, object} = props

  return (
    <Dropdown btn={<Btn object={object} relative />} wide>
      <Item object={object} onClick={attach('text', false, true)} type='text'/>
      <Item object={object} onClick={attach('shortAnswer', false, true)} type='shortAnswer'/>
      <Item object={object} onClick={attach('choice', false, true)} type='choice' />
      <Item object={object} onClick={attach('choice', true, true)} type='poll'/>
    </Dropdown>
  )
}

function Btn({props}) {
  const {object} = props
  return (
    <Button
      align='space-between center'
      bgColor='grey'
      uppercase
      w={190}
      px>
      <Block align='start center' flex>
        <Icon name={questionIcon(object)} fs='s' mr='s' />
        <Block>{questionDisplay(object)}</Block>
      </Block>
      <Icon name='arrow_drop_down' mr={-8}/>
    </Button>
  )

}

function Item({props}) {
  const {type, object, onClick, ...rest} = props
  const cur = object.poll
    ? type === 'poll'
    : object.attachments[0].objectType === type
  return (
    <MenuItem
      highlight={cur ? .08 : 0}
      align='start center'
      whiteSpace='nowrap'
      onClick={!cur && onClick}
      {...rest}>
      <Icon name={questionIcon(type)} fs='s' mr />
      <Block>{questionDisplay(type)}</Block>
    </MenuItem>
  )
}

/**
 * Render
 */

export default {
  render
}