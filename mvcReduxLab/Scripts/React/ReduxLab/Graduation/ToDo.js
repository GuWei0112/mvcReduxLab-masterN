import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, ToggleButtonGroup } from 'reactstrap'
import { Ks } from 'CommonFF/actions.js'
import apiClient from './apiClient.js'
class ToDo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showList: false,
            showOppList:false,
            showAll: true,
            showComplete: false,
            showActive: false,
            DelDo :false,
            count: Object.keys(this.props.todoInfo).length
        }
        this.addItem = this.addItem.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.handleCompleteList = this.handleCompleteList.bind(this)
        this.handleChangeState = this.handleChangeState.bind(this)
        this.handleActiveList = this.handleActiveList.bind(this)
        this.handleAllList = this.handleAllList.bind(this)
        this.handleCompleteList = this.handleCompleteList.bind(this)
        this.handleDeleteDo = this.handleDeleteDo.bind(this)
        this.handleOppsiteList = this.handleOppsiteList.bind(this)
        this.updateDCount = this.updateDCount.bind(this)
        this.updateLCount = this.updateLCount.bind(this)
       // this.updateToDoFormData = this.updateToDoFormData.bind(this)
        this.saveToDoFormData = this.saveToDoFormData.bind(this)
        this.deleteToDoFormData = this.deleteToDoFormData.bind(this)

    }
    componentDidMount() {
        this.setState({ count: Object.keys(this.props.todoInfo).length })
        
    }
    render() {
        const { showList, showOppList, showActive, showAll, showComplete } = this.state
        const { todoInfo, handleValueChange } = this.props
      

        let allList = todoInfo.map((item, index) =>
            (<li className="list-group-item" key={index} >
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input type="checkbox" className="click-checkbox" id={item.name}
                                onChange={(e) =>
                                    this.handleChangeState(item, index)} checked={Boolean(item.complete)} />
                            <label htmlFor={item.name}>{item.name}</label>
                            <span className="badge badge-primary badge-pill">{item.likeCount}</span>
                            <span className="badge badge-danger badge-pill">{item.dislikeCount}</span>
                        </div>
                        <div className="btn-group float-right">
                            <button className="btn btn-primary" onClick={(e) => this.updateLCount(item, index)}>讚</button>
                            <button className="btn btn-danger" onClick={(e) => this.updateDCount(item, index)}>爛</button>
                            <button className="btn btn-danger" onClick={(e) =>
                                this.removeItem(item, index)}>X</button>
                            <button className="btn btn-primary" onClick={this.saveToDoFormData}>Save</button>
                        </div>

                    </div>

                </div>

            </li>
            ))
        let completeList = this.props.todoInfo.filter(function (complete) {
            return complete.complete === true
        }).map((item, index) =>
            (<li className="list-group-item" key={index} >
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input type="checkbox" className="click-checkbox" id={item.name}
                                onChange={(e) =>
                                    this.handleChangeState(item, index)} checked={Boolean(item.complete)} />
                            <label htmlFor={item.name}>{item.name}</label>
                            <span className="badge badge-primary badge-pill">{item.likeCount}</span>
                            <span className="badge badge-danger badge-pill">{item.dislikeCount}</span>
                        </div>
                        <div className="btn-group float-right">
                            <button className="btn btn-primary" onClick={(e) => this.updateLCount(item, index)}>讚</button>
                            <button className="btn btn-danger" onClick={(e) => this.updateDCount(item, index)}>爛</button>
                            <button className="btn btn-danger" onClick={(e) =>
                                this.removeItem(item, index)}>X</button>
                        </div>

                    </div>

                </div>

            </li>
            ))
        let activeList = this.props.todoInfo.filter(function (complete) {
            return complete.complete === false
        }).map((item, index) =>
            (<li className="list-group-item" key={index} >
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input type="checkbox" className="click-checkbox" id={item.name}
                                onChange={(e) =>
                                    this.handleChangeState(item, index)} checked={Boolean(item.complete)} />
                            <label htmlFor={item.name}>{item.name}</label>
                            <span className="badge badge-primary badge-pill">{item.likeCount}</span>
                            <span className="badge badge-danger badge-pill">{item.dislikeCount}</span>
                        </div>
                        <div className="btn-group float-right">
                            <button className="btn btn-primary" onClick={(e) => this.updateLCount(item, index)}>讚</button>
                            <button className="btn btn-danger" onClick={(e) => this.updateDCount(item, index)}>爛</button>
                            <button className="btn btn-danger" onClick={(e) =>
                                this.removeItem(item, index)}>X</button>
                            
                        </div>

                    </div>

                </div>

            </li>
            ))
        
        return (
            <div align='center'>
                <header className='header'>
                    <h1 className='display-1'>todos</h1>
                </header>
                <Row>
                    <Col md={3}>

                    </Col>
                    <Col md={6}>
                        <div className='card' >
                            <div className="card-header">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="checkbox" onChange={this.handleOppsiteList} />
                                        </div>
                                    </div>
                                    <input type="text" className="form-control" placeholder="What neeeds to be done?" onKeyUp={this.handleKeyUp} />
                                </div>
                            </div> 
                            {showList && (<div>
                                <div className='card-body'>
                                <ul className="list-group">

                                        <div>
                                        {showOppList && OppAllList}
                                        {showAll && allList}
                                        {showComplete && completeList}
                                        {showActive && activeList}

                                    </div>
                                </ul>
                            </div>
                                <div className="card-footer" >
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <em className="nav-link">{this.state.count} items left</em>
                                        </li>

                                        <li className="nav-item">
                                            <button onClick={this.handleAllList} className="nav-link">All</button>
                                        </li>
                                        <li className="nav-item">
                                            <button onClick={this.handleActiveList} className="nav-link">Active</button>
                                        </li>
                                        <li className="nav-item">
                                            <button onClick={this.handleCompleteList} className="nav-link">Complete</button>
                                        </li>
                                        <li className="nav-item" align='right'>
                                            {this.state.DelDo && (<button onClick={this.handleDeleteDo} className="nav-link">Delete Do</button>)}
                                        </li>
                                    </ul>



                                </div>
                            </div>)}                
                        </div>
                    </Col>
                    </Row>
            </div>
            
        )

    }
    updateLCount(item, index) {
        item.likeCount = item.likeCount + 1 // 設定新值
        this.props.dispUpdateLCount(index, item)
    }
    updateDCount(item, index) {
        item.dislikeCount = item.dislikeCount + 1 // 設定新值
        this.props.dispUpdateDCount(index, item)
    }
    saveToDoFormData() {
        const { formData } = this.props
        console.log('SaveToDoFormData', { formData })

        this.props.setBlocking(true)
        apiClient.SaveToDoFormData(formData).then((resp) => {
            console.log('SaveToDoFormData success', { resp })
            swal.fire('SaveToDoFormData success', 'success')
        }).catch((xhr) => {
            console.log('SaveToDoFormData fail!', { xhr })
            const err = xhr.response.data;
            swal.fire('SaveToDoFormData fail!', err.errMsg, 'error')
        }).finally(() => {
            this.props.setBlocking(false)
        })
    }
    updateToDoFormData() {
        
        const name = this.props.formData.todoInfo.name
        console.log('updateToDoFormData', { name })

        this.props.setBlocking(true)
        const args = { name }
        apiClient.UpdateToDoFormData(args).then((resp) => {
            const formData = resp.data
            console.log('updateToDoFormData success', { formData })
            this.props.fillFormData(formData)
            swal.fire('updateToDoFormData success', 'success')
        }).catch((xhr) => {
            console.log('updateToDoFormData fail!', { xhr })
            const err = xhr.response.data;
            swal.fire('updateToDoFormData fail!', err.errMsg, 'error')
        }).finally(() => {
            this.props.setBlocking(false)
        })
    }
    deleteToDoFormData() {
        const { formData } = this.props
        console.log('deleteToDoFormData', { formData })

        this.props.setBlocking(true)
        apiClient.DeleteToDoFormData(formData).then((resp) => {
            console.log('deleteToDoFormData success', { resp })
            swal.fire('deleteToDoFormData success', 'success')
        }).catch((xhr) => {
            console.log('deleteToDoFormData fail!', { xhr })
            const err = xhr.response.data;
            swal.fire('deleteToDoFormData fail!', err.errMsg, 'error')
        }).finally(() => {
            this.props.setBlocking(false)
        })
    
    }
    handleOppsiteList(e) {
        const target = e.target
        const value = target.value ? target.checked : target.value
        this.props.dispOppsiteList(value)
        const active = this.props.todoInfo.filter(function (complete) {
            return complete.complete === false
        })
        if (Object.keys(active).length != 0) {
            this.setState({ count: Object.keys(active).length  })
        } else {
            this.setState({ count: 0 })
        }
        const complete = this.props.todoInfo.filter(function (complete) {
            return complete.complete === true
        })
        if (Object.keys(complete).length  === 0) {
            this.setState({ DelDo: false })
        } else {
            this.setState({ DelDo: true })
        }
    }
    handleAllList(e) {
        e.preventDefault();
        this.setState({ showAll: true })
        this.setState({ showActive: false })
        this.setState({ showComplete: false })
    }
    handleActiveList(e) {
        e.preventDefault();
        this.setState({ showAll: false })
        this.setState({ showActive: true })
        this.setState({ showComplete: false })
    }
    handleCompleteList(e) {
        e.preventDefault();
        this.setState({ showAll: false })
        this.setState({ showActive: false })
        this.setState({ showComplete: true })
    }
    handleDeleteDo(e) {
        const complete = this.props.todoInfo.filter(function (complete) {
            return complete.complete === true
        })
        this.props.dispDeleteDo(complete)
        const all = this.props.todoInfo.filter(function (complete) {
            return complete.complete === true || complete.complete === false

        })
        if (Object.keys(all).length - 1 === 0) {
            this.setState({ showList: false })
        } 

        if (Object.keys(complete).length-1 === 0) {
            this.setState({ DelDo: false })
        } else {
            this.setState({ DelDo: true })
        }
    }
    removeItem(item, index) {      
        this.props.dispRemoveItem(index)     
        const complete = this.props.todoInfo.filter(function (complete) {
            return complete.complete === true
        })
        if (Object.keys(complete).length-1 === 0) {
            this.setState({ DelDo: false })
        }

        const active = this.props.todoInfo.filter(function (complete) {
            return complete.complete === false
        })
        if (Object.keys(active).length != 0) {
            this.setState({ count: Object.keys(active).length - 1 })
        } else {
            this.setState({ count: 0 })
        }
        const all = this.props.todoInfo.filter(function (complete) {
            return complete.complete === true || complete.complete === false
            
        })
        if (Object.keys(all).length-1 === 0) {
            this.setState({ showList: false })
        }
        this.deleteToDoFormData()
    }
    addItem(newItem) {
        this.props.dispInsertItem(newItem)
        const active = this.props.todoInfo.filter(function (complete) {
            return complete.complete === false
        })
        this.setState({ count: Object.keys(active).length + 1 })
        this.setState({ showList: true })
        
    }
    handleKeyUp(e) {

        if (e.keyCode === 13) {            
            const target = e.target
            const value = target.value
            const newItem = {
                name: value,
                complete: Boolean(false),
                likeCount: 0,
                dislikeCount:0
            }
            this.addItem(newItem,e)
            
            target.value = ''
            
            const all = this.props.todoInfo.filter(function (complete) {
                return complete.complete === true || complete.complete === false

            })
            if (Object.keys(all).length-1  === 0) {
                console.log(Object.keys(all).length)
            //    this.saveToDoFormData()
            } 
        }
        
        
    }

    handleChangeState(item, index) {
        this.props.dispChangeState(index)

        if (item.complete === true) {
            this.setState({ DelDo: true })
            { this.handleDeleteDo }
        }
        const complete = this.props.todoInfo.filter(function (complete) {
            return complete.complete === true
        })
        if (Object.keys(complete).length === 0 ) {
            this.setState({ DelDo: false })
        }
        const active = this.props.todoInfo.filter(function (complete) {
            return complete.complete === false
        })
        this.setState({ count: Object.keys(active).length })
        
    }

}

