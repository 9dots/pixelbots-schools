/**
 * Imports
 */

import {Fixed, Text, Icon, Flex, Block, Menu} from 'vdux-ui'
import {logoutUser} from 'reducer/currentUser'
import ClassNav from 'components/ClassNav'
import HomeOwl from 'components/HomeOwl'
import Tooltip from 'components/Tooltip'
import Button from 'components/Button'
import Avatar from 'components/Avatar'
import Dropdown from 'vdux-dropdown'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Main nav
 */

function render ({props}) {
  const {currentUser, url} = props
  const Item = navItem(url)

  return (
    <div>
      <Fixed wide top zIndex={2}>
        <Flex align='space-between' wide bgColor='grey' color='white'>
          <Flex align='start center'>
            <Flex align='center center' mx='m'>
              <HomeOwl />
            </Flex>
            <Item href='/' icon='home' text='Home' />
            <Item href='/activities/all' icon='assignment' text='My Activities' />
            <ClassNav classes={currentUser.groups}>
              <Item ml='s' fs='s' icon='school' text='Classes'>
                <Icon name='arrow_drop_down' />
              </Item>
            </ClassNav>
          </Flex>
          <Menu spacing='m' flex align='end center'>
            <Button fs='m' tooltip='Search Weo' ttPlacement='bottom' icon='search' />
            <Button fs='m' tooltip='Notifications' ttPlacement='bottom' icon='notifications' />
            <Dropdown p='m' bgColor='white' color='text' btn={<Avatar actor={currentUser} />}>
              <div>My Profile</div>
              <div>My Drafts</div>
              <div>Connect</div>
              <div>Notifications</div>
              <div>Settings</div>
              <div>Help Center</div>
              <div>Log Out</div>
            </Dropdown>
            <Button pill h={34}>
              <Flex align='center center'>
                <Icon fs='s' mr='s' name='edit' />
                Create Activity
              </Flex>
            </Button>
            <button onClick={logoutUser}>Logout</button>
          </Menu>
        </Flex>
      </Fixed>
      <Block pt={53} hidden/>
    </div>
  )
}

function navItem (url) {
  return function ({props, children}) {
    const {text, icon, href, onClick} = props

    return (
      <Flex
        tag={href ? 'a' : 'div'}
        onClick={onClick}
        href={href}
        align='center center'
        h={53}
        pointer
        px={9}
        mr={9}
        transition='all 0.15s'
        class={[item, {[active]: url === href}]}>
        <Icon fs='m' name={icon} />
        <Text ml='s'>{text}</Text>
        {children}
      </Flex>
    )
  }
}

/**
 * Style
 */

const activeStyle = {
  borderBottom: '3px solid #fff'
}

const {item, active} = css({
  item: {
    borderBottom: '3px solid transparent',
    '&:hover': activeStyle
  },
  active: activeStyle
})

/**
 * Exports
 */

export default {
  render
}
