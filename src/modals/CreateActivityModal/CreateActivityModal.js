/**
 * Imports
 */

import {Modal, ModalBody, ModalHeader, Icon, Block, Checkbox} from 'vdux-ui'
import summonChannels from 'lib/summon-channels'
import {closeModal} from 'reducer/modal'
import {Button, Image} from 'vdux-containers'
import Loading from 'components/Loading'
import resize from 'lib/resize-image'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <CreateActivityModal/>
 */

const tmplBoardId = '56149fd19c9d5d0c0024ad3c'
const w = 110
const h = w * 1.25

function render ({props}) {
  const {activities, more} = props
  const {value, loaded, loading} = activities

  return (
    <Modal onDismiss={closeModal} textAlign='center' w='610'>
      <ModalHeader color='text'>
        Create Activities for your Class
      </ModalHeader>
      <Button my pill bgColor='green' boxShadow='z2' py fs='s' fw='200'>
        <Block align='center center'>
          Create a New Activity
          <Icon name='keyboard_arrow_right' ml='s'/>
        </Block>
      </Button>
      <Block my='l' fs='s' fontStyle='italic' fw='200'>
        or try editing some samples first
      </Block>
      <Block align='center center' pb='s'>
        {
          loaded
            ? map(activity => <TemplateItem activity={activity} />, value.items)
            : <Block m>
                <Loading show={true} border='1px solid grey_medium' h={h} w={w}/>
                <Block py='xs' color='grey_medium' textAlign='left'>
                  Loading ...
                </Block>
              </Block>

        }
      </Block>
      <Block p align='end' fs='xxs'>
        <Checkbox label={'Don\'t show me this again'} pointer uiProps={{flexDirection: 'row-reverse'}}/>
      </Block>
    </Modal>
  )
}

/**
 * Template Item
 */

function TemplateItem ({props}) {
  const {activity} = props
  const {displayName, image} = activity
  return (
    <Block
      hide={displayName === 'Announcement'}
      m>
      <Image hoverProps={{borderColor: 'blue_medium', boxShadow: '0 0 2px rgba(blue, .5)'}}
      display='block'
      border='1px solid grey_medium'
      src={resize(image.url, 350)}
      pointer
      h={h}
      w={w}/>
      <Block py='xs' color='grey_medium' textAlign='left'>
        {displayName}
      </Block>
    </Block>
  )
}

/**
 * Exports
 */

export default summonChannels(
  props => `group!${tmplBoardId}.board`
)({
  render
})
