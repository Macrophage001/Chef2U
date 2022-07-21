import React from 'react'
import IntroScreen from './components/pages/introScreen';
import { INavLinks } from './interfaces/INavLinks';

import './styles/App.css';

const App: React.FC<INavLinks> = ({ navLinks }) => {
  return (
    <div>
      <IntroScreen navLinks={navLinks} />
    </div>
  )
}

export default App
