import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ShowEntry.css'

class ShowEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            loading: true,
            showDeleteConfirmation: false,
            deleteConfirmationText: ""
        };

        this.deleteConfirmation = this.deleteConfirmation.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:3001/api/entries/" + this.state.id)
            .then(entry => entry.json())
            .then(data => {
                this.setState({
                    date: data.date,
                    entry: data.entry,
                    climbingTime: data.climbing_time,
                    warmupTime: data.warmup_time,
                    accomplishment: data.accomplishment,
                    currentGoal: data.current_goal,
                    weight: data.weight,
                    loading: false
                });
            });
    }

    handleTextChange(event) {
        this.setState({ deleteConfirmationText: event.target.value });
    }

    deleteConfirmation() {
        const displayDate = new Date(this.state.date).toDateString();
        if (this.state.showDeleteConfirmation && 
            this.state.deleteConfirmationText === displayDate) {

            fetch("http://localhost:3001/api/entries/" + this.state.id, { method: 'DELETE' })
                .then(res => { 
                    this.props.displayAlert("Entry for " + displayDate + 
                        " has successfully been deleted",
                        "danger");
                    this.props.closeView();
                });
        }
        else {
            this.setState({ showDeleteConfirmation: true });
        }
    }

    render() {
        const displayDate = new Date(this.state.date).toDateString();
        const deleteConfirmationClass = 
            this.state.deleteConfirmationText === displayDate ? 
            "approved-text" : "invalid-text";

        return (
            <Modal 
                show={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={ this.props.closeView }
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        { displayDate }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Entry: </strong> { this.state.entry }</p>
                    <p><strong>Climbing Time: </strong> { this.state.climbingTime }</p>
                    <p><strong>Warmup Time: </strong> { this.state.warmupTime }</p>
                    <p><strong>Proudest Moment: </strong> { this.state.accomplishment }</p>
                    <p><strong>Current Goal: </strong> { this.state.currentGoal }</p>
                    <p><strong>Weight: </strong> { this.state.weight }</p>
                    { this.state.showDeleteConfirmation && (
                        <div>
                            <hr/>
                            <h3>Delete This Entry?</h3>
                            <p>Are you sure you want to delete this entry? 
                                Type the date exactly as it appears to delete this entry.
                            </p>
                            <input type="text" 
                                className={ deleteConfirmationClass }
                                onChange={ this.handleTextChange } 
                                value={ this.state.deleteTextConfirmation } 
                            />
                       </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={ this.props.closeView }>Close</Button>
                    <Button variant="info" onClick={ () => { this.props.editEntry(this.state.id) }}>Edit</Button>
                    <Button variant="danger" onClick={ this.deleteConfirmation }>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ShowEntry;
