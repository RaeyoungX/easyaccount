import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faUser, faSackDollar,faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  // 尝试获取用户信息
  const userItem = localStorage.getItem('expense-tracker-user');
  const user = userItem ? JSON.parse(userItem) : null;
  
  // 检查用户是否登录的函数
  const isLoggedIn = user && user.name;

  const handleLogout = () => {
    // 实现登出逻辑
    localStorage.removeItem('expense-tracker-user');
    localStorage.removeItem('token'); // 假设token也存储在localStorage
    navigate('/login'); // 导航至登录页面
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>
            <FontAwesomeIcon icon={faSackDollar} />
            {' '}EasyAccount
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
      
              <Nav.Link href='/calendar'>
                <FontAwesomeIcon icon={faCalendarDays} /> BILLS
              </Nav.Link>
              
              <Nav.Link href='/nums'>
                <FontAwesomeIcon icon={faChartBar} /> CHART
              </Nav.Link>
  
              {isLoggedIn ? (
                <NavDropdown title={<><FontAwesomeIcon icon={faUser} /> {user.name}</>} id="basic-nav-dropdown">
                  <NavDropdown.Item href='/portfolio'>Portfolio</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href='/login'>
                  <FontAwesomeIcon icon={faUser} /> Login
                </Nav.Link>
              )}
              </Nav>
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
