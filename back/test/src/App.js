import React from 'react';
import './styles.css';
import Services from './components/services.jsx';

import dataSign from './data/Sign.js';
import dataAbout from './data/About.js';
import dataGithub from './data/Github.js';
import dataGoogle from './data/Google.js';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <h1>Services</h1>
        <Services name="About" services={dataAbout}  />
        <Services name="Sign" services={dataSign}  />
        <Services name="Github" services={dataGithub}  />
        <Services name="Google" services={dataGoogle}  />
      </div>
    );
  }
};