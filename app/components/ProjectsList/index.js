import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  openProject,
  removeProject,
  renameProject,
} from 'actions/projects'

import CheckBox from 'components/CheckBox'
import ConfirmModal from 'components/Modal/ConfirmModal'

import RenameModal from './RenameModal'
import ProjectItem from './ProjectItem'

import './style.scss'

@connect(state => ({
  projects: state.projects,
}), {
  openProject,
  removeProject,
  renameProject,
})
class ProjectsList extends Component {

  state = {
    activePath: null,
    isDeleteModalOpened: false,
    isRenameModalOpened: false,
    shouldDeleteFolder: false,
  }

  componentWillUnmount () {
    this._isUnmounted = true
  }

  handleRemoveProject = path => e => {
    e.preventDefault()
    e.stopPropagation()
    this.safeSetState({
      activePath: path,
      isDeleteModalOpened: true,
    })
  }

  handleEditProjectName = path => e => {
    e.preventDefault()
    e.stopPropagation()
    this.safeSetState({
      activePath: path,
      isRenameModalOpened: true,
    })
  }

  handleConfirmRemove = () => {
    const { activePath, shouldDeleteFolder } = this.state
    this.props.removeProject(activePath, shouldDeleteFolder)
    this.handleCloseDeleteModal()
  }

  handleCloseDeleteModal = () => this.safeSetState({
    activePath: null,
    isDeleteModalOpened: false,
  })

  handleChangeShouldDelete = shouldDeleteFolder => this.setState({ shouldDeleteFolder })

  handleCloseRenameModal = () => this.safeSetState({
    activePath: null,
    isRenameModalOpened: false,
  })

  handleRename = newPath => {
    this.props.renameProject(this.state.activePath, newPath)
    this.handleCloseRenameModal()
  }

  safeSetState = (...args) => {
    if (this._isUnmounted) { return }
    this.setState(...args)
  }

  render () {

    const {
      openProject,
      projects,
    } = this.props

    const {
      isDeleteModalOpened,
      isRenameModalOpened,
      shouldDeleteFolder,
      activePath,
    } = this.state

    return (
      <div className='ProjectsList abs o-n'>
        {projects.reverse().map((p) => (
          <ProjectItem
            key={p}
            p={p}
            onRemove={this.handleRemoveProject(p.get('path'))}
            onOpen={() => openProject(p.get('path'))}
            onEditName={this.handleEditProjectName(p.get('path'))}
          />
        ))}
        <ConfirmModal
          isOpened={isDeleteModalOpened}
          yepCTA={shouldDeleteFolder ? 'Remove from list and from disk' : 'Remove from list'}
          nopCTA='Cancel'
          onCancel={this.handleCloseDeleteModal}
          onConfirm={this.handleConfirmRemove}
        >
          <h2 className='mb-20'>{'Remove project from list?'}</h2>
          <CheckBox value={shouldDeleteFolder} onChange={this.handleChangeShouldDelete}>
            {'Also remove folder and files from disk'}
          </CheckBox>
        </ConfirmModal>
        <RenameModal
          isOpened={isRenameModalOpened}
          path={activePath}
          onCancel={this.handleCloseRenameModal}
          onConfirm={this.handleRename}
        />
      </div>
    )
  }

}

export default ProjectsList
