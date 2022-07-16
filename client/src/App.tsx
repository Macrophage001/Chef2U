import React from 'react'
import IntroScreen from './components/pages/introScreen';
import './styles/App.css';
import { INavLinks } from './interfaces/INavLinks';

const App: React.FC<INavLinks> = ({ navLinks }) => {
  return (
    <div>
      <IntroScreen navLinks={navLinks} />
    </div>
  )
}

export default App
