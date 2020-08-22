import {createSelector} from 'reselect';

const selectConfigurations = state => state.configs;

export const selectConfigs = createSelector(
    [selectConfigurations],
    config => config.configs 
);