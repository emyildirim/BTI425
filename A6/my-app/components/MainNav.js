import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Navbar, Nav, Form, FormControl, Button, Container, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData';
import { removeToken, readToken } from '@/lib/authenticate';

export default function MainNav(){
    //Assignment 5
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    //Assignment 4
    const router = useRouter();
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Function to update the token state
        const handleRouteChange = () => {
            setToken(readToken());
        };

        // Call it on mount and subscription to route changes
        handleRouteChange();
        router.events.on('routeChangeComplete', handleRouteChange);

        // Cleanup subscription on unmount
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    async function submitForm(e) {
        e.preventDefault();
        setIsExpanded(false)
        const queryString = `title=true&q=${encodeURIComponent(searchField)}`;
        router.push(`/artwork?${queryString}`)
        setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    }

    const toggleExpanding = () => {
        setIsExpanded(!isExpanded)
    }

    const closeExpanding = () => { 
        setIsExpanded(false)
    }

    //Assignment 6
    const logout = () => {
        setIsExpanded(false);
        removeToken();
        setToken(false);
        router.push('/login');
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
                            {token && (<Link href="/search" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/search"} onClick={closeExpanding}>Advanced Search</Nav.Link>
                            </Link>)}
                        </Nav>

                        {token && (<Form className="d-flex" onSubmit={submitForm}>
                            <FormControl
                                type="text"
                                placeholder="Search"
                                className="mr-2"
                                value={searchField}
                                name="searchField"
                                onChange={(e) => setSearchField(e.target.value)}
                            />
                            <Button variant="outline-light" type="submit">Submit</Button>
                        </Form>)}

                        {token ? (
                            <Nav>
                                <NavDropdown title={token.userName} id="collapsible-nav-dropdown">
                                    <Link href="/favourites" passHref legacyBehavior>
                                        <NavDropdown.Item active={router.pathname === "/favourites"} onClick={closeExpanding}>Favourites</NavDropdown.Item>
                                    </Link>
                                    <Link href="/history" passHref legacyBehavior>
                                        <NavDropdown.Item active={router.pathname === "/history"} onClick={closeExpanding}>Search History</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        ) : (
                            <Nav>
                                <Link href="/register" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/register"} onClick={closeExpanding}>Register</Nav.Link>
                                </Link>
                                    <Link href="/login" passHref legacyBehavior>
                                    <Nav.Link active={router.pathname === "/login"} onClick={closeExpanding}>Login</Nav.Link>
                                </Link>
                            </Nav>
                        )}
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}