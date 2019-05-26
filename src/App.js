import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { db } from './firebase';
import CnCarousel from './components/CN/CnCarousel';
import EnCarousel from './components/EN/EnCarousel';
import CnShowType from './components/CN/CnShowType';
import EnShowType from './components/EN/EnShowType';
class App extends Component {
  constructor(props) {
    super(props);

  
    this.state = {
      language: 'CN',
      EnList: [],
      CnList: []
    };
    this.getAll();
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  getAll() {
    db.collection('English').onSnapshot(coll => {
      const EnList = coll.docs.map(doc => doc.data().name)
      this.setState({ EnList })
    })
    db.collection('TraditionalChinses').onSnapshot(coll => {
      const CnList = coll.docs.map(doc => doc.data().name)
      this.setState({ CnList })
    })

  }

  changeLanguage(language) {
    this.setState({ language: language });
  }

  render() {
    if (this.state.language === 'CN') {
      return (
        <div className="App">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">利興行</NavbarBrand>
            <NavbarToggler />
            <Collapse navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink >Components</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    產品
                </DropdownToggle>
                  <DropdownMenu right>
                    {this.state.CnList.map((topic, index) =>
                      <DropdownItem key={topic}>{topic}</DropdownItem>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink >聯絡我們</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => this.changeLanguage("EN")}>English</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <CnCarousel/>
          <CnShowType/>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Lee Hing Hong</NavbarBrand>
            <NavbarToggler />
            <Collapse navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink >Components</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Product
                </DropdownToggle>
                  <DropdownMenu right>
                    {this.state.EnList.map((topic, index) =>
                      <DropdownItem key={topic}>{topic}</DropdownItem>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink >Contact us</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => this.changeLanguage("CN")}>繁體中文</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <EnCarousel/>
          <EnShowType/>
        </div>
      );
    }
  }
}

export default App;
