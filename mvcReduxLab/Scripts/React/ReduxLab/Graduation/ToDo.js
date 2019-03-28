import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, ToggleButtonGroup } from 'reactstrap'
import { Ks } from 'CommonFF/actions.js'
import apiClient from './apiClient.js'

class ToDo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showList: true,
            showOppList: false,
            showAll: true,
            showComplete: false,
            showActive: false,
            DelDo: false,
            count: Object.keys(this.props.todoInfo).length
        }
        this.removeItem = this.removeItem.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.handleCompleteList = this.handleCompleteList.bind(this)
        this.handleChangeState = this.handleChangeState.bind(this)
        this.handleActiveList = this.handleActiveList.bind(this)
        this.handleAllList = this.handleAllList.bind(this)
        this.handleCompleteList = this.handleCompleteList.bind(this)
        this.handleDeleteDo = this.handleDeleteDo.bind(this)
        this.handleOppsiteList = this.handleOppsiteList.bind(this)
        this.updateKCount = this.updateKCount.bind(this)
        this.updateDCount = this.updateDCount.bind(this)
        this.loadToDoFormData = this.loadToDoFormData.bind(this)
        this.deleteToDoFormData = this.deleteToDoFormData.bind(this)
        this.updateToDoFormData = this.updateToDoFormData.bind(this)
        this.deleteToDoCompleteData = this.deleteToDoCompleteData.bind(this)
        this.loadToDoFormData()
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
                            <input type="checkbox" className="click-checkbox" id={index}
                                onChange={(e) =>
                                    this.handleChangeState(item, index)} checked={Boolean(item.complete)} />
                            <label htmlFor={index}>{item.name}</label>
                            <span className="badge badge-primary badge-pill">{item.likeCount}</span>
                            <span className="badge badge-danger badge-pill">{item.dislikeCount}</span>
                        </div>
                        <div className="btn-group float-right">
                            <button className="btn btn-primary" onClick={(e) => this.updateKCount(item, index)}>讚</button>
                            <button className="btn btn-danger" onClick={(e) => this.updateDCount(item, index)}>爛</button>
                            <button className="btn btn-danger" onClick={(e) =>
                                this.removeItem(item, index)}>X</button>

                        </div>

                    </div>

                </div>

            </li>
            ))
        let completeList = todoInfo.filter(function (complete) {
            return complete.complete === true
        }).map((item, index) =>
            (<li className="list-group-item" key={index} >
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input type="checkbox" className="click-checkbox" id={index}
                                onChange={(e) =>
                                    this.handleChangeState(item, index)} checked={Boolean(item.complete)} />
                            <label htmlFor={index}>{item.name}</label>
                            <span className="badge badge-primary badge-pill">{item.likeCount}</span>
                            <span className="badge badge-danger badge-pill">{item.dislikeCount}</span>
                        </div>
                        <div className="btn-group float-right">
                            <button className="btn btn-primary" onClick={(e) => this.updateKCount(item, index)}>讚</button>
                            <button className="btn btn-danger" onClick={(e) => this.updateDCount(item, index)}>爛</button>
                            <button className="btn btn-danger" onClick={(e) =>
                                this.removeItem(item, index)}>X</button>

                        </div>

                    </div>

                </div>

            </li>
            ))
        let activeList = todoInfo.filter(function (complete) {
            return complete.complete === false
        }).map((item, index) =>
            (<li className="list-group-item" key={index} >
                <div className="input-group">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <input type="checkbox" className="click-checkbox" id={index}
                                onChange={(e) =>
                                    this.handleChangeState(item, index)} checked={Boolean(item.complete)} />
                            <label htmlFor={index}>{item.name}</label>
                            <span className="badge badge-primary badge-pill">{item.likeCount}</span>
                            <span className="badge badge-danger badge-pill">{item.dislikeCount}</span>
                        </div>
                        <div className="btn-group float-right">
                            <button className="btn btn-primary" onClick={(e) => this.updateKCount(item, index)}>讚</button>
                            <button className="btn btn-danger" onClick={(e) => this.updateDCount(item, index)}>爛</button>
                            <button className="btn btn-danger" onClick={(e) =>
                                this.removeItem(item, index)}>X</button>

                        </div>

                    </div>

                </div>

            </li>
            ))

        return (
            <div align='center' className="fadeTodo" >
                <header className='header'>
                    <h1 className='display-1 sT'>todos</h1>
                   
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
    updateKCount(item, index) {
        item.likeCount = item.likeCount + 1 // 設定新值
        console.log('i am here', event.target)
        console.log('i am item', item,index)
        this.props.dispUpdateKCount(index, item)
        //this.updateToDoFormData()
    }
    updateDCount(item, index) {
        item.dislikeCount = item.dislikeCount + 1 // 設定新值s
        this.props.dispUpdateDCount(index, item)
        
        this.updateToDoFormData()
    }
    updateToDoFormData(e) {
        const { formData } = this.props
        console.log('SaveToDoFormData', { formData })
        console.log('SaveToDoFormDataTodo',  this.props.todoInfo )
        apiClient.UpdateToDoFormData(formData).then((resp) => {

        }).catch((xhr) => {
            console.log('SaveToDoFormData fail!', { xhr })
            const err = xhr.response.data;
            swal.fire('SaveToDoFormData fail!', err.errMsg, 'error')
            }).finally(() => {

        })
    }
    deleteToDoCompleteData(e) {
        const { formData } = this.props
        apiClient.DeleteToDoCompleteData(formData).then((resp) => {

        }).catch((xhr) => {
            console.log('SaveToDoFormData fail!', { xhr })
            const err = xhr.response.data;
            swal.fire('SaveToDoFormData fail!', err.errMsg, 'error')
        }).finally(() => {

        })
    }
    loadToDoFormData(e) {
        console.log('updateToDoFormData')
        //this.props.setBlocking(true)

        apiClient.LoadToDoFormData().then((resp) => {
            const formData = resp.data
            this.props.assignStateProps(formData)
            const active = this.props.todoInfo.filter(function (complete) {
                return complete.complete === false
            })
            this.setState({ count: Object.keys(active).length })

        }).catch((xhr) => {
            console.log('updateToDoFormData fail!', { xhr })
            const err = xhr.response.data;
            swal.fire('updateToDoFormData fail!', err.errMsg, 'error')
        }).finally(() => {
            //this.props.setBlocking(false)
            const complete = this.props.todoInfo.filter(function (complete) {
                return complete.complete === true
            })
            if (Object.keys(complete).length  === 0) {
                this.setState({ DelDo: false })
            } else {
                this.setState({ DelDo: true })
            }
            })

    }
    deleteToDoFormData(item) {
        const name  = item.name
        console.log('deleteToDoFormData',  name)

        //this.props.setBlocking(true)
        const args = { name }
        apiClient.DeleteToDoFormData(args).then((resp) => {
            console.log('deleteToDoFormData success', { resp })
            
        }).catch((xhr) => {
            console.log('deleteToDoFormData fail!', { xhr })
            const err = xhr.response.data;
            swal.fire('deleteToDoFormData fail!', err.errMsg, 'error')
        }).finally(() => {
           // this.props.setBlocking(false)
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
            this.setState({ count: Object.keys(active).length })
        } else {
            this.setState({ count: 0 })
        }
        const complete = this.props.todoInfo.filter(function (complete) {
            return complete.complete === true
        })
        if (Object.keys(complete).length === 0) {
            this.setState({ DelDo: false })
        } else {
            this.setState({ DelDo: true })
        }

       this.updateToDoFormData()
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
        if (Object.keys(complete).length - 1 === 0) {
            this.setState({ DelDo: false })
        } else {
            this.setState({ DelDo: true })
        }
        this.deleteToDoCompleteData()
    }
    removeItem(item, index) {
        this.props.dispRemoveItem(index)
        const complete = this.props.todoInfo.filter(function (complete) {
            return complete.complete === true
        })
        if (Object.keys(complete).length - 1 === 0) {
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
        if (Object.keys(all).length - 1 === 0) {
            this.setState({ showList: false })
        }
        this.deleteToDoFormData(item)
    }

    handleKeyUp(e) {

        if (e.keyCode === 13) {
            const target = e.target
            const name = target.value
           
            const args = {name}
           console.log(args)
            apiClient.SaveToDoFormData(args).then((resp) => {
                const formData = resp.data
                this.props.assignStateProps(formData)
            }).catch((xhr) => {
                console.log('SaveToDoFormData fail!', { xhr })
                const err = xhr.response.data;
                swal.fire('SaveToDoFormData fail!', err.errMsg, 'error')
            }).finally(() => {

            })

            target.value = ''
            const active = this.props.todoInfo.filter(function (complete) {
                return complete.complete === false
            })
            this.setState({ count: Object.keys(active).length+1})
            this.setState({ showList: true })
        }


    }

    handleChangeState(item, index) {
        this.props.dispChangeState(index)
        if (item.complete === true) {
            this.setState({ DelDo: true })
        }
        const complete = this.props.todoInfo.filter(function (complete) {
            return complete.complete === true
        })
        if (Object.keys(complete).length === 0) {
            this.setState({ DelDo: false })
        }
        const active = this.props.todoInfo.filter(function (complete) {
            return complete.complete === false
        })
        this.setState({ count: Object.keys(active).length })
        this.updateToDoFormData()

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
        dispInsertAItem: (payload,formdata) => {
            dispatch({ type: Ks.INSERT_AITEM, payload, formdata,targetReducer })
        },
        dispRemoveItem: (index) => {
            dispatch({ type: Ks.REMOVE_ITEM, index, targetReducer })
        },
        dispChangeState: (index) => {
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
        dispUpdateKCount: (index, payload) => {
            dispatch({ type: Ks.UPDATE_KCOUNT, index, payload, targetReducer })
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