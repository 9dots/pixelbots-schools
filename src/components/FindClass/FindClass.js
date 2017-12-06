/**
 * Imports
 */

import { Dropdown, MenuItem } from 'vdux-containers'
import DropdownButton from 'components/DropdownButton'
import { component, element } from 'vdux'
import mapValues from '@f/map-values'
import { Block, Flex } from 'vdux-ui'
import filter from '@f/filter'
import fire from 'vdux-fire'
import map from '@f/map'

/**
 * <Find Class/>
 */

export default fire(props => ({
  userClasses: {
    ref: '/classes',
    list: Object.keys(props.user.teacherOf || {}),
    join: {
      ref: '/schools',
      child: 'school'
    }
  },
  schools: {
    ref: '/schools',
    list: Object.keys(props.user.schools || {}),
    join: {
      ref: '/classes',
      child: 'classes',
      childRef: (val, ref) => map((v, key) => ref.child(key), val.classes || {})
    }
  }
}))(
  component({
    render ({ props }) {
      const { schools, userClasses, currentClass, currentSchool = {} } = props
      if (!schools.value) return <span />
      const classes = getClasses(
        (currentSchool || {}).classes,
        userClasses.value
      )
      return (
        <Flex column align='center center'>
          <Dropdown
            z-index='1'
            btn={
              <DropdownButton
                bgColor='white'
                color='black'
                w='175px'
                text={currentSchool ? currentSchool.name : 'School'} />
            }>
            {schools.value
              ? mapValues(
                school => (
                  <MenuItem onClick={props.setSchool(school)}>
                    {' '}
                    {school.name}{' '}
                  </MenuItem>
                ),
                schools.value
              )
              : null}
          </Dropdown>
          <Block italic my='s'>
            and
          </Block>
          <Dropdown
            z-index='1'
            disabled={!currentSchool}
            btn={
              <DropdownButton
                disabled={!currentSchool}
                bgColor='white'
                color='black'
                w='175px'
                text={currentClass ? currentClass.displayName : 'Class'} />
            }>
            {currentSchool && classes.length > 0 ? (
              classes.map(cls => (
                <MenuItem key={cls.key} onClick={props.setClass(cls)}>
                  {cls.displayName}
                </MenuItem>
              ))
            ) : (
              <MenuItem hoverProps='none' color='disabled'>
                No classes to join
              </MenuItem>
            )}
          </Dropdown>
        </Flex>
      )
    }
  })
)

function getClasses (classes = {}, userClasses = {}) {
  return mapValues(
    val => val,
    filter(currClass => !(currClass.key in (userClasses || {})), classes)
  )
}
