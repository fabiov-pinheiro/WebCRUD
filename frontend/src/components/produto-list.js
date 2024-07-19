import React, { useEffect, useState } from 'react';
import ProdutoItem from './produto-item';
import ReactPaginate from 'react-paginate';
import { Container, Row, Col } from 'react-bootstrap';

const ProdutoList = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtosCount, setProdutosCount] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getProdutos();
    }, [page]);

    const getProdutos = () => {
        const url = `${process.env.REACT_APP_API_URL}Produtos?pageSize=${process.env.REACT_APP_PAGIN_SIZE}&pageIndex=${page}`;
        console.log('Buscando dados da URL:', url);

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Falha de resposta ' + res.statusText);
                }
                return res.json();
            })
            .then(res => {
                console.log('Dados de resposta:', res);
                if (Array.isArray(res)) {
                    setProdutos(res);
                    setProdutosCount(Math.ceil(res.length / process.env.REACT_APP_PAGIN_SIZE));
                } else {
                    console.error('Unexpected response structure:', res);
                    alert("Erro ao acessar dados");
                }
            })
            .catch(err => {
                console.error('error: ', err);
                alert("Erro ao acessar dados");
            });
    }

    const handlePageClick = (pageIndex) => {
        setPage(pageIndex.selected);
    }



    return (
        <>
            <Container>
                <Row>
                    {produtos && produtos.length > 0 ?
                        produtos.map((m, i) => (
                            <Col key={i} md={4} className="mb-4">
                                <ProdutoItem data={m} />
                            </Col>
                        ))
                        : <p>Não possuem produtos cadastrados no sistema</p>}
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <ReactPaginate
                            previousLabel={'anterior'}
                            nextLabel={'proxima'}
                            breakLabel={'...'}
                            breakClassName={'page-link'}
                            pageCount={produtosCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-link'}
                            nextClassName={'page-link'}
                            activeClassName={'active'}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ProdutoList;
