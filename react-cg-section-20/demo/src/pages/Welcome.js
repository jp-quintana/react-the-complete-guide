import { Route, Switch } from 'react-router-dom'

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Switch>
        <Route path='/welcome/new-user'>
          <p>Welcome, new user!</p>
        </Route>
      </Switch>
    </section>
  )
}

export default Welcome;
