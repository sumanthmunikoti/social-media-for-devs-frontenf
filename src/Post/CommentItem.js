import { Component } from "react"
import axios from "axios"
import { API_URL } from "../common/constants"
import { connect } from 'react-redux'

class CommentItem extends Component {

    state = {
        show: true,
        commentUser: '',
        dashboardToken: '',
        currentUser: ''
    }

    componentDidMount() {
        axios.get(`${API_URL}/users/id/${this.props.user}`)
            .then(res => {
                if (res.data) {
                    this.setState({
                        commentUser: res.data
                    })
                }
            })
            .then(() =>
                fetch(`${API_URL}/profile/me`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: this.props.userId
                    })
                })
                    .then(response => response.json())
                    .then(results => this.setState({
                        user: results.user
                    }))
            )
    }

    render() {
        return (
            this.state.show ?

                    <div className='post bg-white'>
                        <div>
                            <h4>{this.state.commentUser?this.state.commentUser.name:<span><i className="fas fa-dizzy"/> <i>User Removed By Admin</i></span> }</h4>
                        </div>
                        <div>
                            <p>{this.props.text}</p>
                            <p className='post-date'>
                                Posted on {this.props.date}
                            </p>
                            {this.state.currentUser && this.state.currentUser._id === this.state.commentUser._id &&

                            <button
                                onClick={this.handleDeleteComment}
                                type='button'
                                className='btn btn-danger'
                            >

                                <i className='fa fa-times'/>
                            </button>
                            }
                        </div>
                    </div>
                    :
                    null
        )
    }

}

//fetch userId from redux store
const mapStateToProps = (state) => {
    const { id } = state
    // console.log("state in db", state)
    return {
        userId: id
    }
}

export default connect(mapStateToProps)(CommentItem)
