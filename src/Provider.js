import React from 'react';
import Slot from './Slot';
import { attachSlots, split } from './utils';
import Context from './Context';

const initialState = {
  slotifiedContent: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'set-slotified-content':
      return { ...state, slotifiedContent: action.content };
    default:
      return state;
  }
}

function useSlotify() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const textareaRef = React.useRef();
  
  function slotify() {
    let slotifiedContent, content;
    if (textareaRef && textareaRef.current) {
      content = textareaRef.current.value;
    }
    const slot = <Slot />;
    if (content) {
      slotifiedContent = attachSlots(split(content), slot);
    }
    dispatch({ type: 'set-slotified-content', content: slotifiedContent });
  }
  
  return {
    ...state,
    slotify,
    textareaRef,
  };
}

function Provider({ children }) {
  return <Context.Provider value={useSlotify()}>{children}</Context.Provider>;
}

export default Provider;
