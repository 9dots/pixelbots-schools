/**
 * Imports
 */

import AvatarUploadModal from 'modals/AvatarUploadModal'
import {Block, Text, Icon, Image, Flex} from 'vdux-ui'
import {CSSContainer, wrap} from 'vdux-containers'
import {openModal} from 'reducer/modal'
import * as colors from 'lib/colors'
import element from 'vdux/element'

/**
 * AvatarBlock
 */

function render({props}) {
  const {avatar, hovered, selected, user, toggleUpload} = props
  let url = avatar

  if (avatar === 'upload') {
    return (
      <Flex
        onClick={() => openModal(() => <AvatarUploadModal user={user} />)}
        outline='1px dashed #AAA'
        align='center center'
        outlineOffset='2px'
        bg='greylight'
        color='#AAA'
        sq='100'
        pointer
        column
        m='10'>
        <Text pb='s' fs='s'>Upload</Text>
        <Icon name='add' />
      </Flex>
    )
  } else if(avatar === 'letters') {
    url = letterAvatar(user).toDataURL()
  }
  return (
    <Block
      tabindex='-1'
      outline='3px solid transparent'
      outlineColor={hovered || selected ? 'blue' : 'transparent'}
      transition='outline-color .35s'
      outlineOffset='2px'
      relative
      sq='100'
      pointer
      m='10'>
      <Image sq='100%' src={url} />
      <Icon
        transition='transform .35s'
        transform={selected ? 'scale(1)' : 'scale(0)'}
        name='check'
        align='center center'
        color='blue'
        bg='white'
        fs='19'
        circle='25'
        absolute
        right
        top
        m='s' />
    </Block>
  )
}

function letterAvatar(user) {
  const {name, color} = user
  const initials = (name.givenName[0] || '') + (name.familyName[0] || '')
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const size = 250

  canvas.width = canvas.height = size
  ctx.fillStyle = color || colors.pickerColors[0]
  ctx.fillRect(0, 0, size, size)
  ctx.font = size / 2.5 + 'px Lato'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#FFF'
  ctx.fillText(initials.toUpperCase(), size / 2, size / 2)

  return canvas
}

/**
 * Exports
 */

export default wrap(CSSContainer)({
  render
})
