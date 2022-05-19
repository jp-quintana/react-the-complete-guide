import { Route, Switch, Redirect } from 'react-router-dom'

import Welcome from './pages/Welcome'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/welcome' />
          </Route>
          <Route path='/welcome' >
            <Welcome />
          </Route>
          <Route path='/products' exact>
            <Products />
          </Route>
          <Route path='/products/:productId' exact>
            <ProductDetail />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
