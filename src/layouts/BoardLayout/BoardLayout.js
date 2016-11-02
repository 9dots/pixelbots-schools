/**
 * Imports
 */

import PageTitle from 'components/PageTitle'
import FourOhFour from 'pages/FourOhFour'
import AppLayout from 'layouts/AppLayout'
import {component, element} from 'vdux'
import maybeOver from '@f/maybe-over'
import summon from 'vdux-summon'
import Header from './Header'

/**
 * <BoardLayout/>
 */

export default summon(({boardId}) => ({
  board: `/group/${boardId}`
}))(component({
  render ({props, children}) {
    const {currentUser, board} = props

    return (
      <AppLayout {...props}>
        { internal(board, currentUser, children) }
      </AppLayout>
    )
  }
}))

/**
 * Helpers
 */

function internal ({value, loading, error}, currentUser, children) {
  if (loading) return ''
  if (error) return <FourOhFour />

  return [
    <Header value={value} currentUser={currentUser} />,
    <PageTitle title={`${value.displayName} | Board`} />,
    maybeOver(value, children)
  ]
}
