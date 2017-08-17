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
import mapValues from '@f/map-values'
import Link from 'components/Link'
import filter from '@f/filter'
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

export default fire(props => ({
  classes: {
    ref: '/classes',
    list: Object.keys(props.user.teacherOf),
    join: {
      ref: '/schools',
      child: 'school'
    }
  }
}))(component({
  render ({props, context, actions}) {
    const {user, classes} = props
    const {teacherOf = {}, classSchools = {}} = user
    const offset = clsLength ? '318px' : '270px'
    const clsLength = Object.keys(teacherOf).length

    if (classes.loading) return <span/>

    const schools = Object
      .keys(classes.value)
      .reduce((acc, id) => {
        const cls = classes.value[id]
        if (!acc[cls.school.key]) {
          acc[cls.school.key] = {
            ...cls.school,
            classes: {}
          }
        }

        acc[cls.school.key].classes[id] = cls
        return acc
      }, {})

    return (
      <Card {...props}>
        <Block maxHeight={`calc(100vh - ${offset})`} overflow='auto' border='1px solid rgba(grey,0.05)' borderWidth='1px 0'>
          {
            mapValues((school, id) => <SchoolItem schoolId={id} school={school} />, schools)
          }
          <AddClassItem Modal={CreateClassModal} text='New Class' />
        </Block>
        <Block boxShadow='0 -2px 1px rgba(grey,0.1)' z='1' relative p />
      </Card>
    )
  }
}))

/**
 * <SchoolItem/>
 */

const SchoolItem = component({
  render ({props}) {
    const {school} = props

    return (
      <Block>
        {school.name}
        <Block>
          {
            mapValues((cls, id) => <Item clsId={id} cls={cls} hasSettings />, school.classes)
          }
        </Block>
      </Block>
    )
  }
})

/**
 * <Item/>
 */

const Item = wrap(CSSContainer, {
  hoverProps: {showIcon: true}
})(component({
  render ({props, actions}) {
    const {cls, clsId, hasSettings, showIcon} = props
    const {displayName} = cls

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
        <Text capitalize flex fs='xs'>{cls.school.name}</Text>
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
}))

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
      yield context.openModal(() => <Modal userId={context.userId} />)
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
