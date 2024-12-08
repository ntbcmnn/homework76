import './App.css';
import Messages from './containers/Messages/Messages';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Container, CssBaseline } from '@mui/material';
import Form from './containers/Form/Form.tsx';
import { Route, Routes } from 'react-router-dom';

const App = () => <>
  <CssBaseline/>

  <header>
    <AppToolbar/>
  </header>

  <main>
    <Container maxWidth="xl">
      <Form/>
      <Routes>
        <Route path="/" element={<Messages/>}/>
        <Route path="/messages" element={<Messages/>}/>
      </Routes>
    </Container>
  </main>
</>;

export default App;