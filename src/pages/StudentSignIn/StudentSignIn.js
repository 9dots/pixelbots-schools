/**
 * Imports
 */

import ClassListLoader from 'components/ClassListLoader'
import {MenuItem, Button} from 'vdux-containers'
import {component, element} from 'vdux'
import mapValues from '@f/map-values'
import {Block, Menu} from 'vdux-ui'
import enroute from 'enroute'
import fire from 'vdux-fire'

const router = enroute({
	classList: (params, props) => <ClassList {...props}/>,
	studentList: (params, props) => <StudentList {...props}/>
})

/**
 * <Student Sign In/>
 */


export default component({
  render ({props, context}) {
  	const {classId} = props
  	const route = classId ? 'studentList' : 'classList'

    return (
    	<Block key={route} column w='col_s' h={400} p='l' bgColor='white' boxShadow='0 1px 2px rgba(0,0,0,.3)'>
    		{router(route, props)}
    	</Block>
    )
  }
})

const StudentList = fire(({classId}) => ({
	classInfo: {
		ref: `/classes/${classId}`,
	},
}))(component({
  render ({props, context}) {
  	const {classInfo} = props
  	if (classInfo.loading) return <span/>
  	console.log(classInfo.value)

    return (
    	<Block>
    		<Block fs='m' pb='l'>Select Your Name</Block>
				<Menu flex column>
    			{mapValues((val, key) => (
    				<MenuItem key={key}>{val.displayName}</MenuItem>
    			), classInfo.value.students)}
    		</Menu>
    	</Block>
    )
  }
}))

const ClassList = fire(({schoolId}) => ({
	school: {
		ref: `/schools/${schoolId}`,
		join: {
			ref: '/classes',
			child: 'classes',
			childRef: (val, ref) => mapValues((val, key) => ref.child(key), val.classes)
		}
	},
}))(component({
  render ({props, context}) {
  	const {school} = props
  	if (school.loading) return <span/>
  	console.log(school.value)

    return (
    	<Block>
    		<Block fs='m' pb='l'>Select Your Class</Block>
    		<Menu flex column>
    			{mapValues((val, key) => (
    				<MenuItem onClick={context.setUrl(`/schools/abc1234/${key}`)} key={key}>{val.displayName}</MenuItem>
    			), school.value.classes)}
    		</Menu>
    	</Block>
    )
  }
}))
