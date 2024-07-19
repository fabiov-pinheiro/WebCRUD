import './App.css';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import Landing from './pages/landing';
import EditProduto from './components/edit-produto';

function App() {
    return (
        <Container>
            <BrowserRouter>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand className="justify-content-center" as={Link} to="/">CRUD Produtos</Navbar.Brand>
                </Navbar>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/editar/:id" element={<EditProduto />} />
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;
