import React from 'react';
import { Modal } from 'react-bootstrap';

import EditProduto from './edit-produto';

const CreateProdutoModel = (props) => {

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar novo produto</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditProduto />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreateProdutoModel;