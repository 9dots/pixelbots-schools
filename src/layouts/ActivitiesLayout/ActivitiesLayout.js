/**
 * Imports
 */

import {Block, Flex, Card, Menu, Divider} from 'vdux-containers'
import CreateBoardModal from 'modals/CreateBoardModal'
import PageTitle from 'components/PageTitle'
import handleActions from '@f/handle-actions'
import createAction from '@f/create-action'
import AppLayout from 'layouts/AppLayout'
import WeoIcon from 'components/WeoIcon'
import {openModal} from 'reducer/modal'
import resize from 'lib/resize-image'
import Document from 'vdux/document'
import Link from 'components/Link'
import element from 'vdux/element'
import summon from 'vdux-summon'
import NavItem from './NavItem'
import {Icon} from 'vdux-ui'
import map from '@f/map'

/**
 * <MyActivities/> page
 */

function render ({props, children, local, state}) {
  const {boards, user, currentUser} = props
  const {isScrolled} = state
  const isMe = currentUser._id === user._id
  const {username} = user
  const iconSize = '25px'
  const {value = [], loaded} = boards

  return (
    <Flex w='col_main' mt='s' mx='auto' pb='l' relative>
      <Block>
        <Card mr  w={230} hide={!isScrolled} />
        <Card w={230} mr position={isScrolled ? 'fixed' : 'static'} top={66} overflowY='auto' maxHeight='calc(100vh - 80px)'>
          <Menu column py='s'>
            <NavItem href={`/${username}/boards/all`} display='flex' align='start center'>
              <Icon name='assignment' color='white' bg='green' circle={iconSize} lh={iconSize} fs='s' mr textAlign='center' />
              All Activities
            </NavItem>
            {
              loaded
                ? map(board =>
                  <NavItem href={`/${username}/boards/${board._id}`} board={board} isMe={isMe} display='flex' currentUser={currentUser} align='start center'>
                    {boardIcon(board)}
                    <Block flex ellipsis>{board.displayName}</Block>
                  </NavItem>, value.items)
                : ''
            }
            {
              isMe &&
                <span>
                  <NavItem href={`/${username}/boards/drafts`} display='flex' align='start center'>
                    <WeoIcon name='draft' color='white' bg='yellow' circle={iconSize} lh={iconSize} fs='s' fw='bolder' mr textAlign='center' />
                    Drafts
                  </NavItem>
                  <Divider/>
                  <NavItem onClick={() => openModal(() => <CreateBoardModal/>)} display='flex' align='start center'>
                    <Icon name='add' sq={iconSize} lh={iconSize} fs='s' mr textAlign='center' />
                    New Board
                  </NavItem>
                  <NavItem href={`/${username}/boards/trash`} display='flex' align='start center'>
                    <Icon name='delete' sq={iconSize} lh={iconSize} fs='s' mr textAlign='center' />
                    Trash
                  </NavItem>
                </span>
            }
          </Menu>
        </Card>
      </Block>
      <Block w='col_main' maxWidth='714px'>
        {children}
      </Block>
      <Document onScroll={handleScroll(state, local, 230)} />
    </Flex>
  )
}

function handleScroll (state, local, threshold = 0) {
  return e => {
    const isScrolled = document.body.scrollTop >= threshold
    return state.isScrolled === isScrolled
      ? ''
      : local(setScrolled)(isScrolled)
  }
}



function boardIcon (board) {
  const {images = []} = board
  const [img] = images

  // Why 300? Who knows, but that is what we were doing before
  const url = img && img.url ? resize(img.url, 300) : ''

  return (
    <Block circle={25} mr bgColor='grey_light' align='center center' bgImg={url} bgSize='cover' bgPos='center'>
      {
        <Icon color='text' hide={img} fs='s' name='dashboard' />
      }
    </Block>
  )
}

/**
 * Helpers
 */

function cmp (a, b) {
  return a.displayName.toUpperCase() > b.displayName.toUpperCase() ? 1 : -1
}

/**
 * Actions
 */

const setScrolled = createAction('<ActivityLayout/>: set scrolled')

/**
 * Reducer
 */

const reducer = handleActions({
  [setScrolled]: (state, isScrolled) => ({
    ...state,
    isScrolled
  })
})

/**
 * Exports
 */

export default summon(({user, currentUser}) => ({
  boards: user._id === currentUser._id
    ? '/user/boards'
    : `/user/${user._id}/boards`,
}))({
  render,
  reducer
})
