/**
 * Imports
 */

import {component, Document, element} from 'vdux'
import Loading from 'components/Loading'
import {Block} from 'vdux-ui'

/**
 * <InfiniteScroll/>
 */

export default component({
  render ({props, actions, children}) {
    const {loading, ...rest} = props

    return (
      <Block pb='l' {...rest}>
        {children}
        <Loading h={200} show={loading} />
        <Document onScroll={actions.handleScroll} />
      </Block>
    )
  },

  events: {
    * handleScroll ({props}) {
      const {more, threshold = 350} = props
      const delta = document.body.scrollHeight - (document.body.scrollTop + window.innerHeight)

      if (delta <= threshold) {
        yield more()
      }
    }
  }
})
