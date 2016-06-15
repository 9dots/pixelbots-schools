/**
 * Imports
 */

import {Button, CSSContainer, wrap} from 'vdux-containers'
import ClassSettingsModal from 'modals/ClassSettingsModal'
import {Block, Text, MenuItem} from 'vdux-ui'
import {openModal} from 'reducer/modal'
import Link from 'components/Link'
import element from 'vdux/element'

/**
 * <ClassItem/> component
 */

function render ({props}) {
  const {showIcon, cls, isStudent} = props
  const {_id, displayName} = cls

  return (
    <MenuItem px='0' py='0' capitalize color='text_color' align='start stretch' {...props}>
      <Link py flex align='start center' href={`/class/${_id}`}>
        <Text circle='25' lh='25px' mx bg='green' color='white' textAlign='center'>
          {displayName[0]}
        </Text>
        <Text ellipsis capitalize inlineBlock flex>
          {displayName}
        </Text>
      </Link>
      <Button
        onClick={() => openModal(() => <ClassSettingsModal group={cls} />)}
        activeProps={{opacity: 0.7}}
        hoverProps={{opacity: 1}}
        hide={isStudent || !showIcon}
        color='midgray'
        icon='settings'
        opacity={0.7}
        fs='xs'
        px
        />
    </MenuItem>
  )
}

/**
 * Exports
 */

export default wrap(Link, ({cls}) => ({
  disabled: true,
  href: `/class/${cls._id}`,
  currentProps: {
    highlight: true
  }
}))(wrap(CSSContainer, {
  hoverProps: {
    showIcon: true,
    highlight: 0.05
  }
})({
  render
}))
