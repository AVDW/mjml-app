import { handleActions } from 'redux-actions'
import { Map, List } from 'immutable'

const state = null

export default handleActions({

  SETTINGS_LOAD_SUCCESS: (state, { payload }) => {
    return Map({
      projects: List(payload.projects),
      editor: Map(payload.editor),
      api: Map(payload.api),
      mjml: Map(payload.mjml),
    })
  },

  SETTINGS_RESET: () => Map({
    projects: List(),
    editor: Map(),
    api: Map(),
  }),

  UPDATE_SETTINGS: (state, { payload: updater }) => updater(state),

  PROJECT_LOAD: (state, { payload: { path } }) => state.update('projects', p => {
    if (p.find(p => p === path)) { return state }
    return p.unshift(path)
  }),

  PROJECT_REMOVE: (state, { payload: path }) => state
    .update('projects', projects => projects.filter(p => p !== path)),

  PROJECTS_REMOVE: (state, { payload: paths }) => state
    .update('projects', projects => projects.filter(p => paths.indexOf(p) === -1)),

}, state)
