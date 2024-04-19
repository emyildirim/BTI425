import { useState } from 'react';
import { useRouter } from 'next/router';
import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function MainNav(){
    //Assignment 5
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    //Assignment 4
    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setIsExpanded(false)
        const queryString = `title=true&q=${encodeURIComponent(searchField)}`;
        router.push(`/artwork?${queryString}`)
        setSearchHistory(current => [...current, queryString]);
    }

    const toggleExpanding = () => {
        setIsExpanded(!isExpanded)
    }

    const closeExpanding = () => { 
        setIsExpanded(false)
    }

    return (
        <>
            <Navbar className=" py-3 navbar-dark bg-dark " expand="lg" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Erkam Yildirim</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleExpanding}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto flex-grow-1">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/"} onClick={closeExpanding}>Home</Nav.Link>
                            </Link>
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/search"} onClick={closeExpanding}>Advanced Search</Nav.Link>
                            </Link>
                        </Nav>
                        &nbsp; 
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-2"
                                value={searchField}
                                name="searchField"
                                onChange={(e) => setSearchField(e.target.value)}
                            />
                            <Button variant="outline-light" type="submit">Submit</Button>
                        </Form>
                        &nbsp;
                        <Nav>
                            <NavDropdown title="User Name" id="collapsible-nav-dropdown">
                                <Link href="/favourites" passHref legacyBehavior>
                                    <NavDropdown.Item active={router.pathname === "/favourites"} onClick={closeExpanding}>Favourites</NavDropdown.Item>
                                </Link>
                                <Link href="/history" passHref legacyBehavior>
                                    <NavDropdown.Item active={router.pathname === "/history"} onClick={closeExpanding}>Search History</NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    )
}