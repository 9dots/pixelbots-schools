/**
 * Imports
 */

import {Block, Flex, Card, Menu, MenuItem, Divider} from 'vdux-containers'
import {Icon} from 'vdux-ui'
import WeoIcon from 'components/WeoIcon'
import AppLayout from 'layouts/AppLayout'
import Link from 'components/Link'
import element from 'vdux/element'
import map from '@f/map'

/**
 * <MyActivities/> page
 */

function render ({props, children}) {
  const {boards = [], activities = []} = props
  const iconSize = '25px'

  return (
    <AppLayout {...props}>
      <Flex w='col_main' mt='s' mx='auto' px='s' py='l'>
        <Block>
          <Card w={230} mr='m'>
            <Menu column>
              <Item href='/activities/all' display='flex' align='start center'>
                <Icon name='assignment' color='white' bg='green' circle={iconSize} lh={iconSize} fs='s' mr='m' textAlign='center' />
                All Activities
              </Item>
              {
                map(board => <Item display='flex' align='start center'>{board.name}</Item>, boards)
              }
              <Item href='/activities/drafts' display='flex' align='start center'>
                <WeoIcon name='draft' color='white' bg='yellow' circle={iconSize} lh={iconSize} fs='s' fw='bolder' mr='m' textAlign='center' />
                Drafts
              </Item>
              <Divider/>
              <Item display='flex' align='start center'>
                <Icon name='add' sq={iconSize} lh={iconSize} fs='s' mr='m' textAlign='center' />
                New Board
              </Item>
              <Item href='/activities/trash' display='flex' align='start center'>
                <Icon name='delete' sq={iconSize} lh={iconSize} fs='s' mr='m' textAlign='center' />
                Trash
              </Item>
            </Menu>
          </Card>
        </Block>
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
      py='m'
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
