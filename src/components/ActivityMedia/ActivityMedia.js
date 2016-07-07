/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import Figure from 'components/Figure'
import Link from 'components/Link'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <ActivityMedia/>
 */

function render ({props}) {
  const {object} = props

  switch (object.objectType) {
    case 'link':
      return <LinkObject {...props} />
    case 'video':
      return <Video {...props} />
    case 'document':
      return <Document {...props} />
    case 'image':
      return <Image {...props} />
  }
}

function LinkObject ({props}) {
  const {object} = props
  const {description, embed, image, displayName} = object

  return (
    <Block align='start center' bgColor='#fbfbfb' border='1px solid rgba(52, 52, 52, 0.08)' h={120}>
      <Block minWidth={118} tall relative>
        <Block
          tag='img'
          maxWidth='100%'
          maxHeight='100%'
          absolute={{top: 0, right: 0, bottom: 0, left: 0}}
          m='auto'
          src={image.url} />
      </Block>
      <Block column ml>
        <Block column mb fs='xxs'>
          <Link href={embed.url} display='block' hoverProps={{textDecoration: 'underline'}} color='blue' fs='s' fw={100}>
            {displayName}
          </Link>
          <Link color='rgb(153, 153, 153)' href={embed.url} hoverProps={{textDecoration: 'underline'}}>
            {embed.url}
          </Link>
        </Block>
        <Block>{description}</Block>
      </Block>
    </Block>
  )
}

const playVideo = createAction('<Video/>: play')

const Video = {
  reducer: handleActions({
    [playVideo]: state => ({...state, play: true})
  }),
  render ({props, state, local}) {
    const {object} = props
    const {content, image} = object

    return (
      <Block wide tall relative>
        <Block hidden={state.play} onClick={local(playVideo)} tall wide tag='img' src={image.url} />
        {
          state.play && <Block absolute={{top: 0}} tall wide innerHTML={content} />
        }
      </Block>
    )
  }
}

function Image ({props}) {
  const {object} = props

  return (
    <Block wide>
      <Figure {...object.image} width={830} />
    </Block>
  )
}

function Document ({props}) {
  const {object} = props

  return (
    <Block>
      <Block innerHTML={object.content} />
    </Block>
  )
}
/**
 * Exports
 */

export default {
  render
}
