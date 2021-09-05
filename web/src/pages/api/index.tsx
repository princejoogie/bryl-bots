import React from 'react'
import { Route, RouteProps, Switch, useRouteMatch } from 'react-router-dom'
import WelcomeMessage from './welcome-message'

const index: React.FC<RouteProps> = () => {
  return <div className="container px-4 mx-auto">Api Page</div>
}

const Switcher: React.FC<RouteProps> = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}`} exact component={index} />
      <Route path={`${path}/welcome-message`} component={WelcomeMessage} />
    </Switch>
  )
}

export default Switcher
