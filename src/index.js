import hotkeys from 'hotkeys-js';


export default class Shortcuts {

  static uuid = 0;

  // shortcuts[shortcut][uuid] = function;
  static shortcuts = {};
  // uuids[uuid] = shortcuts[];
  static uuids = {};

  /**
   * Subscribe an function to listen to the specified shortcuts, the last parameter is the function to be called, while the others are the shortcuts, the default behavior is automatically prevented
   * @function
   * @alias subscribe
   * @param { String } shortcuts The shortcuts that will call the function
   * @param { Function } func The function to call
   * @return { String } token of this subscription, used to further unsubscribe
  */
  static subscribe(...shortcuts) {
    const uuid = "uuid_"+ (++Shortcuts.uuid);
    const f = shortcuts[shortcuts.length-1];
    
    Shortcuts.uuids[uuid] = [];
    for (let i=0; i<shortcuts.length - 1; i++) {
      Shortcuts._subscribe(shortcuts[i], f, uuid);
      Shortcuts.uuids[uuid].push(shortcuts[i]);
    }
    return uuid;
  }
  
  /**
   * Unsubscribe an previously subscribed token, if didn't rest any subscription to the shortcut, it will be automatically unbinded
   * @function
   * @alias unsubscribe
   * @param { String } token The token to unsubscribe, if passed an array, all of the tokens in the array will be unsubscribed
  */
  static unsubscribe(token) {
    console.log(typeof token );
    
    if(typeof token === 'string'){
      Shortcuts._unsubscribe(token);
    } else if (Array.isArray(token)){
      token.forEach(t => Shortcuts._unsubscribe(t));
    }
  }

  static _unsubscribe(uuid){
    Shortcuts.uuids[uuid].forEach(s => {
      delete Shortcuts.shortcuts[s][uuid];
      if(Object.keys(Shortcuts.shortcuts[s]).length === 0){
        delete Shortcuts.shortcuts[s];
        hotkeys.unbind(s);
      }
    });
    delete Shortcuts.uuids[uuid];
  }

  static _subscribe(shortcut, f, uuid){

    if(Shortcuts.shortcuts[shortcut] === undefined){
      Shortcuts.shortcuts[shortcut] = {};
      hotkeys(shortcut, function(event){
        // Prevent the default refresh event under WINDOWS system
        event.preventDefault();
        Object.keys(Shortcuts.shortcuts[shortcut]).forEach(k => Shortcuts.shortcuts[shortcut][k](shortcut));
      });
    }
    Shortcuts.shortcuts[shortcut][uuid] = f;
  }

}