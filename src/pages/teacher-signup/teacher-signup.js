/**
 * Imports
 */

import TeacherSignup from 'components/teacher-signup'
import HomeLayout from 'layouts/home'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * Teacher signup page
 */

function render () {
  return (
    <HomeLayout action='login'>
      <TeacherSignup />
    </HomeLayout>
  )
}

/**
 * Exports
 */

export default {
  render
}
