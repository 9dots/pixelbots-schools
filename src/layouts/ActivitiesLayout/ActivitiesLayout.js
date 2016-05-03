/**
 * Imports
 */

import {Block, Flex, Card, Menu, MenuItem, Divider} from 'vdux-containers'
import AppLayout from 'layouts/App'
import Link from 'components/Link'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <MyActivities/> page
 */

function render ({props, children}) {
  const {boards = [], activities = []} = props

  return (
    <AppLayout {...props}>
      <Flex w='col_main' mx='auto' px='s' mt='s'>
        <Card w={230} mr='m'>
          <Menu column>
            <Item href='/activities/all'>All Activities</Item>
            {
              map(board => <Item>{board.name}</Item>, boards)
            }
            <Item href='/activities/drafts'>Drafts</Item>
            <Divider/>
            <Item>New Board</Item>
            <Item href='/activities/trash'>Trash</Item>
          </Menu>
        </Card>
        <Block w='col_main' maxWidth='714px'>
          {children}
        </Block>
      </Flex>
    </AppLayout>
  )
}

function Item ({props, children}) {
  return (
    <Link
      ui={MenuItem}
      {...props}
      borderLeft='3px solid transparent'
      currentProps={{borderLeftColor: 'blue', highlight: true}}>
      {children}
    </Link>
  )
}


/**
 * Exports
 */

export default {
  render
}
