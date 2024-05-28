import { Fragment, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Modals({ show, handleClose, title, text, logOut }) {
  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Không
          </Button>
          <Button variant="danger" onClick={
            () => {
              handleClose();
              logOut();
            }
          }>
            Có
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default Modals;