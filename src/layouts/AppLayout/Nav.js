/**
 * Imports
 */

import {CSSContainer, Fixed, Text, Icon, Flex, Block, Menu, Button, MenuItem} from 'vdux-containers'
import NotificationsButton from 'components/NotificationsButton'
import CreateActivityModal from 'modals/CreateActivityModal'
import ClassNav from 'components/ClassNav'
import HomeOwl from 'components/HomeOwl'
import {openModal} from 'reducer/modal'
import AccountMenu from './AccountMenu'
import Link from 'components/Link'
import element from 'vdux/element'
import Search from './Search'

/**
 * Main nav
 */

function render ({props, state}) {
  const {currentUser, url, bgColor = 'grey', search, query} = props
  const isStudent = currentUser.userType === 'student'

  return (
    <Block>
      <Fixed wide top z={2} boxShadow='card'>
        <Flex align='space-between' wide bgColor={bgColor} color='white'>
          <Flex align='start center'>
            <Flex align='center center' mx='m'>
              <HomeOwl />
            </Flex>
            <Item href='/feed' icon='home' text='Home' />
            <Item hide={isStudent} href='/activities' icon='assignment' text='My Activities' />
            <Item hide={!isStudent} href={`/${currentUser.username}`} icon='person' text='My Profile' />
            <ClassNav currentUser={currentUser}>
              <Item ml='s' fs='s' icon='school' text='Classes'>
                <Icon name='arrow_drop_down' fs='s' ml='s' />
              </Item>
            </ClassNav>
          </Flex>
          <Menu flex align='end center'>
            <Search url={url} searching={search} query={query} hide={isStudent}/>
            <NotificationsButton ml='s' currentUser={currentUser} />
            <AccountMenu mx currentUser={currentUser} />
            <Button
              onClick={() => openModal(() => <CreateActivityModal currentUser={currentUser} />)}
              border='1px solid rgba(#000, .1)'
              hide={isStudent}
              px='21'
              h={34}
              pill
              mr>
              <Icon fs='s' mr='s' name='edit' />
              Create Activity
            </Button>
          </Menu>
        </Flex>
      </Fixed>
      <Block pt={53} hidden />
    </Block>
  )
}

function Item ({props, children}) {
  const {text, icon, href, onClick, hide} = props

  return (
    <Link
      ui={Flex}
      tag={href ? 'a' : 'div'}
      onClick={onClick}
      href={href}
      align='center center'
      hide={hide}
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
