/**
 * Imports
 */

import {CSSContainer, Fixed, Text, Icon, Flex, Block, Menu, Button, MenuItem} from 'vdux-containers'
import NotificationsButton from 'components/NotificationsButton'
import CreateActivityModal from 'modals/CreateActivityModal'
import SignUpModal from 'modals/SignUpModal'
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
  const isStudent = currentUser && currentUser.userType === 'student'

  return (
    <Block>
      <Fixed wide top z={2} boxShadow='card'>
        <Flex align='space-between' wide bgColor={bgColor} color='white' h={53}>
          <Flex align='start center'>
            <Flex align='center center' mx='m'>
              <HomeOwl />
              {
                !currentUser &&
                <Text fs='m' ml bold>WEO</Text>
              }
            </Flex>
            {
              currentUser && [
                <Item href='/class' icon='home' text='Home' />,
                <Item href={`/${currentUser.username}`} icon='person' text={isStudent ? 'My Profile' : 'My Activities'} />
              ]
            }
          </Flex>
          <Menu flex align='end center'>
            <Search url={url} searching={search} query={query} hide={isStudent} mr='s'/>
            {
              currentUser && [
                <NotificationsButton currentUser={currentUser} />,
                <AccountMenu ml currentUser={currentUser} />
              ]
            }
            <Button
              onClick={
                () => openModal(() =>
                  currentUser
                    ? <CreateActivityModal currentUser={currentUser} />
                    : <SignUpModal />
                )
              }
              border='1px solid rgba(#000, .1)'
              hide={isStudent}
              px='21'
              h={34}
              pill
              mx>
              <Icon fs='s' mr='s' name='edit' />
              Create Activity
            </Button>
            {
              !currentUser &&
                <Button
                  px='16'
                  mr
                  h={53}
                  boxShadow='inset 1px 0 0 rgba(255,255,255,0.07),inset -1px 0 0 rgba(255,255,255,0.07)'
                  borderLeft='1px solid rgba(0,0,0,0.1)'
                  borderRight='1px solid rgba(0,0,0,0.1)'
                  bgColor='transparent'
                  onClick={() => openModal(() => <SignUpModal />)}>
                  SIGN UP
                </Button>
            }
          </Menu>
        </Flex>
      </Fixed>
      <Block pt={53} hidden />
    </Block>
  )
}

function Item ({props, children}) {
  const {text, icon, href, onClick, hide, disabled} = props

  return (
    <Link
      tag={href && !disabled ? 'a' : 'div'}
      onClick={onClick}
      href={href}
      align='center center'
      hide={hide}
      disabled={disabled}
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
