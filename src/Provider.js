import React from 'react';
import Slot from './Slot';
import { attachSlots, split } from './utils';
import Context from './Context';

const initialState = {
  slotifiedContent: [],
  drafting: true
};

function reducer(state, action) {
  switch (action.type) {
    case 'set-slotified-content':
      return { ...state, slotifiedContent: action.content };
    case 'set-drafting':
      return { ...state, drafting: action.drafting };
    default:
      return state;
  }
}

function useSlotify() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const textareaRef = React.useRef();

  function onSave() {
    if (state.drafting) {
      setDrafting(false);
    }
  }
  
  function setDrafting(drafting) {
    if (drafting === undefined) return;
    dispatch({ type: 'set-drafting', drafting });
  }
  
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
    onSave,
    setDrafting,
    textareaRef
  };
}

function Provider({ children }) {
  return <Context.Provider value={useSlotify()}>{children}</Context.Provider>;
}

export default Provider;
