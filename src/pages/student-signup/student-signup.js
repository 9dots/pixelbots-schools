/**
 * Imports
 */

import StudentSignup from 'components/student-signup'
import HomeLayout from 'layouts/home'
import element from 'vdux/element'
import css from 'jss-simple'

/**
 * studentSignup
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
