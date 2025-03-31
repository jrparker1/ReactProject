import * as React from 'react';

export class SearchBox extends React.Component {
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <label>
                    Text input: <input type="text" name="myInput" style={{ marginLeft: '10px' }} />
                </label>
            </div>
        );
    }
}