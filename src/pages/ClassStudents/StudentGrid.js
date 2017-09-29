/**
 * Imports
 */

import {Checkbox, Table, TableHeader, TableCell, Block, Icon, Image} from 'vdux-ui'
import {wrap, CSSContainer, TableRow, Text} from 'vdux-containers'
import {preventDefault, component, element} from 'vdux'
import StudentDropdown from './StudentDropdown'
import Avatar from 'components/Avatar'
import mapValues from '@f/map-values'
import Link from 'components/Link'
import getProp from '@f/get-prop'
import index from '@f/index'
import {apple, bat, bea, butterfly, camel,
  cupcake, dino, don, elephant, gorilla,
  kitty, lotus, monster, narwhal, octopus,
  penguin, pop, potato, rabbit, ramen,
  redpanda, remy, rhino, tiger, whale, yellow} from './avatars/index.js'

/**
 * <StudentGrid/> in class -> students page
 */

const animalImages= {"apple": apple, "bat": bat, "bea": bea, "butterfly": butterfly, "camel": camel,
"cupcake": cupcake, "dino": dino, "don": don, "elephant": elephant, "gorilla": gorilla,
"kitty": kitty, "lotus": lotus, "monster": monster, "narwhal": narwhal, "octopus": octopus,
"penguin": penguin, "pop": pop, "potato": potato, "rabbit": rabbit, "ramen": ramen,
"redpanda": redpanda, "remy": remy, "rhino": rhino, "tiger": tiger, "whale":whale, "yellow": yellow }

export default component({
  render ({props, actions}) {
    const {students, selected, group, groupId, toggleAll, currentUser, showPasswords} = props
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
          {showPasswords ? <StudentHeader text='Password' prop='pictureName' sort={sort} setSort={actions.setSort} /> : null }
          <TableHeader hide={isStudent} />
        </TableRow>
        {
          sortedStudents.map(student => (
            <StudentRow group={group} showPasswords={showPasswords} groupId={groupId} student={student} highlight={!!selMap[student.id]} selected={!!selMap[student.id]} isStudent={isStudent} />
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
    const {student, selected, group, groupId, highlight, showSettings, isStudent, showPasswords} = props
    const {username, displayName,pictureName} = student

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
        {showPasswords ? 
        <TableCell {...cellProps}>
          <Block hoverProps={underline}>
            <Image h='100px' w='100px' src={animalImages[pictureName]} />
          </Block>
        </TableCell> : null }
        <TableCell {...cellProps} textAlign='right' hide={isStudent}>
          <StudentDropdown
            showPasswords = {showPasswords}
            group={group}
            groupId={groupId}
            onClick={preventDefault}
            showSettings={showSettings}
            student={student} />
        </TableCell>
      </TableRow>
    )
  }

}))
