import React, { useState } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AuthorPage } from './pages/AuthorPage'
import { BookPage } from './pages/BookPage'
import { Header } from './components/Header'
import { NavBar } from './components/NavBar'

export const App = () => {
  const [books, setBooks] = useState()
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState('default')
  const [location, setLocation] = useState('/')

  const getAuthors = (e) => {
    e.preventDefault()
    setKeyword(`&keyword=${e.target.value}`)
    // const formattedKeyword = keyword.replace(' ', '_')
    // fetch(`https://bardolphs-books.herokuapp.com/books/search/?keyword=${keyword}`)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setBooks(json)
    //   })
  }

  const changeOrder = (e) => {
    setPage(1)
    setOrder(e)
  }


  return (
    <BrowserRouter>
      <Header keyword={keyword} setKeyword={setKeyword} getAuthors={getAuthors} setBooks={setBooks}
        setPage={setPage} location={location} setLocation={setLocation}
        setORder={setOrder} />
      <Switch>
        <Route path="/" exact>
          <HomePage keyword={keyword} order={order} changeOrder={changeOrder} setBooks={setBooks}
            books={books} page={page} setPage={setPage} setKeyword={setKeyword} />
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
