import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Invitation from './pages/Invitation';
import InvitationReplicated from './pages/InvitationReplicated';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invitation" element={<Invitation />} />
        <Route path="/invitation-replicated" element={<InvitationReplicated />} />
      </Routes>
    </Router>
  )
}

export default App
