import React from 'react';
import Alert from 'react-bootstrap/Alert';
import JournalEntry from './JournalEntry.js';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			allEntries: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3001/api/entries')
			.then(entries => entries.json())
			.then(data => {
				this.setState({ allEntries: data });
			});
	}

	render() {

		const entries = this.state.allEntries.map(entry => {
			return <JournalEntry 
				key={ entry.id } 
				id={ entry.id } 
				date={ entry.date } 
				climbingTime={ entry.climbing_time}
				/>;
		});

		return (
			<div>
				<Alert variant='primary'>
					This is a primary alert!
				</Alert>
				<h1>Hello!</h1>
				{ entries }
			</div>
		);
	}
}

export default App;
