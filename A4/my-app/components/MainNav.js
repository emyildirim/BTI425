import { useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import Link from 'next/link';

export default function MainNav(){
    const router = useRouter();
    const [searchField, setSearchField] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/artwork?title=true&q=${searchField} `)
    }

    return (
        <>
            <Navbar className=" py-3 navbar-dark bg-dark " expand="lg">
                <Container>
                    <Navbar.Brand>Erkam Yildirim</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto flex-grow-1">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link>Home</Nav.Link>
                            </Link>
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link>Advanced Search</Nav.Link>
                            </Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-2"
                                value={searchField}
                                onChange={(e) => setSearchField(e.target.value)}
                            />
                            <Button variant="outline-light" type="submit">Submit</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    )
}