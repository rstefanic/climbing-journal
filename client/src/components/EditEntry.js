import React from 'react';
import DatePicker from 'react-datepicker';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

import 'react-datepicker/dist/react-datepicker.css';
import './EditEntry.css'

class EditEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.editId,
            method: 'POST',
            fetchURL: 'http://localhost:3001/api/entries/',
            editEntry: false,
            date: new Date(),
            entry: "",
            climbingTime: "",
            warmupTime: "",
            accomplishment: "",
            currentGoal: "",
            weight: "",
            loading: true
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveEntry = this.saveEntry.bind(this);
    }

    componentDidMount() {
        // If the id is -1, then it's a new entry
        if (this.state.id === -1) {
            return;
        }
        
        // Otherwise we're editing an existing entry, and we have to 
        // grab the entry and change the method when we send
        // information to the server

        fetch(this.state.fetchURL + this.state.id)
            .then(entry => entry.json())
            .then(data => {
                this.setState({
                    date: new Date(data.date),
                    entry: data.entry,
                    climbingTime: data.climbing_time,
                    warmupTime: data.warmup_time,
                    accomplishment: data.accomplishment,
                    currentGoal: data.current_goal,
                    weight: data.weight,
                    loading: false,
                    method: 'PUT',
                    fetchURL: 'http://localhost:3001/api/entries/' + this.state.id,
                    editEntry: true
            })
        });
    }

    handleDateChange(newDate) {
        this.setState({
            date: newDate
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveEntry() {
        fetch(this.state.fetchURL, { 
                method: this.state.method,
                body: JSON.stringify({
                    date: this.state.date,
                    entry: this.state.entry,
                    climbing_time: this.state.climbingTime,
                    warmup_time: this.state.warmupTime,
                    accomplishment: this.state.accomplishment,
                    current_goal: this.state.currentGoal,
                    weight: this.state.weight
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => { return res.json() })
            .then(data => { 
                if(this.state.method === 'POST') {
                    this.props.displayAlert("New entry for " + 
                        this.state.date.toDateString() + 
                        " has successfully been created.",
                        "success"
                    );
                }
                else {
                    this.props.displayAlert("Entry for " + 
                        this.state.date.toDateString() + 
                        " has successfully been updated.",
                        "success"
                    );
                }
            })
            .then(() => { this.props.closeEdit() });
    }

    render() {
        const title = this.state.editEntry ?
            "Edit entry for " + new Date(this.state.date).toDateString() :
            "Add New Entry";

        return (
            <Modal 
                show={true}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={ this.props.closeEdit }
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        { title }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col><label>Date: </label></Col>
                        <Col><DatePicker
                            selected={ this.state.date } 
                            onChange={ this.handleDateChange }
                        /></Col>
                    </Row>
                    <Row>
                        <Col><label>Climbing Time: </label></Col>
                        <Col><input 
                            type="text"
                            name="climbingTime"
                            value={ this.state.climbingTime }
                            onChange={ this.handleChange }
                        /></Col>
                    </Row>
                    <Row>
                        <Col><label>Warmup Time: </label></Col>
                        <Col><input 
                            type="text"
                            name="warmupTime"
                            value={ this.state.warmupTime }
                            onChange={ this.handleChange }
                        /></Col>
                    </Row>
                    <Row>
                        <Col><label>Accomplisment: </label></Col>
                        <Col><input 
                            type="text"
                            name="accomplishment"
                            value={ this.state.accomplishment }
                            onChange={ this.handleChange }
                        /></Col>
                    </Row>
                    <Row>
                        <Col><label>Current Goal: </label></Col>
                        <Col><input 
                            type="text"
                            name="currentGoal"
                            value={ this.state.currentGoal }
                            onChange={ this.handleChange }
                        /></Col>
                    </Row>
                    <Row>
                        <Col><label>Current Weight: </label></Col>
                        <Col><input 
                            type="text"
                            name="weight"
                            value={ this.state.weight }
                            onChange={ this.handleChange }
                        /></Col>
                    </Row>
                    <Row>
                        <Col xs={3}><label>Entry: </label></Col>
                        <Col xs={9}><textarea 
                            type="text"
                            name="entry"
                            value={ this.state.entry }
                            onChange={ this.handleChange }
                        /></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ this.props.closeEdit }>Cancel</Button>
                    <Button variant="success" onClick={ this.saveEntry }>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EditEntry;
