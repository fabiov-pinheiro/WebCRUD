import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProdutoItem = (props) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/editar/${props.data.id}`);
    }

    const handleDelete = () => {
        const url = `${process.env.REACT_APP_API_URL}Produtos/${props.data.id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            console.log('Resposta da API:', response); 
            if (response.status === true) {
                props.onDelete(props.data.id);
                alert("Produto deletado com sucesso!");
            }
        })
        .catch(error => {
            console.error('Erro ao solicitar dados:', error); 
            alert("Erro ao deletar produto");
        });
    }

    return (
        <>
            <Row>
                <Col xs={12} md={10}>
                    <div><b>Nome: </b> {props.data.nome}</div>
                    <div><b>Valor: </b> {props.data.preco}</div>
                    <div><b>Descricao: </b> {props.data.descricao}</div>
                    <Button onClick={handleEdit}>Editar</Button>{'   ' }
                    <Button variant="danger" onClick={handleDelete} danger>Deletar</Button>
                </Col>
                <Col>
                    <hr />
                </Col>
            </Row>
        </>
    );
}

export default ProdutoItem;
