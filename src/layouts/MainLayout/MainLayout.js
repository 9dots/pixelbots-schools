/**
 * Imports
 */

import FeedWidgets from 'components/FeedWidgets'
import AppLayout from 'layouts/AppLayout'
import element from 'vdux/element'
import {Block} from 'vdux-ui'

/**
 * <MainLayout/>
 */

function render ({props, children}) {
  return (
    <AppLayout {...props}>
      <Block align='start' w='col_main' mx='auto' py>
        <FeedWidgets user={props.currentUser}/>
        <Block flex>
          { children }
        </Block>
      </Block>
    </AppLayout>
  )
}

/**
 * Exports
 */

export default {
  render
}
