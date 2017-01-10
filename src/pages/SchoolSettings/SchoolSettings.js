/**
 * Imports
 */

import AvatarPickerModal from 'modals/AvatarPickerModal'
import ColorPickerModal from 'modals/ColorPickerModal'
import SettingsRow from 'components/SettingsRow'
import {component, element} from 'vdux'
import {pickerColors} from 'lib/colors'
import Avatar from 'components/Avatar'
import {Block, Card} from 'vdux-ui'

/**
 * <School Settings/>
 */

export default component({
  render ({props}) {
  	const {currentUser} = props
    return (
    	<Card>
        <SettingsRow name='School' clickable={false} prop={'9 Dots Community Learning Center'} />
        <SettingsRow name='Location' placeholder='Where is your school located?'/>
        <SettingsRow name='Logo' Modal={<AvatarPickerModal user={currentUser} />}>
          <Avatar sq='40px' actor={currentUser} display='block' />
        </SettingsRow>
        <SettingsRow name='Color' Modal={<ColorPickerModal user={currentUser} />} message={`The color that appears in the top bar of your school's page.`}>
          <Block circle='40px' bgColor={pickerColors[0]} />
        </SettingsRow>
    	</Card>
    )
  }
})
