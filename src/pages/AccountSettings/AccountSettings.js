/**
 * Imports
 */

import PointValueModal from 'modals/PointValueModal'
import PasswordModal from 'modals/PasswordModal'
import UsernameModal from 'modals/UsernameModal'
import SettingsRow from 'components/SettingsRow'
import EmailModal from 'modals/EmailModal'
import NameModal from 'modals/NameModal'
import ReadingSpeedDropdown from 'components/ReadingSpeedDropdown'
import {Block, Card} from 'vdux-ui'
import {openModal} from 'reducer/modal'
import element from 'vdux/element'

/**
 * <AccountSettings/>
 */

function render ({props}) {
  const {currentUser} = props
  const {name, displayName, email, username, preferences} = currentUser
  const {max_points = 10} = preferences

  return (
    <Card>
      <Block fs='l' color='blue' pt='l' pb px>
        User Settings
      </Block>

      <SettingsRow name='Name' placeholder={'What\'s your name?'} Modal={NameModal} prop={displayName} user={currentUser} />
      <SettingsRow name='Username' placeholder='Get a username?' Modal={UsernameModal} prop={username} user={currentUser} />
      <SettingsRow name='Email' placeholder={'What\'s your email?'} Modal={EmailModal} prop={email} user={currentUser} />
      <SettingsRow name='Password' Modal={PasswordModal} user={currentUser} prop='*******' />

      <Block fs='l' color='blue' pt='l' pb px>
        Activity Settings
      </Block>

      <SettingsRow name='Reading Speed' clickable={false} color='text'>
        <ReadingSpeedDropdown user={currentUser} />
      </SettingsRow>

      <SettingsRow name='Point Value' placeholder='What is your name?' Modal={PointValueModal} prop={max_points} user={currentUser} message='The default point value given to each question in an activity' />
    </Card>
  )
}

/**
 * Exports
 */

export default {
  render
}
