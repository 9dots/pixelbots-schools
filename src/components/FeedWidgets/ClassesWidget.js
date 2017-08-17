/**
 * Imports
 */

import {Button, CSSContainer, wrap} from 'vdux-containers'
import ClassSettingsModal from 'modals/ClassSettingsModal'
import {Icon, Block, Card, Text, MenuItem} from 'vdux-ui'
import {stopPropagation, component, element} from 'vdux'
import CreateClassModal from 'modals/CreateClassModal'
import JoinSchoolModal from 'modals/JoinSchoolModal'
import SchoolCodeModal from 'modals/SchoolCodeModal'
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
      <Block {...props} mb borderWidth='1px 0'>
        {
          mapValues((school, id) => <SchoolItem schoolId={id} school={school} />, schools)
        }
        <AddClassItem Modal={CreateClassModal} text='Create/Join Class ' />
        <Block borderBottom='1px solid divider' />
        <AddSchoolItem />
      </Block>
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
      <Card mb>
        <School school={school}/>
        <Block>
          {
            mapValues((cls, id) => <Item clsId={id} cls={cls} />, school.classes)
          }
        </Block>
      </Card>
    )
  }
})

/**
 * <Item/>
 */

const Item = component({
  render ({props, actions}) {
    const {cls, clsId} = props
    const {displayName} = cls

    return (
      <Link
        currentProps={itemCurrentProps}
        borderLeft='3px solid transparent'
        hoverProps={{color: 'text'}}
        href={`/class/${clsId}`}
        align='start center'
        color='grey_medium'
        minHeight={42}
        ui={MenuItem}
        p>
        <Text capitalize flex bolder>{displayName}</Text>
      </Link>
    )
  }
})

/**
 * <Item/>
 */

const School = component({
  render ({props, actions}) {
    const {school} = props
    const {name} = school

    return (
      <Block
        currentProps={itemCurrentProps}
        align='start center'
        relative
        borderBottom='1px solid divider'
        p>
        <Text capitalize flex letterSpacing='1px'>{name}</Text>
        <Block onClick={stopPropagation} align='end center'>
          <Button
            onClick={actions.schoolInfo}
            activeProps={itemActiveProps}
            hoverProps={itemHoverProps}
            py='5'
            px
            fs='xxs'>
            Code
          </Button>
        </Block>
      </Block>
    )
  },

  controller: {
    * schoolInfo ({context, props}) {
      yield context.openModal(() => <SchoolCodeModal school={props.school} />)
    }
  }
})


/**
 * <AddClassItem/>
 */

const AddClassItem = component({
  render ({props, actions}) {
    const {text} = props

    return (
      <Card>
        <Link ui={MenuItem} hoverProps={{color: 'text'}} onClick={actions.openModal} py='m' color='grey_medium' bolder display='flex' align='start center'>
          <Icon name='class' fs='s' mr='m' circle='29' bgColor='green' align='center center' color='white' bolder />
          {text}
        </Link>
      </Card>
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
 * <AddClassItem/>
 */

const AddSchoolItem = component({
  render ({props, actions}) {
    const {text} = props

    return (
      <Card>
        <Link ui={MenuItem} hoverProps={{color: 'text'}} onClick={actions.openModal} py='m' color='grey_medium' bolder display='flex' align='start center'>
          <Icon name='school' fs='s' mr='m' circle='29' bgColor='blue' align='center center' color='white' bolder />
          Create/Join School
        </Link>
      </Card>
    )
  },

  controller: {
    * openModal ({props, context}) {
      yield context.openModal(() => <JoinSchoolModal enableDismiss />)
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
