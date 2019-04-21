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
            id: this.props.id,
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

    componentDidMount() {}

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
        console.log("saving!"); 
        fetch("http://localhost:3001/api/entries", { 
                method: 'POST',
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
            .then(() => { this.props.closeEdit() });
    }

    render() {
        const title = this.state.editEntry ?
            new Date(this.state.date).toDateString() :
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
