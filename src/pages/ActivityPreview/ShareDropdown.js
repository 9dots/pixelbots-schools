/**
 * Imports
 */
import {Button, Dropdown, MenuItem} from 'vdux-containers'
import ActivityLinkModal from 'modals/ActivityLinkModal'
import {Block, Card, Icon} from 'vdux-ui'
import WeoIcon from 'components/WeoIcon'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'
import qs from 'qs'

/**
 * ShareDropdown
 */

function render({props}) {
  const {btn: Btn = DDButton, activity, ...rest} = props
  const data =  {
    url: window.location.href,
    media: (activity.image && activity.image.url),
    title: activity.displayName,
    description: activity.description
  }
  return (
    <Dropdown w={120} z={2} btn={<Btn {...rest} />}>
      <ShareItem onClick={() => shareFacebook(data)} weoIcon='facebook'/>
      <ShareItem onClick={() => shareTwitter(data)} weoIcon='twitter'/>
      <ShareItem onClick={() => sharePinterest(data)} weoIcon='pinterest'/>
      <ShareItem icon='link' onClick={() => openModal(() => <ActivityLinkModal activity={activity} />)}/>
    </Dropdown>
  )
}


function DDButton ({props}) {
  return (
    <Button icon='share' {...props} />
  )
}

function ShareItem({props}) {
  const {icon, weoIcon, ...rest} = props
  return (
    <MenuItem align='start center' {...rest}>
      { icon && <Icon fs='s' name={icon} mr='s' /> }
      { weoIcon && <WeoIcon fs='s' name={weoIcon} mr='s' /> }
      <Block capitalize>{icon || weoIcon}</Block>
    </MenuItem>
  )
}

function shareFacebook(data) {
  const url = 'https://www.facebook.com/dialog/feed?' + qs.stringify({
    app_id: 1662916197276541,
    display: "popup",
    redirect_uri: "http://www.weo.io/#closewindow",
    link: data.url,
    picture: data.media,
    name: data.title,
    description: data.description
  })
  window.open(url, 'facebook', 'width=550,height=300')
}

function shareTwitter(data) {
  const url = 'http://twitter.com/share?' + qs.stringify({
    text: 'Check out this awesome lesson on Weo:',
    url: data.url,
    media: data.media,
    image: data.media,
    picture: data.media,
    count: 'none'
  })
  window.open(url, 'twitter', 'width=550,height=300')
}

function sharePinterest(data) {
  const url = 'http://www.pinterest.com/pin/create/button?' + qs.stringify({
    url: data.url,
    media: data.media,
    description: data.description
  })
  window.open(url, 'pinterest', 'width=750,height=675')
}

/**
 * Exports
 */

export default {
  render
}