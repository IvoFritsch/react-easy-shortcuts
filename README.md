# react-easy-shortcuts

An very easy to use, PubSub like, React library to listen to keyboard shortcuts in your components

[Live example](https://ivofritsch.github.io/react-easy-shortcuts/)

[![NPM](https://img.shields.io/npm/v/react-easy-shortcuts.svg)](https://www.npmjs.com/package/react-easy-shortcuts) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-easy-shortcuts
```

## Usage

### Subscribing to keyboard shortcuts

Any of your components can listen for keyboards shortcuts with one simple line:
```jsx
import React, { Component } from 'react'

import Shortcuts from 'react-easy-shortcuts'

	tokens = [];
...
	this.tokens.push(Shortcuts.subscribe("ctrl+z", () => console.log("ctrl+z pressed ")));
...
```
> The returned token is an String, in this example i am pushing to an array to facilitate subscribing more than one function, but you can also save the token directly to the variable.

The same function can also listen to more than one shortcut:
```jsx
...
	this.tokens.push(Shortcuts.subscribe("ctrl+z", "ctrl+b", (s) => console.log("shortcut pressed: "+s)));
...
```
Any shortcut that is being listened has his default behaviour disabled automatically.
> Have in mind that some shortcuts cannot be used because they're captured by the browser before reaching the application
> 
> For full reference on the shortcuts you can use, see the [original library reference](https://github.com/jaywcjlove/hotkeys/#supported-keys)

### Unsubscribing from keyboard shortcuts
When one component will not be used anymore, for example on it's `componentWillUnmount`, it has to unsubscribe from all the keyboard shortcuts it's listening, this is done by one line too:
```jsx
...
	Shortcuts.unsubscribe(this.tokens);
...
```
> The argument can be an array of tokens or just one single token, this function support both

When all the listeners of some shortcut are removed, the shortcut is automatically unbinded and recover it's default behaviour

## License
MIT © [IvoFritsch](https://github.com/IvoFritsch)

Special thanks to [jaywcjlove](https://github.com/jaywcjlove) for his [hotkeys](https://github.com/jaywcjlove/hotkeys/) library
