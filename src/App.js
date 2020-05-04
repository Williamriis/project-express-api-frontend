import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { HomePage } from './pages/HomePage'

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>


    </BrowserRouter>
  )
}
