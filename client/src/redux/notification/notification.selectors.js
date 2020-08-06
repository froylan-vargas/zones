import { createSelector } from 'reselect';

const selectResultNotification = state => state.resultNotification;

export const selectNotification = createSelector(
    [selectResultNotification],
    resultNotification => resultNotification.notification
)