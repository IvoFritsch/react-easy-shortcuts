import React, { Component } from 'react'

import Shortcuts from 'react-easy-shortcuts'



export default class App extends Component {

  state = {
    status: false

  }

  tokens = [];

  componentDidMount(){
    this.tokens.push(Shortcuts.subscribe("ctrl+shift+f", this.on));
    this.tokens.push(Shortcuts.subscribe("ctrl+f", this.off));
  }

  componentWillUnmount(){
    Shortcuts.unsubscribe(this.tokens);
  }

  on = () => {
    this.setState({status: true});
  }

  off = () => {
    this.setState({status: false});
  }

  render () {
    return (
      <div style={{float:'left', width: '300px', minHeight:'100px', textAlign:'center', marginLeft:'5px', backgroundColor:(this.state.status ? 'green' : 'red')}}>
        <b>This is turned on with ctrl+shift+f and off with ctrl+f</b>
      </div>
    )
  }
}

