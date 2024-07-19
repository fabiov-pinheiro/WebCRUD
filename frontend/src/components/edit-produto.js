import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const EditProduto = (props) => {
    const { id } = useParams();
    const [produto, setProduto] = useState({
        nome: '',
        preco: '',
        desc: ''
    });
    const [validated, setValidated] = useState(false);


    
    useEffect(() => {
        if (id) {
            fetch(`${process.env.REACT_APP_API_URL}Produtos/${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === true) {
                        setProduto(data.data);
                    } 
                })
                .catch(err => console.log("Erro"));
        }
    }, [id]);
    


    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setProduto((prevProduto) => ({
            ...prevProduto,
            [name]: value
        }));
    }

    const handleSave = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        const produtoToPost = {
            nome: produto.nome,
            preco: parseFloat(produto.preco),
            descricao: produto.desc,  
        };

        console.log('Produto a ser postado:', produtoToPost); 

        const url = id ? `${process.env.REACT_APP_API_URL}Produtos/${id}` : `${process.env.REACT_APP_API_URL}Produtos`; 
        const method = id ? "PUT" : "POST";

        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(produtoToPost),
        })
            .then(response => response.json())
            .then(response => {
                console.log('Resposta da API:', response); // Log da resposta da API
                if (response.status === true && response.data) {
                    setProduto(response.data);
                }
            })
            .catch(error => {
                console.error('Erro ao solicitar dados:', error); // Log de erros
            });
    }

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSave}>
                <Form.Group controlId="formProdutoNome">
                    <Form.Label>Nome do produto:</Form.Label>
                    <Form.Control
                        name="nome"
                        value={produto.nome}
                        required
                        type="text"
                        autoComplete="off"
                        placeholder="Digite o nome do produto"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, adicione o nome do produto.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formProdutoPreco">
                    <Form.Label>Preço do produto:</Form.Label>
                    <Form.Control
                        name="preco"
                        value={produto.preco}
                        required
                        type="number"
                        step="0.01"
                        autoComplete="off"
                        placeholder="Digite o preço do produto"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, adicione o preço do produto.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formProdutoDesc">
                    <Form.Label>Descrição do produto:</Form.Label>
                    <Form.Control
                        name="desc"
                        value={produto.desc}
                        required
                        type="textarea"
                        rows={3}
                        placeholder="Digite a descrição do produto"
                        onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, adicione a descrição do produto.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">
                    {produto.id ? "Atualizar" : "Criar"}
                </Button>
            </Form>
        </>
    );
}

export default EditProduto;
