import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import JournalEntry from './JournalEntry';
import EditEntry from './EditEntry';
import ShowEntry from './ShowEntry';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentModalId: -1,
            loading: true,
            showEntry: false,
            editEntry: false,
            allEntries: []
        };

        this.openModal = this.openModal.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.editEntry = this.editEntry.bind(this);
        this.fetchAllEntries = this.fetchAllEntries.bind(this);
    }

    fetchAllEntries() {
        fetch('http://localhost:3001/api/entries')
            .then(entries => entries.json())
            .then(data => {
                this.setState({ allEntries: data });
            });

        this.setState({ loading: false });
    }

    openModal(modalId) {
        this.setState({ 
            showEntry: true,
            currentModalId: modalId
        });
    }

    closeModal() {
        this.setState({ 
            showEntry: false,
            loading: true
        });

        this.fetchAllEntries();
    }

    componentDidMount() {
        this.fetchAllEntries();
    }

    openEdit() {
        this.setState({
            showEdit: true
        });
    }

    closeEdit() {
        this.setState({
            showEdit: false,
            loading: true
        });

        this.fetchAllEntries();
    }

    editEntry(idToEdit) {
        
    }

    render() {
        const entries = this.state.allEntries.map(entry => {
            return <JournalEntry 
                key={ entry.id } 
                id={ entry.id } 
                date={ entry.date } 
                climbingTime={ entry.climbing_time}
                openModal={ this.openModal }
                />;
        });

        return (
            <div>
                { this.state.showEntry && <ShowEntry id={ this.state.currentModalId } 
                                            closeModal={ this.closeModal }
                                            editEntry={ this.editEntry }
                                          /> 
                }
                { this.state.showEdit && <EditEntry closeEdit={ this.closeEdit }/> }


                <Alert variant='primary'>
                    This is a primary alert!
                </Alert>
                <h1>Hello!</h1>
		<Button variant="secondary" size="lg" onClick={ this.openEdit }>Add New Entry</Button>
                { this.state.loading && (
                        <Spinner animation="grow" variant="success">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                )}
                { entries }
            </div>
        );
    }
}

export default App;
