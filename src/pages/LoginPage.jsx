import { useState } from 'react'

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin() {
    try {
      const body = `${username},${password}`
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body
      })
      const result = await res.json()
      if (result === true) {
        onLogin()
      } else {
        setError('Credenciais inválidas')
      }
    } catch {
      setError('Erro na requisição')
    }
  }

  return (
    <div className="container">
      <h1>AutoCar - Login</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
          handleLogin()
        }}
        noValidate
      >
        <input
          id="login"
          className="input"
          placeholder="Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          id="senha"
          className="input"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button id='entrar' type="submit">Entrar</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}
