import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

import ProdutoList from '../components/produto-list';
import CreateProdutoModel from '../components/create-produto-model';

const Landing = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Row>
                <Col xs={12} md={10}>
                    <h2>Produtos</h2>
                </Col>
                <Col xs={12} md={2} className="align-self-center">
                    <Button className="float-right" onClick={() => setShow(true)}>Adicionar Produto</Button>
                </Col>
            </Row>
            <ProdutoList />
            <CreateProdutoModel show={show} handleClose={() => setShow(false)} />
        </>
    );
}

export default Landing;
