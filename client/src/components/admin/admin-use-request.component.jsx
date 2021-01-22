import { useDispatch } from 'react-redux';
import axios from 'axios';

import { setResultNotification } from '../../redux/notification/notification.actions';
import { setSelectedCategory } from '../../redux/category/category.actions';
import { setEditOptions } from '../../redux/product/product.actions';
import notificationUtils from '../../utils/notification.utils';

export default ({ url, method, body, successMessage, onSuccess }) => {
    const dispatch = useDispatch();
    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);
            if (onSuccess) {
                //onSuccess(response.data);
                dispatch(setResultNotification(notificationUtils.createNotification([], successMessage)));
                //dispatch(setSelectedCategory("0"));
                //dispatch(setEditOptions({ setShowEditWindow: false }));
            }
            return response.data;
        } catch (err) {
            const errors = err.response.data.errors;
            dispatch(setResultNotification(notificationUtils.createNotification(errors, '')));
            dispatch(setSelectedCategory("0"));
            dispatch(setEditOptions({ setShowEditWindow: false }));
        }
    }
    return { doRequest };
};
