import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions, { Ks } from 'CommonFF/actions.js'
import TextField from 'CommonMA/FormInputFields/TextField.js'

class Like extends Component {
    constructor(props) {
        super(props)


    }
    render() {
        const { likeInfo, dispatch, handleValueChange } = this.props
        return (
            <div className="container" >
            < div >
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
                    integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous" />
                <h2>請問這篇貼文喜歡還是不喜歡</h2>
                    
                        <TextField label="姓名:" name="idName" onChange={handleValueChange} value={likeInfo.idName || ''}
                        />


            </div>
            <div>
                <button onClick={() => dispatch({ type: 'INCREASE_LIKE' })} className="fas fa-thumbs-up" name="like">{likeInfo.likeCount}</button>
                <button onClick={() => dispatch({ type: 'DECREASE_LIKE' })} className="fas fa-thumbs-down" name="dislike">{likeInfo.dislikeCount}</button>
                </div>
            </div>
        )
    }

}
// connect to Store
const mapStateToProps = (state, ownProps) => {
    return {
        likeInfo: state.likeInfo
    }

}
const mapDispatchToProps = (dispatch, ownProps) => {
    const targetReducer = 'likeReducer'
    return{
        dispatch,
        handleValueChange: (name, value) => {
            dispatch({
                type: Ks.ASSIGN_VALUE,
                name,
                value,
                targetReducer
            })
        },
        assignStateProps: (properties) => {
            dispatch({
                type: Ks.ASSIGN_STATE_PROPS,
                properties,
                targetReducer
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Like);