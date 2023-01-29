import React from 'react';
import Services from './components/services.jsx';

import dataSign from './data/Sign.js';
import dataAbout from './data/About.js';
import dataGoogle from './data/Google.js';
import './styles.css';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Services</h1>
        <Services name="Sign" services={dataSign}  />
        <Services name="About" services={dataAbout}  />
        <Services name="Google" services={dataGoogle}  />
      </div>
    );
  }
};