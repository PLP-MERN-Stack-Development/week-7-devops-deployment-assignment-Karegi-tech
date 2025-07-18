import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('/api/test')
      .then(res => console.log('Backend connection:', res.ok))
      .catch(err => console.error('Connection failed:', err));
  }, []);

  return <div>MERN App - Frontend Ready</div>;
}

export default App;  // <-- This line was missing