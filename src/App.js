import React, { useState } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AuthorPage } from './pages/AuthorPage'
import { BookPage } from './pages/BookPage'
import { Header } from './components/Header'
import { NavBar } from './components/NavBar'

export const App = () => {
  const [books, setBooks] = useState()
  const [author, setAuthor] = useState()
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState('default')
  const [location, setLocation] = useState('/')

  const getAuthors = (e) => {
    e.preventDefault()
    const formatted = author.replace(' ', '_')
    fetch(`https://bardolphs-books.herokuapp.com/authors/${formatted}`)
      .then((res) => res.json())
      .then((json) => {
        setBooks(json)
      })
  }

  const changeOrder = (e) => {
    setPage(1)
    setOrder(e)
  }


  return (
    <BrowserRouter>
      <Header author={author} setAuthor={setAuthor} getAuthors={getAuthors} setBooks={setBooks} setPage={setPage} location={location} setLocation={setLocation} />
      <Switch>
        <Route path="/" exact>
          <HomePage order={order} changeOrder={changeOrder} setBooks={setBooks} books={books} page={page} setPage={setPage} />
        </Route>
      </Switch>
      <Switch>
        <Route path="/authors/:author" exact>
          <AuthorPage setLocation={setLocation} />
        </Route>
      </Switch>
      <Switch>
        <Route path="/books/:id" exact>
          <BookPage setLocation={setLocation} />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
