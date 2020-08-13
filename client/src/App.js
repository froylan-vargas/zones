import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import { selectNotification } from './redux/notification/notification.selectors'

import HomePage from './pages/homepage/homepage.component'
import AdminMainpage from './pages/admin-mainpage/admin-mainpage.component'
import ResultNotification from './components/result-notification/result-notification.component'

const App = ({ notification }) => {
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

export default connect(mapStateToProps)(App);
