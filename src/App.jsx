import './app.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'; 


function App() {

  const [cards, setCards] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [Link, setLink] = useState('');
  const baseUrl = 'http://localhost:3333/cards'
  const cardsFlitrados = cards.filter(card=>{
    return card.title.toLowerCase().includes(searchTerm.toLowerCase())

  })
  const handleSubmit = (e)=>{
    e.preventDefault()
    async function sendData(){
      await Axios.post(baseUrl, {
        title: title,
        description: description,
        link: Link
      })
    }
    console.log("Dados digitados", (title, description, Link))
    sendData()
    setTitle('')
    setDescription('')
    setLink('')
  }

  useEffect(()=>{
    async function getData(){
      const response = await Axios.get(baseUrl)
      setCards(response.data)
    }
    getData()
  }, [cards])
  return (
    <>
      <header>
        <h1>Meus FleshCards de programação</h1>
        <input placeholder='Buscar um conteudo...' type="text" value={searchTerm} onChange={(e) => setSearchTerm (e.target.value)} />
      </header>
      <div className='gallery'>
          {
              cardsFlitrados.map(item=>{
                return(
                  <>
                  <div className='card' key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <a href="">{item.link}</a>
                  </div>
                  </>
                )
              })
          }
      </div>
      <form action="" className='form-container'onSubmit={handleSubmit}>
        <h1>Cadastre um novo conteúdo</h1>
        <input type="text" placeholder='Titulo' value={title} onChange={(e) => setTitle(e.target.value)}/>
        <textarea name="" id="" cols="30" rows="10" placeholder='Descrição'value={description} onChange={(e) => setDescription (e.target.value)}></textarea>
        <input type="text" placeholder='Link'value={Link} onChange={(e) => setLink (e.target.value)}/>
        <button type='submit'>Criar FleshCard</button>
      </form>
      <footer>
      <p className='read-the-docs'><span>&#9734;</span> Criado por Ana Bezerra</p>
      </footer>
    </>
  );
}

export default App;
