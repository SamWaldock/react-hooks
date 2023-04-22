// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  const someExpensiveComputation = () => {
    const receivedName =  window.localStorage.getItem('name') ?? initialName;
    return receivedName;
  }

  const [name, setName] = React.useState(someExpensiveComputation);

  React.useEffect(() => {
    window.localStorage.setItem('name', name);
    // Woops already added the dependency array ^^
  }, [name])

  function handleChange(event) {
    setName(event.target.value);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName='Sam' />
}

export default App
