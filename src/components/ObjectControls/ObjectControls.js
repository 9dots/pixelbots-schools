/**
 * Imports
 */

import {generateObjectId} from 'middleware/objectId'
import {Button} from 'vdux-containers'
import {Block, Icon} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ObjectControls/>
 */

function render ({props, children}) {
  const {object, remove, open, insert, pos} = props

  return (
    <Block p m={-24} mt={24} borderTop='1px solid grey_light' bgColor='off_white' align='space-between center'>
      <Block align='start center'>
        {children}
      </Block>
      <Block align='end stretch'>
        <Btn onClick={() => remove(object)}>
          <Icon fs='s' name='delete' color='text' />
        </Btn>
        <Btn onClick={() => duplicate()} mx='s'>
          <Icon fs='s' name='content_copy' color='text' />
        </Btn>
        <Btn onClick={() => open(null)}>
          Done
        </Btn>
      </Block>
    </Block>
  )

  function * duplicate () {
    const _id = yield generateObjectId()
    const newObj =  {
      ...object,
      _id,
      attachments: []
    }

    for(var i = 0; i < object.attachments.length; i++) {
      let id = yield generateObjectId()
      newObj.attachments[i] =  {
        ...object.attachments[i],
        _id: id
      }
    }
    yield insert({object: newObj, idx: pos + 1})
  }
}

function Btn ({props, children}) {
  return (
    <Button
      hoverProps={{highlight: 0.03}}
      focusProps={{highlight: 0.03}}
      border='1px solid grey_medium'
      bgColor='off_white'
      color='text'
      px
      {...props}>
      {children}
    </Button>
  )
}

/**
 * Exports
 */

export default {
  render
}
