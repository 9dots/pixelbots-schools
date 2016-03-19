/**
 * Imports
 */

import {wide, mrg_left_small, small, mrg_side, medium} from 'lib/styles'
import {row, align, flex, flex_45} from 'lib/layout'
import {Icon, Flex, Block, Menu} from 'vdux-ui'
import {logoutUser} from 'reducer/currentUser'
import ClassNav from 'components/class-nav'
import HomeOwl from 'components/home-owl'
import Tooltip from 'components/tooltip'
import Button from 'components/button'
import Avatar from 'components/avatar'
import Dropdown from 'vdux-dropdown'
import element from 'vdux/element'
import {grey} from 'lib/colors'
import css from 'jss-simple'

/**
 * Main nav
 */

function render ({props}) {
  const {currentUser, url} = props
  const Item = navItem(url)

  return (
    <div>
      <Flex align='space-between' wide bgColor='grey' color='white'>
        <Flex align='start center'>
          <Flex align='center center' mx={2}>
            <HomeOwl />
          </Flex>
          <Item href='/' icon='home' text='Home' />
          <Item href='/activities/all' icon='assignment' text='My Activities' />
          <ClassNav classes={currentUser.groups}>
            <Item class={[small, mrg_left_small]} icon='school' text='Classes'>
              <Icon name='arrow_drop_down' />
            </Item>
          </ClassNav>
        </Flex>
        <Menu spacing={2} flex align='end center'>
          <Button fs={3} tooltip='Search Weo' ttPlacement='bottom' icon='search' />
          <Button fs={3} tooltip='Notifications' ttPlacement='bottom' icon='notifications' />
          <Dropdown p={2} bgColor='white' color='text' btn={<Avatar actor={currentUser} />}>
            <div>My Profile</div>
            <div>My Drafts</div>
            <div>Connect</div>
            <div>Notifications</div>
            <div>Settings</div>
            <div>Help Center</div>
            <div>Log Out</div>
          </Dropdown>
          <Button pill style={{height: '34px'}}>
            <Flex align='center center'>
              <Icon fs={2} mr={1} name='edit' />
              Create Activity
            </Flex>
          </Button>
          <button onClick={logoutUser}>Logout</button>
        </Menu>
      </Flex>
      <div class={spacer}></div>
    </div>
  )
}

function navItem (url) {
  return function ({props, children}) {
    const Tag = props.href ? 'a' : 'div'

    return (
      <Tag
        onClick={props.onClick}
        href={props.href}
        class={[row, align.center_center, item, {[active]: url === props.href}]}>
        <Icon class={medium} name={props.icon} />
        <span class={mrg_left_small}>{props.text}</span>
        {children}
      </Tag>
    )
  }
}

/**
 * Style
 */

const activeStyle = {
  borderBottom: '3px solid #fff'
}

const {bar, item, active, spacer} = css({
  bar: {
    height: 53,
    transition: 'box-shadow .3s',
    zIndex: 999,
    fixed: 'top',
    width: '100%',
    color: 'white',
    position: 'fixed',
    whiteSpace: 'nowrap',
    backgroundColor: grey,
    fontSmoothing: 'subpixel-antialiased',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.22)'
  },
  item: {
    height: 53,
    cursor: 'pointer',
    padding: '0 9px',
    marginRight: 9,
    transition: 'all 0.15s',
    borderBottom: '3px solid transparent',
    '&:hover': activeStyle
  },
  spacer: {
    paddingTop: 53,
    visibility: 'hidden'
  },
  active: activeStyle
})

/**
 * Exports
 */

export default {
  render
}
