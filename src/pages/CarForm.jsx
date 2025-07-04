import { useState, useEffect } from 'react'

export default function CarForm({ onSuccess, edit }) {
  const [modelo, setModelo] = useState('')
  const [marca, setMarca] = useState('')
  const [ano, setAno] = useState('')
  const [id, setId] = useState(null)

  useEffect(() => {
    if (edit) {
      setModelo(edit.modelo)
      setMarca(edit.marca)
      setAno(edit.ano.toString())
      setId(edit.id)
    } else {
      setModelo('')
      setMarca('')
      setAno('')
      setId(null)
    }
  }, [edit])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!modelo || !marca || !ano) {
      alert('Preencha todos os campos')
      return
    }

    const carro = { modelo, marca, ano: parseInt(ano) }
    const options = {
      method: id !== null ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carro)
    }
    const url = id !== null
      ? `http://localhost:8080/carro/${id}`
      : 'http://localhost:8080/salvar'

    try {
      await fetch(url, options)
      setModelo('')
      setMarca('')
      setAno('')
      setId(null)
      onSuccess()
    } catch {
      alert('Erro ao salvar carro')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>{id !== null ? 'Editar Carro' : 'Novo Carro'}</h2>
      <input
        className="input"
        placeholder="Modelo"
        value={modelo}
        onChange={e => setModelo(e.target.value)}
        required
      />
      <input
        className="input"
        placeholder="Marca"
        value={marca}
        onChange={e => setMarca(e.target.value)}
        required
      />
      <input
        className="input"
        placeholder="Ano"
        type="number"
        value={ano}
        onChange={e => setAno(e.target.value)}
        required
        min="1900"
        max="2099"
      />
      <button type="submit">{id !== null ? 'Atualizar' : 'Salvar'}</button>
    </form>
  )
}
