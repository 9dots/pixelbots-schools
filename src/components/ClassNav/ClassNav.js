/**
 * Imports
 */

import {Block, Dropdown, MenuItem, Icon, Divider, CSSContainer} from 'vdux-containers'
import LineInput from 'components/LineInput'
import element from 'vdux/element'
import map from '@f/map'
import ClassItem from './ClassItem'

/**
 * <ClassNav/>
 */

function render ({props, children}) {
  const {classes = []} = props

  return (
    <Dropdown btn={<div>{children}</div>} bg='white' color='black' maxHeight={350} overflow='auto' mt='-6' w='200' left>
      <Block bg='transparent' pt='s' px onClick={e => e.stopPropagation()}>
        <LineInput type='search' placeholder='Filter classes…' focusProps={{highlight: true}} />
      </Block>
      {
        map(cls => <ClassItem cls={cls} />, classes)
      }
      <Divider />
      <MenuItem py='m' color='text_color' display='flex' align='start center'>
        <Icon name='add' fs='s' mr='m' sq='25' textAlign='center' />
        New Class
      </MenuItem>
    </Dropdown>
  )
}

/**
 * Exports
 */

export default {
  render
}
