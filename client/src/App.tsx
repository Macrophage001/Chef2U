import IntroScreen from './components/pages/introScreen';
import './styles/App.css';

const App = ({ navLinks }) => {
  return (
    <div>
      <IntroScreen navLinks={navLinks} />
    </div>
  )
}

export default App