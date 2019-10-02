import React from 'react';
import { Modal } from 'semantic-ui-react';
import Button from './Button';
import Context from './Context';
import Provider from './Provider';
import PasteBin from './PasteBin';

// Purposely call each fn without args since we don't need them
const callFns = (...fns) => () => fns.forEach((fn) => fn && fn());

const App = () => {
  const {
    modalOpened,
    slotifiedContent = [],
    slotify,
    onSave,
    openModal,
    closeModal,
    modalRef,
    onCopyFinalContent
  } = React.useContext(Context);

  const ModalContent = React.useCallback(
    ({ innerRef, ...props }) => <div ref={innerRef} {...props} />,
    [],
  );
  
  return (
    <div
      style={{
        padding: 12,
        boxSizing: 'border-box'
      }}
    >
      <Modal
        open={modalOpened}
        trigger={
          <Button type="button" onClick={callFns(slotify, openModal)}>
            Start Quotifying
          </Button>
        }
      >
        <Modal.Content
          style={{
            background: '#fff',
            padding: 12,
            color: '#333',
            width: '100%'
          }}
        >
          <div>
            <Modal.Description as={ModalContent} innerRef={modalRef}>
              {slotifiedContent.map((content, index) => (
                <div key={index} style={{ whiteSpace: 'pre-line' }}>{content}</div>
              ))}
            </Modal.Description>
          </div>
          <Modal.Actions>
            <Button type="button" onClick={onSave}>
              SAVE
            </Button>
            &nbsp;
            <Button type="button" onClick={closeModal}>
              CLOSE
            </Button>
            &nbsp;
            <Button type="button" onClick={onCopyFinalContent}>
              COPY
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
      <PasteBin onSubmit={slotify} />
    </div>
  )
};

export default () => (
  <Provider>
    <App />
  </Provider>
);
