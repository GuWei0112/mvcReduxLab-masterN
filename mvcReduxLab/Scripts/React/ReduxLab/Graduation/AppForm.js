import React from 'react'
import { connect } from 'react-redux'
import AppHelper from 'CommonFF/AppHelper.js'
import TitleWidget from 'Common/TitleWidget.js'
import Like from './Like.js'
import ToDo from './ToDo.js'
import actions, { Ks } from 'CommonFF/actions.js'
import apiClient from './apiClient.js'

class AppForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showLike: false,
            showToDo: false

        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSaveFormData = this.handleSaveFormData.bind(this)
        this.handleLoadFormData = this.handleLoadFormData.bind(this)
    }

    render() {
        const { showLike, showToDo } = this.state
        return (
            <div>
                <AppHelper appInfo={globalappinfo} noInitFormMode />
                <TitleWidget appTitle={globalappinfo.appTitle} />
                <div className="container">
                    <label>請勾選展示項目</label>
                    <label><input type="checkbox" name="showLike" checked={showLike} onChange={this.handleInputChange} />Like</label>
                    &nbsp;
                    <label><input type="checkbox" name="showToDo" checked={showToDo} onChange={this.handleInputChange} />ToDo</label>
                    &nbsp;
                </div>
                <div className="container">
                    {showLike && <Like/>}
                    {showLike
                        && (<div>
                            <button type="button" className="btn btn-primary btn-lg m-1" onClick={this.handleSaveFormData}>Like存檔</button>
                       <button type="button" className="btn btn-warning btn-lg m-1" onClick={this.handleLoadFormData}>Like載入</button>
                            <hr />
                     </div>)}
                    {showToDo && <ToDo />}
                    
                </div>
            </div>
        )
    }
    handleInputChange(e) {
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }
    handleSaveFormData() {
        const { formData } = this.props
        console.log('handleSaveFormData', { formData })

        this.props.setBlocking(true)
        apiClient.SaveFormData(formData).then((resp) => {
            console.log('SaveFormData success', { resp })
            swal.fire('SaveFormData success', 'success')
        }).catch((xhr) => {
            console.log('SaveFormData fail!', { xhr })
            const err = xhr.response.data;
            swal.fire('SaveFormData fail!', err.errMsg, 'error')
        }).finally(() => {
            this.props.setBlocking(false)
        })
    }
    handleLoadFormData() {
        const name = this.props.formData.likeInfo.idName
        console.log('handleLoadLFormData', { name })

        this.props.setBlocking(true)
        const args = { name }
        apiClient.LoadFormData(args).then((resp) => {
            const formData = resp.data
            console.log('LoadFormLData success', { formData })
            this.props.fillFormData(formData)
            swal.fire('LoadFormLData success', 'success')
        }).catch((xhr) => {
            console.log('LoadFormLData fail!', { xhr })
            const err = xhr.response.data;
            swal.fire('LoadFormLData fail!', err.errMsg, 'error')
        }).finally(() => {
            this.props.setBlocking(false)
        })
    }
}
const mapStateToProps = (state, ownProps) => ({
    appInfo: state.appInfo,
    formData: {
        likeInfo: state.likeInfo
    }
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    dispatch,
    setBlocking: (flag) => {
        dispatch({ type: Ks.SET_BLOCKING, flag })
    },
    fillFormData: (formData) => {
        dispatch({ type: Ks.FILL_FORM_DATA, formData })
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppForm)