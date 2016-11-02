/**
 * Imports
 */

import BoardSettingsModal from 'modals/BoardSettingsModal'
import {CSSContainer, Icon, wrap} from 'vdux-containers'
import {MenuItem, Block} from 'vdux-ui'
import {component, element} from 'vdux'
import Link from 'components/Link'

/**
 * ActivitiesLayout <NavItem/> component
 */

export default wrap(CSSContainer, {
  hoverProps: {
    showSettings: true
  }
})(component({
  render ({props, children, actions}) {
    const {showSettings, board, ...rest} = props

    return (
      <Link
        fw='bold'
        display='flex'
        color='grey_medium'
        ui={MenuItem}
        {...rest}
        py='m'
        borderLeft='3px solid transparent'
        hoverProps={{color: 'text'}}
        currentProps={{borderLeftColor: 'blue', highlight: 0.05, color: 'text'}}>
        <Block flex align='start center' ellipsis>
          {children}
        </Block>
        <Icon
          onClick={[{stopPropagation: true}, actions.openSettings]}
          hide={!board}
          transition='opacity 0.15s'
          fs='xs'
          opacity={showSettings ? 0.5 : 0}
          name='settings'
          hoverProps={{opacity: 1}} />
      </Link>
    )
  },

  events: {
    * openSettings ({props, context}) {
      yield context.openModal(() => <BoardSettingsModal board={props.board} exitPath='/activities/all' />)
    }
  }
}))
