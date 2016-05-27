/**
 * Imports
 */

import {Button, CSSContainer, wrap} from 'vdux-containers'
import ClassSettingsModal from 'modals/ClassSettingsModal'
import {setUrl} from 'redux-effects-location'
import {openModal} from 'reducer/modal'
import {Block, Text, MenuItem} from 'vdux-ui'
import element from 'vdux/element'

/**
 * <ClassItem/> component
 */

function render ({props}) {
  const {showIcon, cls} = props
  const {_id, displayName} = cls

  return (
    <MenuItem px='0' py='0' capitalize color='text_color' align='start stretch' {...props}>
      <Block py='m' flex align='start center' onClick={() => setUrl(`/class/${_id}/feed`)}>
        <Text inlineBlock circle='25' lh='25px' mx='m' bg='green' color='white' textAlign='center'>
          {displayName[0]}
        </Text>
        <Text ellipsis capitalize inlineBlock flex>
          {displayName}
        </Text>
      </Block>
      <Button
        onClick={() => openModal(() => <ClassSettingsModal group={cls} />)}
        activeProps={{opacity: 0.7}}
        hoverProps={{opacity: 1}}
        hide={!showIcon}
        color='midgray'
        icon='settings'
        opacity={0.7}
        fs='xs'
        px='m'
        />
    </MenuItem>
  )
}

/**
 * Exports
 */

export default wrap(CSSContainer, {
  hoverProps: {
    showIcon: true,
    highlight: 0.05
  }
})({
  render
})
