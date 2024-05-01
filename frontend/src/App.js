import { Container } from 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NumScreen from './screens/NumScreen';
import RegisterScreen from './screens/RegisterScreen';
import BillsScreen  from './screens/BillsScreen';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<main className='py-3'><Container><ProtectedRoute><HomeScreen/> </ProtectedRoute></Container></main>} />
        <Route path='/nums' element={<main className='py-3'><Container><ProtectedRoute><NumScreen /></ProtectedRoute></Container></main>} />
        <Route path='/login' element={<main className='py-3'><Container><LoginScreen /></Container></main>} />
        <Route path='/register' element={<main className='py-3'><Container><RegisterScreen /></Container></main>} />
        <Route path='/calendar' element={<main className='py-3'><Container><ProtectedRoute><BillsScreen /></ProtectedRoute></Container></main>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem('expense-tracker-user')) {
    return props.children;
  } else {
    return <Navigate to='/login' />;
  }
}

export default App;
