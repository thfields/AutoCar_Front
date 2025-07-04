import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import CarListPage from './pages/CarListPage'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <>
      {isAuthenticated ? (
        <CarListPage />
      ) : (
        <LoginPage onLogin={() => setIsAuthenticated(true)} />
      )}
    </>
  )
}
