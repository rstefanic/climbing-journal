import React from 'react';

class JournalEntry extends React.Component {

    render() {
        return (
            <div className="entry">
                <h1>{ this.props.id }</h1>
            </div>
        );
    }
}

export default JournalEntry;
