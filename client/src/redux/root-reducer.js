import { combineReducers } from 'redux'

import categoryReducer from './category/category.reducer'
import productReducer from './product/product.reducer'
import notificationReducer from './notification/notification.reducer'
import configReducer from './config/config.reducer'

export default combineReducers({
    category: categoryReducer,
    product: productReducer,
    resultNotification: notificationReducer,
    configs: configReducer
})