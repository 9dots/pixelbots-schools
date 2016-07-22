/**
 * Imports
 */

import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import EditingMedia from './EditingMedia'
import Loading from 'components/Loading'
import Figure from 'components/Figure'
import {Block, Icon, Image as UiImage} from 'vdux-ui'
import Link from 'components/Link'
import element from 'vdux/element'

/**
 * <ActivityMedia/>
 */

function render ({props}) {
  const {object, editing} = props

  if (editing) return <EditingMedia {...props} />

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
      <Block minWidth={118} tall relative hide={!image.url}>
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
    const {content, image, displayName, embed} = object
    const {url, height, width} = image
    const imgSize = height / width >= .74 ? '74.6%' : '100%'

    return (
      <Block tag='span'>
        <Block wide tall relative bg={`#000 url(${url}) no-repeat center`} bgSize={imgSize} printProps={{hide: true}}>
          <Loading show={state.play} dark={false} absolute top bottom left right/>
          <Block hidden={state.play} onClick={local(playVideo)} pointer relative>
            <Figure
              maxWidth={imgSize}
              height={height}
              hidden={true}
              width={width}
              url={url}
              mx='auto' />
            <Icon
              absolute={{top: 0, left: 0, right: 0, bottom: 0}}
              textShadow='1px 1px 5px rgba(0,0,0, .4)'
              name='play_arrow'
              color='white'
              opacity='.7'
              sq={150}
              fs={150}
              m='auto'/>
              <Block
                bg='linear-gradient(to top,rgba(52,52,52,0.45),rgba(52,52,52,0))'
                absolute={{bottom: 0, left: 0}}
                hide={!displayName}
                p='30% 5% 3%'
                wide>
                <Link
                  onClick={e => e.stopPropagation()}
                  hoverProps={{underline: true}}
                  href={embed.url}
                  target='_blank'
                  color='white'
                  lighter
                  fs='s'>
                  {displayName}
                </Link>
              </Block>
          </Block>
          {
            state.play &&
              <Block absolute={{top: 0}} tall wide innerHTML={content} class='activity-video' />
          }
        </Block>
        <Block align='start center' hide printProps={{hide: false}}>
          <Block w={200} relative>
            <UiImage src={url} wide />
            <Icon
              absolute={{top: 0, left: 0, right: 0, bottom: 0}}
              textShadow='1px 1px 5px rgba(0,0,0, .4)'
              name='play_arrow'
              color='white'
              opacity='.8'
              sq={75}
              fs={75}
              m='auto'/>
          </Block>
          <Block ml='l'>
            <Block fs='s' lighter mb='s' mt={-12}>
              {displayName || 'Untitled'}
            </Block>
            <Block>{embed.url}</Block>
          </Block>
        </Block>
      </Block>
    )
  }
}

function Document ({props}) {
  const {object} = props
  const {content, embed: {url}} = object

  return (
    <Block>
      <Block
        class='activity-document'
        innerHTML={content}
        pb='123%'
        w='100%'
        relative
        mb='s'
        h={0}/>
        <Link
          hoverProps={{underline: true}}
          target='_blank'
          color='blue'
          href={url}
          fs={12}
          pointer>
          View File
        </Link>
    </Block>
  )
}

function Image ({props}) {
  const {object: {image}} = props
  return (
    <Figure {...image} w={image.width} />
  )
}

/**
 * Exports
 */

export default {
  render
}
