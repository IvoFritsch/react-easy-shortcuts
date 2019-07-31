import React, { Component } from 'react'

import Shortcuts from 'react-easy-shortcuts'



export default class App extends Component {

  state = {
    status: false,
    last: ""
  }

  tokens = [];

  componentDidMount(){
    this.tokens.push(Shortcuts.subscribe("ctrl+z", "ctrl+r", "ctrl+f", this.toggle));
  }

  componentWillUnmount(){
    Shortcuts.unsubscribe(this.tokens);
  }

  toggle = (shortcut) => {
    this.setState({status: !this.state.status, last:shortcut});
  }

  render () {
    return (
      <div style={{float:'left', width: '300px', minHeight:'100px', textAlign:'center', backgroundColor:(this.state.status ? 'green' : 'red')}}>
        <b>This is toggled with ctrl+z, ctrl+r and ctrl+f</b><br/>
        <b>Last pressed: {this.state.last}</b>
      </div>
    )
  }
}

