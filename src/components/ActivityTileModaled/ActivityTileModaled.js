/**
 * Imports
 */

import {Flex, Block, Card, Text} from 'vdux-ui'
import {Textarea} from 'vdux-containers'
import EditButton from 'components/EditButton'
import Figure from 'components/Figure'
import element from 'vdux/element'

/**
 * Activity Tile
 */

function render ({props}) {
  const {activity, editable, busy} = props
  const {image, displayName, description, _id} = activity
  const textareaProps = {
    focusProps: {border: '1px solid rgba(37, 168, 224, 0.35)', highlight: 0.01},
    activeProps: {border: '1px solid rgba(37, 168, 224, 0.35)'},
    hoverProps: {highlight: 0.01},
    borderColor: 'transparent',
    textAlign: 'center',
    bgColor: 'white'
  }
  return (
    <Card w={230} relative my={8} mx={6}>
      <Flex column pb>
        <Figure key='img' {...image} thumb={true} />
        <Block textAlign='center' m='s' mt>
          <Textarea
            name='displayName'
            defaultValue={displayName}
            fw='200'
            fs='s'
            p='s'
            {...textareaProps} />
          <Textarea p='s' fs='xxs' lh='1.4em' wordBreak='break-word' name='originalDescription' defaultValue={description} {...textareaProps} />
        </Block>
      </Flex>
      <Block align='end center' borderTop='1px solid grey_light'>
        <EditButton activity={activity} m='s' disabled={busy}/>
      </Block>
    </Card>
  )
}

/**
 * Exports
 */

export default {
  render
}
