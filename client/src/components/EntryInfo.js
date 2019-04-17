import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class EntryInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
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
                        TEST HEADER
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Testing...
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ this.props.closeModal }>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default EntryInfo;
