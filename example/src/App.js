import React, { Component } from 'react'

import Toggleable from './Toggleable';
import OnOff from './OnOff';


export default class App extends Component {

  render () {
    return (
      <div>
        <Toggleable/>
        <OnOff/>
      </div>
    )
  }
}

