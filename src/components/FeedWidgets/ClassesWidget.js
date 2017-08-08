/**
 * Imports
 */

import {Button, CSSContainer, wrap} from 'vdux-containers'
import ClassSettingsModal from 'modals/ClassSettingsModal'
import {Icon, Block, Card, Text, MenuItem} from 'vdux-ui'
import {stopPropagation, component, element} from 'vdux'
import CreateClassModal from 'modals/CreateClassModal'
import JoinClassModal from 'modals/JoinClassModal'
import RoundedInput from 'components/RoundedInput'
import Link from 'components/Link'
import fire from 'vdux-fire'

/**
 * Constants
 */

const itemCurrentProps = {borderLeftColor: 'blue', highlight: 0.03, color: 'text'}
const itemActiveProps = {opacity: 0.7}
const itemHoverProps = {opacity: 1}
const allClasses = {_id: 'all', displayName: 'All Classes'}
const alignLeft = {textAlign: 'left'}

/**
 * <ClassesWidget/>
 */

export default component({
  render ({props, context, actions}) {
    const {user} = props
    const {teacherOf = {}} = user
    const offset = clsLength ? '318px' : '270px'
    const classes = Object.keys(teacherOf)
    const clsLength = classes.length

    return (
      <Card {...props}>
        <Block maxHeight={`calc(100vh - ${offset})`} overflow='auto' border='1px solid rgba(grey,0.05)' borderWidth='1px 0'>
          {[
            classes.map(id => <Item clsId={id} hasSettings />),
            <AddClassItem Modal={CreateClassModal} text='New Class' />
          ]}
        </Block>
        <Block boxShadow='0 -2px 1px rgba(grey,0.1)' z='1' relative p />
      </Card>
    )
  }
})

/**
 * <Item/>
 */

const Item = fire(props => ({
  cls: `/classes/${props.clsId}`
}))(wrap(CSSContainer, {
  hoverProps: {showIcon: true}
})(component({
  render ({props, actions}) {
    const {cls, clsId, hasSettings, showIcon} = props

    if (cls.loading) return <span/>

    const {value} = cls
    const {displayName} = value

    return (
      <Link
        currentProps={itemCurrentProps}
        borderLeft='3px solid transparent'
        href={`/class/${clsId}`}
        align='start center'
        ui={MenuItem}
        color='grey_medium'
        hoverProps={{color: 'text'}}
        p>
        <Block circle='25px' lh='25px' mr textAlign='center' bg='green' color='white' uppercase>{displayName[0]}</Block>
        <Text capitalize flex bolder>{displayName}</Text>
        <Block onClick={stopPropagation} align='end center'>
          <Button
            onClick={actions.classSettings}
            activeProps={itemActiveProps}
            hoverProps={itemHoverProps}
            hide={!(hasSettings && showIcon)}
            icon='settings'
            opacity={0.7}
            color='text'
            fs='xs' />
        </Block>
      </Link>
    )
  },

  controller: {
    * classSettings ({context, props}) {
      yield context.openModal(() => <ClassSettingsModal group={props.cls.value} groupId={props.clsId} />)
    }
  }
})))

/**
 * <AddClassItem/>
 */

const AddClassItem = component({
  render ({props, actions}) {
    const {text} = props

    return (
      <Link ui={MenuItem} hoverProps={{color: 'text'}} onClick={actions.openModal} py='m' color='grey_medium' bolder display='flex' align='start center'>
        <Icon name='add' fs='s' mr='m' sq='25' textAlign='center' bolder />
        {text}
      </Link>
    )
  },

  controller: {
    * openModal ({props, context}) {
      const {Modal} = props
      yield context.openModal(() => <Modal />)
    }
  }
})

/**
 * Helpers
 */

function cmp (a, b) {
  return a.displayName.toUpperCase() > b.displayName.toUpperCase()
    ? 1
    : -1
}

function search (text = '') {
  text = text.toUpperCase()
  return cls => !text
    ? true
    : cls.displayName.toUpperCase().indexOf(text) !== -1
}
