import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import JournalEntry from './JournalEntry';
import EntryInfo from './EntryInfo'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentModalId: -1,
            loading: true,
            showModal: false,
            allEntries: []
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
            showModal: true,
            currentModalId: modalId
        });
    }

    closeModal() {
        this.setState({ 
            showModal: false,
            loading: true
        });

        this.fetchAllEntries();
    }

    componentDidMount() {
        this.fetchAllEntries();
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
                { this.state.showModal && <EntryInfo id={ this.state.currentModalId } closeModal={ this.closeModal }/> }
                <Alert variant='primary'>
                    This is a primary alert!
                </Alert>
                <h1>Hello!</h1>
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
