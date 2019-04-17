import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class EntryInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            loading: true
        }
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

    render() {

        const displayDate = new Date(this.state.date).toDateString();

        return (
            <Modal 
                show={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={ this.props.closeModal }
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
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ this.props.closeModal }>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EntryInfo;
