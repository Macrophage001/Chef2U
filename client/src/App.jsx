import React from 'react'
import IntroScreen from './components/introScreen';

import './styles/App.css';

const App = ({ navLinks }) => {
  return (
    <div>
      <IntroScreen navLinks={navLinks} />
    </div>
  )
}

export default App