// connect to Store
const mapStateToProps = (state, ownProps) => ({
    
    todoInfo: state.todoInfo,
    formData: {
        todoInfo: state.todoInfo
    }
    
})

const mapDispatchToProps = (dispatch, ownProps) => {
    const targetReducer = 'todoReducer'
    return {
        dispatch,
        assignStateProps: (properties) => {
            dispatch({
                type: Ks.ASSIGN_STATE_PROPS,
                properties,
                targetReducer
            })
        },
        dispInsertItem: (payload) => {
            dispatch({ type: Ks.INSERT_ITEM, payload, targetReducer })
        },
        dispRemoveItem: (index) => {
            dispatch({ type: Ks.REMOVE_ITEM, index, targetReducer })
        },
        dispChangeState: (index) =>{
            dispatch({ type: Ks.CHANGE_STATE, index, targetReducer })
        },
        dispDeleteDo: (complete) => {
            dispatch({
                type: Ks.DELETE_DO,
                complete,
                targetReducer
            })
        },
        dispOppsiteList: (value) => {
            dispatch({
                type: Ks.OPPSITE_LIST,
                value,
                targetReducer
            })
        },
        dispUpdateLCount: (index, payload) => {
            dispatch({ type: Ks.UPDATE_LCOUNT, index, payload, targetReducer })
        },
        dispUpdateDCount: (index, payload) => {
            dispatch({ type: Ks.UPDATE_DCOUNT, index, payload, targetReducer })
        },
        setBlocking: (flag) => {
            dispatch({ type: Ks.SET_BLOCKING, flag })
        },
        fillFormData: (formData) => {
            dispatch({ type: Ks.FILL_FORM_DATA, formData })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToDo);


//暫時先不使用
//  {todoInfo.map((item, index) =>
//                                <li className="list-group-item" key={index} >
//                                    <div>
//                                        <input type="checkbox" className="click-checkbox" id="ChangeState"
//                                            onChange={(e) =>
//                                                this.handleChangeState(item, index)} />
//                                        <label htmlFor="ChangeState">{item.name}</label>
//                                         <div className="btn-group float-right">
//                                            <button className="btn btn-danger" onClick={(e) =>
//                                                this.removeItem(item, index)}>X</button>
//                                        </div>

//                                    </div>

//                                </li>
//                            )} 
// 