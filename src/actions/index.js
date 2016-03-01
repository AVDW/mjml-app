import { createAction } from 'redux-actions'
import { fromJS } from 'immutable'

const setConfig = createAction('SET_CONFIG')

export const loadConfig = () => dispatch => {
  let config = localStorage.getItem('appconfig')
  if (config) {
    config = fromJS(JSON.parse(config))
    dispatch(setConfig(config))
  }
}

const configUpdate = createAction('UPDATE_CONFIG', updater => updater)
export const updateConfig = updater => (dispatch, getState) => {
  dispatch(configUpdate(updater))
  const state = getState()
  localStorage.setItem('appconfig', JSON.stringify(state.config.toJS()))
}
