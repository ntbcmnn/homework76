import './App.css';
import Messages from './containers/Messages/Messages';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Container, CssBaseline } from '@mui/material';

const App = () => <>
  <CssBaseline/>

  <header>
    <AppToolbar/>
  </header>

  <main>
    <Container maxWidth="xl">
      <Messages/>
    </Container>
  </main>
</>;

export default App;