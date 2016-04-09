/**
 * Imports
 */

import {CSSContainer, Fixed, Text, Icon, Flex, Block, Menu, Button, MenuItem} from 'vdux-containers'
import ClassNav from 'components/ClassNav'
import HomeOwl from 'components/HomeOwl'
import AccountMenu from './AccountMenu'
import element from 'vdux/element'

/**
 * Main nav
 */

function render ({props}) {
  const {currentUser, url} = props
  const Item = navItem(url)

  return (
    <Block>
      <Fixed wide top z={2}>
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
            <AccountMenu currentUser={currentUser} />
            <Button pill h={34}>
              <Flex align='center center'>
                <Icon fs='s' mr='s' name='edit' />
                Create Activity
              </Flex>
            </Button>
          </Menu>
        </Flex>
      </Fixed>
      <Block pt={53} hidden/>
    </Block>
  )
}

const activeStyle = {
  borderBottom: '3px solid #fff'
}

const inactiveStyle = {
  borderBottom: '3px solid transparent'
}

function navItem (url) {
  return function ({props, children}) {
    const {text, icon, href, onClick} = props

    return (
      <CSSContainer
        ui={Flex}
        tag={href ? 'a' : 'div'}
        onClick={onClick}
        href={href}
        align='center center'
        h={53}
        pointer
        px={9}
        mr={9}
        transition='all 0.15s'
        baseStyle={url === href ? activeStyle : inactiveStyle}
        hoverProps={{baseStyle: activeStyle}}>
        <Icon fs='m' name={icon} />
        <Text ml='s'>{text}</Text>
        {children}
      </CSSContainer>
    )
  }
}

/**
 * Exports
 */

export default {
  render
}
