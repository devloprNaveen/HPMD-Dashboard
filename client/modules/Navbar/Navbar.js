import React, {Component} from 'react'
import Navbar,{Header, Brand, Toggle, Collapse} from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer'
import {Link} from 'react-router'
// import {Navbar, Nav, NavItem} from 'react-bootstrap'

export default class Demo extends Component{
  render(){
    return(
      <div>
        <Navbar inverse fluid fixedTop>
          <Header>
            <Brand>
              <Link to="/">Handpump Monitoring Project</Link>
            </Brand>
            <Toggle />
          </Header>

        </Navbar>
      </div>
    )
  }
}
