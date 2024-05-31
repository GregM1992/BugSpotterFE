/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
} from 'react-bootstrap';
import Image from 'next/image';
import logo from '../public/bugspotter logo.png';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
      <Container>
        <div className="logo">
          <Link passHref href="/">
            <Navbar.Brand>
              <Image
                alt="bugspotter logo"
                src={logo}
                width="95rem"
                height="90rem"
                className="logo"
              />{' '}
            </Navbar.Brand>
          </Link>
          <Navbar.Brand>BugSpotter</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="navBarItems">
            <Nav className="me-auto">
              {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
              <Link passHref href="/">
                <Nav.Link className="navLinks homeLink">Home</Nav.Link>
              </Link>
              <Link passHref href="/profile">
                <Nav.Link className="navLinks">Profile</Nav.Link>
              </Link>
              <Link passHref href="/posts">
                <Nav.Link className="navLinks">Feed</Nav.Link>
              </Link>
              <Link passHref href="/collections">
                <Nav.Link className="navLinks"> My Collections</Nav.Link>
              </Link>
              <Link passHref href="/myPosts">
                <Nav.Link className="navLinks"> My Posts</Nav.Link>
              </Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
