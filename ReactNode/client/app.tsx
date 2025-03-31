import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { SearchBox } from './components/SearchBox';
import axios from 'axios';

//data will be the string we send from our server
const apiCall = () => {
    axios.get('http://localhost:3000').then((data) => {
        //this console.log will be in our frontend console
        console.log(data)
    })
}

class Hello extends React.Component {
    render() {
        return (
            <div>
                <SearchBox />
                <button onClick={apiCall}> Make API CALL</button>
            </div>
        );
    }
}

ReactDOM.render(<Hello />, document.getElementById('root'));