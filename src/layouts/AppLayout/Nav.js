/**
 * Imports
 */

import {CSSContainer, Fixed, Text, Icon, Flex, Block, Menu, Button, MenuItem} from 'vdux-containers'
import ClassNav from 'components/ClassNav'
import HomeOwl from 'components/HomeOwl'
import AccountMenu from './AccountMenu'
import Link from 'components/Link'
import element from 'vdux/element'
import Search from './Search'

/**
 * Main nav
 */

function render ({props, state}) {
  const {currentUser, url, bgColor = 'greydark', search, query} = props

  return (
    <Block>
      <Fixed wide top z={2} boxShadow='card'>
        <Flex align='space-between' wide bgColor={bgColor} color='white'>
          <Flex align='start center'>
            <Flex align='center center' mx='m'>
              <HomeOwl />
            </Flex>
            <Item href='/feed' icon='home' text='Home' />
            <Item href='/activities' icon='assignment' text='My Activities' />
            <ClassNav classes={currentUser.groups.filter(group => group.groupType === 'class')}>
              <Item ml='s' fs='s' icon='school' text='Classes'>
                <Icon name='arrow_drop_down' fs='s' ml='s' />
              </Item>
            </ClassNav>
          </Flex>
          <Menu spacing='m' flex align='end center'>
            <Search url={url} searching={search} query={query}/>
            <Button fs='m' px='s' tooltip='Notifications' ttPlacement='bottom' icon='notifications' tag='div' align='center' display='flex' />
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
      <Block pt={53} hidden />
    </Block>
  )
}

function Item ({props, children}) {
  const {text, icon, href, onClick} = props

  return (
    <Link
      ui={Flex}
      tag={href ? 'a' : 'div'}
      onClick={onClick}
      href={href}
      align='center center'
      h={53}
      pointer
      px={9}
      mr={9}
      borderBottom='3px solid transparent'
      transition='all 0.15s'
      currentProps={{borderBottom: '3px solid #fff'}}
      hoverProps={{borderBottom: '3px solid #fff'}}>
      <Icon fs='m' name={icon} />
      <Text ml='s'>{text}</Text>
      {children}
    </Link>
  )
}



/**
 * Exports
 */

export default {
  render
}
