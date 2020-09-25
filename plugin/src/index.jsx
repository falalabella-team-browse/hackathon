import React from 'react';
import ReactDOM from 'react-dom';
import RootContainer from './containers/Root/Root';


const load = (element) => {
    ReactDOM.render(<RootContainer />, element)
}

if (process.env.NODE_ENV !== "production") {
    load(document.getElementById("reviews"));
} else {
    window.RNR = { load }
}