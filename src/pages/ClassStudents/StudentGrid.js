/**
 * Imports
 */

import {Checkbox, Table, TableHeader, TableCell, Block, Icon} from 'vdux-ui'
import {wrap, CSSContainer, TableRow, Text} from 'vdux-containers'
import {preventDefault, component, element} from 'vdux'
import StudentDropdown from './StudentDropdown'
import Avatar from 'components/Avatar'
import mapValues from '@f/map-values'
import Link from 'components/Link'
import getProp from '@f/get-prop'
import index from '@f/index'

/**
 * <StudentGrid/> in class -> students page
 */

export default component({
  render ({props, actions}) {
    const {students, selected, group, toggleAll, currentUser} = props
    const isStudent = currentUser.userType === 'student'
    const selMap = index(selected)
    const allSelected = students.length === selected.length
    const indeterminate = !allSelected && selected.length
    const sort = {dir: 1, property: 'displayName'}
    const sortedStudents = students//.sort(cmp)

    return (
      <Table bgColor='white' wide tall>
        <TableRow py bgColor='grey' color='white'>
          <TableHeader p w='50' hide={isStudent}>
            <Checkbox checked={allSelected} indeterminate={indeterminate} onChange={toggleAll('selected')} />
          </TableHeader>
          <StudentHeader text='Name' prop='displayName' sort={sort} setSort={actions.setSort} />
          <StudentHeader text='Username' prop='username' sort={sort} setSort={actions.setSort} />
          <TableHeader hide={isStudent} />
        </TableRow>
        {
          sortedStudents.map(student => (
            <StudentRow group={group} student={student} highlight={!!selMap[student.id]} selected={!!selMap[student.id]} isStudent={isStudent} />
          ))
        }
      </Table>
    )

    function cmp (a, b) {
      if (!sort) return
      const prop = sort.property
      const bool = norm(prop, a) === norm(prop, b)
        ? norm('displayName', a) > norm('displayName', b)
        : norm(prop, a) > norm(prop, b)

      return bool ? 1 * sort.dir : -1 * sort.dir

      function norm(prop, obj) {
        return getProp(prop, obj).toUpperCase()
      }
    }
  },

  controller: {
    * setSort ({props}, prop) {
      const {setPref, prefs} = props
      const sort = prefs.peopleSort || {dir: 1, property: 'displayName'}

      yield setPref('peopleSort', {
        property: prop,
        dir: prop === sort.property ? sort.dir * -1 : 1
      })
    }
  }
})

/**
 * <StudentHeader/>
 */

const StudentHeader = wrap(CSSContainer, {p: true, textAlign: 'left', hoverProps: {hover: true}})({
  render ({props}) {
    const {hover, sort, prop, text, setSort, ...rest} = props

    return (
      <TableHeader pointer onClick={setSort(prop)} {...rest}>
        <Block align='start center'>
          <Text underline={hover}>
            {text}
          </Text>
          <Icon
            name={'arrow_drop_' + (sort.dir === 1 ? 'down' : 'up')}
            hidden={sort.property !== prop}
            ml='s'
            fs='s' />
        </Block>
      </TableHeader>
    )
  }
})

/**
 * Constants
 */

const underline = {underline: true}
const cellProps = {p: '10px 12px'}

/**
 * <StudentRow/>
 */

const StudentRow = wrap(CSSContainer, {
  hoverProps: {
    highlight: true,
    showSettings: true
  }
})(component({
  render ({props, actions}) {
    const {student, selected, group, highlight, showSettings, isStudent} = props
    const {username, displayName} = student

    return (
      <TableRow tag={isStudent ? 'tr' : 'label'} display='table-row' py bgColor={highlight && !isStudent ? '#fafdfe' : 'white'} borderBottom='1px solid grey_light'>
        <TableCell {...cellProps} hide={isStudent}>
          <Checkbox name='selected[]' value={student.id} checked={selected} />
        </TableCell>
        <TableCell {...cellProps}>
          <Block hoverProps={underline}>
            {displayName}
          </Block>
        </TableCell>
        <TableCell {...cellProps}>
          <Block hoverProps={underline}>
            {username}
          </Block>
        </TableCell>
        <TableCell {...cellProps} textAlign='right' hide={isStudent}>
          <StudentDropdown
            group={group}
            onClick={preventDefault}
            showSettings={showSettings}
            student={student} />
        </TableCell>
      </TableRow>
    )
  }
}))
