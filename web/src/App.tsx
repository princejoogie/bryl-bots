import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import ApiRoute from './pages/api'
import HomeRoute from './pages'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomeRoute} />
        <Route path="/api" component={ApiRoute} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
