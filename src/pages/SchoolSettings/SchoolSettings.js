/**
 * Imports
 */

import AvatarPickerModal from 'modals/AvatarPickerModal'
import SettingsRow from 'components/SettingsRow'
import {component, element} from 'vdux'
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
        <SettingsRow name='Logo' Modal={<AvatarPickerModal user={currentUser} />}>
          <Avatar sq='40px' actor={currentUser} display='block' />
        </SettingsRow>
    	</Card>
    )
  }
})
