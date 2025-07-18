import { useEffect, useState } from 'react'
import CarForm from './CarForm'

export default function CarListPage() {
  const [carros, setCarros] = useState([])
  const [editCarro, setEditCarro] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchCars() {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8080/carros')
      const data = await res.json()
      setCarros(data)
    } catch (e) {
      alert('Erro ao buscar carros')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCars()
  }, [])

  async function handleDelete(id) {
      await fetch(`http://localhost:8080/carro/${id}`, { method: 'DELETE' })
      fetchCars()
  }

  return (
    <div className="container">
      <h1>Lista de Carros</h1>

      <CarForm
        onSuccess={() => {
          setEditCarro(null)
          fetchCars()
        }}
        edit={editCarro}
      />

      {loading ? (
        <p>Carregando carros...</p>
      ) : carros.length === 0 ? (
        <p>Nenhum carro encontrado.</p>
      ) : (
        <div className="list-card">
          {carros.map(carro => (
            <div key={carro.id} className="list-item">
              <strong>{carro.modelo}</strong> - {carro.marca} ({carro.ano})
              <div>
                <button id='editar' onClick={() => setEditCarro(carro)} style={{ marginRight: '0.75rem' }}>
                  Editar
                </button>
                <button id='deletar' onClick={() => handleDelete(carro.id)} className="delete-button">
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
