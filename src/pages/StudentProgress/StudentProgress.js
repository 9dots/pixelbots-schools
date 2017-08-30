/**
 * Imports
 */

import {Block, Icon, Table, TableHeader, TableRow, TableCell, Image} from 'vdux-ui'
import {component, element} from 'vdux'
import {Button} from 'vdux-containers'
import fire from 'vdux-fire'

/**
 * <Student Progress/>
 */

export default component({
  render ({props, context}) {
  	const {instances, sequence, studentId, classRef, playlistRef, students} = props
  	const instance = instances[studentId] || {}
  	const {challengeScores = {}} = instance
  	const backUrl = `/activity/${classRef}/${playlistRef}`
  	const student = students[studentId]

    return (
    	<Block w='col_main' m='auto' bgColor='white' boxShadow='card' mb p>
    		<Block align='start center' mb>
	  			<Button mr='l' px onClick={context.setUrl(backUrl)}>
	  				<Icon name='arrow_back' fs='s' mr='s'/>
	  				Back
	  			</Button>
	  			<Block fs='s' lighter>
	  				{student.displayName}
	  			</Block>
  			</Block>
    		<Table wide>
	    		<TableRow borderBottom='1px solid divider' bgColor='grey' color='white' fs='s'>
	    			<TableHeader lighter p textAlign='left'>
	    				Title
	    			</TableHeader>
	    			<TableHeader lighter p textAlign='left'>
	    				Status
	    			</TableHeader>
	    			<TableHeader lighter p textAlign='left'>
	    				Goals
	    			</TableHeader>
	    			<TableHeader lighter p textAlign='left' />
	    		</TableRow>
	    		{
	    			sequence.map((val, key) => 
	    				<Row completed={challengeScores[val]} log={console.log(val)} ref={val} i={key} />
  					)
	    		}
    		</Table>
    	</Block>
    )
  }
})

const Row = fire(({ref}) => ({
	game: `/games/${ref}[once]`
}))(component({
	render({props, children}) {
		const {completed, i, game} = props
		const {value} = game
		
		if(game.loading) return <span/>

		const imgUrl = value.imageUrl.indexOf('/animalImages') === -1 
			? value.imageUrl
			: 'https://www.pixelbots.io/' + value.imageUrl

		return (
			<TableRow border='1px solid divider' borderTopWidth={0}> 
				<TableCell p>
					<Block align='start center'>
						<Image sq={50} mr src={imgUrl} outline='1px solid #EEE' outlineOffset='-1px' />
						{
						// <Circle size='32' bg='#AAA' mr>
						// 	{i + 1}
						// </Circle>
						}
						{value.title}
					</Block>
				</TableCell>
				<TableCell p> 
					<Block align='start center' fs='xs'>
						<Circle size={26} bg={completed ? 'green' : 'red'} mr>
							<Icon name={completed ? 'check' : 'close'} fs='s'/>
						</Circle>
						{completed ? 'Complete' : 'Incomplete'}
					</Block>
				</TableCell>
				<TableCell p>
					{
						Math.random() >= 0.3 
							? Math.random() >= 0.5 ? 'Achieved' : 'Failed'
							: '-'
					}
				</TableCell>
				<TableCell p textAlign='right'>
					<a target='_blank' href='https://www.pixelbots.io'>
						<Button px='m'>View</Button>
					</a>
				</TableCell>
			</TableRow>
		)
	}
}))

const Circle = component({
	render({props, children}) {
		const {size = 32, ...rest} = props 
		return (
			<Block color='white' bg='blue' align='center center' fs='xs' circle={size} {...rest}>
				{children}
			</Block>
		)
	}
})
