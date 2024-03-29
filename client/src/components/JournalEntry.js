import React from 'react';
import Card from 'react-bootstrap/Card';

class JournalEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: this.props.date,
            id: this.props.id,
            climbingTime: this.props.climbingTime
        };
    }

    render() {
        const displayDate = new Date(this.state.date).toDateString();

        return (
            <Card 
                bg="light" 
                style={{ 
                    width: '18rem', height: '10rem',
                    margin: '2rem auto', display: 'inline-block' 
                }}
                onClick={ () => { this.props.openView(this.state.id) }}>
                <Card.Header>{ displayDate }</Card.Header>
                <Card.Body>
                <Card.Title>Time Climbed:</Card.Title> { this.state.climbingTime }
                </Card.Body>
            </Card>
        );
    }
}

export default JournalEntry;
