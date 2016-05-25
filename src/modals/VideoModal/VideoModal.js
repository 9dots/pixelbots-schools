/**
 * Imports
 */

import {closeModal} from 'reducer/modal'
import {Block, Modal} from 'vdux-ui'
import {Button} from 'vdux-containers'
import element from 'vdux/element'
import qs from 'qs'

/**
 * <VideoModal/>
 */

function render ({props}) {
  const {videoId, options} = props
  const url = 'https://www.youtube.com/embed/' + videoId + '?' + qs.stringify(options)

  return (
    <Modal absolute onDismiss={closeModal} bg='#000' w='64vw' h='36vw' top bottom m='auto' left right overlayProps={{bg: 'rgba(#000, .7)'}}>
      <Button icon='close' absolute bottom='100%' right fs='s' mb opacity='.75' hoverProps={{opacity: 1}} transition='opacity .15s' onClick={closeModal}/>
      <iframe frameborder='0' allowfullscreen src={url} width='100%' height='100%' />
    </Modal>
  )
}

/**
 * Exports
 */

export default {
  render
}
