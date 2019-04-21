import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import JournalEntry from './JournalEntry';
import EditEntry from './EditEntry';
import ShowEntry from './ShowEntry';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            showAlert: false,
            alertMessage: "",
            alertLevel: "",
            currentViewId: -1,
            currentEditId: -1,
            loading: true,
            showEntry: false,
            showEdit: false,
            allEntries: []
        };

        this.fetchAllEntries = this.fetchAllEntries.bind(this);
        this.displayAlert = this.displayAlert.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.openView = this.openView.bind(this);
        this.closeView = this.closeView.bind(this);
        this.openEdit = this.openEdit.bind(this);
        this.closeEdit = this.closeEdit.bind(this);
        this.editEntry = this.editEntry.bind(this);
    }

    fetchAllEntries() {
        fetch('http://localhost:3001/api/entries')
            .then(entries => entries.json())
            .then(data => {
                this.setState({ allEntries: data });
            });

        this.setState({ loading: false });
    }

    displayAlert(message, level) {
        this.setState({
            showAlert: true,
            alertMessage: message,
            alertLevel: level,
            alertTimer: setInterval(this.hideAlert, 5000)
        });
    }

    hideAlert() {
        clearInterval(this.state.alertTimer);

        this.setState({
            showAlert: false,
            alertMessage: "",
            alertLevel: ""
        });
    }

    openView(viewId) {
        this.setState({ 
            showEntry: true,
            currentViewId: viewId
        });
    }

    closeView() {
        this.setState({ 
            showEntry: false,
            loading: true,
            currentViewId: -1
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
            loading: true,
            currentEditId: -1,
            currentViewId: -1
        });

        this.fetchAllEntries();
    }

    editEntry(id) {
        this.setState({
            currentEditId: id,
            currentViewId: -1,
            showEntry: false,
            showEdit: true
        });
    }

    render() {
        const entries = this.state.allEntries.map(entry => {
            return <JournalEntry 
                key={ entry.id } 
                id={ entry.id } 
                date={ entry.date } 
                climbingTime={ entry.climbing_time}
                openView={ this.openView }
                />;
        });

        return (
            <div>
                { this.state.showEntry && 
                    <ShowEntry id={ this.state.currentViewId } 
                        closeView={ this.closeView }
                        displayAlert={ this.displayAlert }
                        editEntry={ this.editEntry }
                    /> 
                }

                { this.state.showEdit && 
                    <EditEntry 
                        closeEdit={ this.closeEdit }
                        displayAlert={ this.displayAlert }
                        editId={ this.state.currentEditId }
                    /> 
                }

                { this.state.showAlert && 
                    <Alert variant={ this.state.alertLevel }>{ this.state.alertMessage }</Alert>
                }

                <Row>
                <Col xs={6}>
                    <h1>Climbing Journal</h1>
                </Col>
                <Col xs={6}>
		            <Button variant="secondary" size="lg" onClick={ this.openEdit }>Add New Entry</Button>
                </Col>
                </Row>
                <Row>
                    { this.state.loading && (
                            <Spinner animation="grow" variant="success">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                    )}
                    { entries }
                </Row>
            </div>
        );
    }
}

export default App;
