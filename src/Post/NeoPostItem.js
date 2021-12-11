import { Component, Fragment } from "react";
import { API_URL } from "../common/constants";
import Moment from 'react-moment';
import { Link } from 'react-router-dom'

export default class NeoPostItem extends Component {

    state = {
        currentUser: {},
        show: true
    }

    componentDidMount() {
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
                currentUser: results.user
            }))

    }

    render() {
        return (

            this.state.show ?
                <div>
                    {
                        this.state.likeStatus &&
                        <div className="alert alert-danger" role="alert">
                            You have already liked this post
                        </div>
                    }
                    <div>
                        <div>
                            <h4>{this.props.name}</h4>
                        </div>
                    </div>
                    <div>
                        <p>{this.props.text}</p>
                        <p className='post-date'>
                            Posted on <Moment format='YYYY/MM/DD'>{this.props.date}</Moment>
                        </p>
                        <Fragment>
                            {this.props.showBtns && <button
                                onClick={() => this.props.like(this.props._id)}
                                type='button'
                                className='btn btn-light'
                            >
                                <i className='fa fa-thumbs-up' />
                                <span>{this.props.likes.length > 0 &&
                                    <span>{this.props.likes.length}</span>}</span>
                            </button>}
                            {this.props.showBtns &&
                                <button
                                    onClick={() => this.props.unlike(this.props._id)}
                                    type='button'
                                    className='btn btn-light'
                                >
                                    <i className='fa fa-thumbs-down' />
                                </button>}

                            {
                                this.props.showBtns &&
                                // <Link to={{
                                //     pathname: '/detailedPosts',
                                //     state: {
                                //         id: this.props._id
                                //     }
                                // }} >

                                <Link to="/detailedPosts" state={{id : this.props._id}}>
                                {/* <Link to={"/posts/" + this.props._id}> */}

                                    <button className='btn btn-primary'>
                                        Comment {this.state.showDelete ?
                                            <span>{this.props.comments.length > 0 &&
                                                <span>{this.props.comments.length}</span>}</span>
                                            : null}
                                    </button>
                                </Link>}
                            {
                                this.state.currentUser !== undefined &&
                                this.props.id === this.state.currentUser._id &&
                                this.props.showBtns &&
                                <button
                                    onClick={() => this.props.delete(this.props._id)}
                                    type='button'
                                    className='btn btn-danger'
                                >
                                    <i className='fa fa-times' />
                                </button>
                            }
                        </Fragment>
                    </div>
                </div>
                :
                null
        )
    }
}