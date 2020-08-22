import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { selectNotification } from './redux/notification/notification.selectors';
import { fetchProductsStart } from './redux/product/product.actions';
import { fetchConfigStart } from './redux/config/config.actions';

import HomePage from './pages/homepage/homepage.component'
import AdminMainpage from './pages/admin-mainpage/admin-mainpage.component'
import ResultNotification from './components/result-notification/result-notification.component'

const App = ({ notification, fetchConfigs, fetchProducts }) => {

  useEffect(() => {
    async function fetch() {
      fetchProducts();
      fetchConfigs();
    };
    fetch();
  }, [fetchConfigs, fetchProducts]);

  return (
    <div className="App">
      {
        notification && notification.visible
          ?
          <ResultNotification message={notification.message} isError={notification.isError} />
          : null
      }
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/admin' component={AdminMainpage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  notification: selectNotification
})

const mapDispatchToProps = dispatch => ({
  fetchConfigs: () => dispatch(fetchConfigStart()),
  fetchProducts: () => dispatch(fetchProductsStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
