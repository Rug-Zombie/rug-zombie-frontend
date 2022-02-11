import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { routes } from 'routes'

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: routes.LANDING,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute;
