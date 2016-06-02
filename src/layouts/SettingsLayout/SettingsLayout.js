/**
 * Imports
 */

import {Block, Flex, Card, Icon} from 'vdux-ui'
import {Menu, MenuItem} from 'vdux-containers'
import {setUrl} from 'redux-effects-location'
import PageTitle from 'components/PageTitle'
import AppLayout from 'layouts/AppLayout'
import {logoutUser} from 'reducer/auth'
import Link from 'components/Link'
import element from 'vdux/element'

/**
 * <SettingsLayout/>
 */

function render ({props, children}) {

  return (
    <AppLayout {...props}>
      <PageTitle title='Account Settings' />
      <Flex w='col_main' mt='s' mx='auto' px='s' py='l' relative>
        <Block>
          <Card w={230} mr pb='l'>
            <Menu column>
              <Block p fs='s' color='grey_medium'>
                Your Account
              </Block>
              { items.map(navItem) }
              <MenuItem onClick={logoutUser} borderBottom='1px solid grey_light' {...itemProps}>
                <Icon name='exit_to_app' mr='s' fs='s' />
                Log Out

              </MenuItem>
            </Menu>
          </Card>
        </Block>
        <Block flex>
          { children }
        </Block>
      </Flex>
    </AppLayout>
  )
}

function navItem(item) {
  const {name, url, icon} = item
  return (
    <Link ui={MenuItem} href={url} {...itemProps}>
      <Icon name={icon} fs='s' mr='s' />
      <Block flex>
        {name}
      </Block>
      <Icon name='keyboard_arrow_right' fs='s' />
    </Link>
  )
}

const itemProps = {
  currentProps: {borderLeftColor: 'blue', highlight: 0.05, color: 'text'},
  borderLeft: '3px solid transparent',
  borderTop: '1px solid grey_light',
  hoverProps: {color: 'text'},
  align: 'start center',
  color: 'grey_medium',
  fw: 'bold',
  py: 'm'
}

const items = [
  {
    name: 'Settings',
    icon: 'settings',
    url: '/account/settings'
  },
  {
    name: 'Edit Profile',
    icon: 'account_circle',
    url: '/account/profile'
  },
  {
    name: 'Email Notifications',
    icon: 'email',
    url: '/account/email'
  }
]

/**
 * Exports
 */

export default {
  render
}
