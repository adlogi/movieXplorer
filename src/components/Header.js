import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import logo from '../media/logo.png';

export default function Header() {
  return (
    <Navbar bg="dark" variant="light">
      <Navbar.Brand href="#home">
        <img alt="" src={logo} width="200" className="d-inline-block align-top ml-4" style={{ "filter":"invert(100%)" }} />{' '}
      </Navbar.Brand>
    </Navbar>
  )
}
