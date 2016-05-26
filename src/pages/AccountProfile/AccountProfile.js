/**
 * Imports
 */

import SubjectPickerModal from 'modals/SubjectPickerModal'
import AvatarPickerModal from 'modals/AvatarPickerModal'
import ColorPickerModal from 'modals/ColorPickerModal'
import GradePickerModal from 'modals/GradePickerModal'
import DescriptionModal from 'modals/DescriptionModal'
import LocationModal from 'modals/LocationModal'
import SettingsRow from 'components/SettingsRow'
import WebsiteModal from 'modals/WebsiteModal'
import {openModal} from 'reducer/modal'
import Avatar from 'components/Avatar'
import {Block, Card} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <AccountProfile/>
 */

function render ({props}) {
  const {currentUser} = props
  const {color, grades = [], subjects = [], website, location, description} = currentUser
  const me = currentUser

  return (
    <Card>
      <Block fs='l' color='blue' pt='l' pb px>
        Profile Details
      </Block>

      <SettingsRow name='Avatar' Modal={AvatarPickerModal} user={currentUser}>
        <Avatar sq='40px' actor={currentUser} display='block' />
      </SettingsRow>

      <SettingsRow name='Color' Modal={ColorPickerModal} user={currentUser} message='The color that appears in the top bar of your profile.'>
          <Block circle='40px' bg={color} />
      </SettingsRow>

      <SettingsRow name='Grades' placeholder='Where grades do you teach?' Modal={GradePickerModal} prop={grades} user={currentUser} />

      <SettingsRow name='Subjects' placeholder='What subjects do you teach?' Modal={SubjectPickerModal} prop={subjects} user={currentUser} />

      <SettingsRow name='Website' placeholder='http://…' Modal={WebsiteModal} prop={website} user={currentUser} />

      <SettingsRow name='Location' placeholder='Where are you located?' Modal={LocationModal} prop={location} user={currentUser} />

      <SettingsRow name='Description' placeholder='Share a few words about yourself!' Modal={DescriptionModal} prop={description} user={currentUser} borderBottomWidth='0'/>

    </Card>
  )
}

/**
 * Exports
 */

export default {
  render
}
