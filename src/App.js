import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AuthorPage } from './pages/AuthorPage'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>
      <Switch>
        <Route path="/authors/:author" exact>
          <AuthorPage />
        </Route>
      </Switch>

    </BrowserRouter>
  )
}
