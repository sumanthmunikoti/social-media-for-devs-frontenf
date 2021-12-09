import { Component } from "react";
import axios from "axios"
import { API_URL } from "../common/constants";
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import NeoPostItem from "./NeoPostItem";
import { connect } from 'react-redux'

class NeoPosts extends Component {

    state = {
        posts: [],
        postStatus: false,
        text: ''
    }

    componentDidMount = async () => {
        let postsData = await axios.get(`${API_URL}/posts`)

        this.setState({
            posts: postsData.data
        })
    }

    handleChange = e => {
        this.setState({ text: e.target.value });
    };

    submitPost = async () => {
        await fetch(`${API_URL}/posts`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(
                { 
                    userId: this.props.userId,
                    text: this.state.text 
                }
            )
        })
    }

    handleLike = () => {

    }

    handleUnlike = () => {

    }

    deletePost = () => {

    }

    render() {
        return (
            <div>
                <NavBarComponent />

                <div class="container">
                    <div>
                        {
                            this.state.postStatus
                            && <div className="alert alert-success" role="alert">
                                Post Created Successfully
                            </div>
                        }
                    </div>

                    <h1 className='large text-primary'>Posts</h1>
                    <p className='lead'>
                        Welcome to the community
                    </p>
                    <div className='post-form'>
                        <div className='bg-dark p'>
                            <h3>Say Something...</h3>
                        </div>
                        <form
                            className='form my-1'
                            onSubmit={e => {
                                e.preventDefault();
                            }}
                        >
                            <textarea
                                name='text'
                                cols='30'
                                rows='5'
                                placeholder='Create a post'
                                value={this.state.text}
                                required
                                onChange={(e) => this.handleChange(e)}
                            />
                            <button type='submit' className='btn btn-dark my-1'
                                onClick={() => this.submitPost()}>
                                Submit
                            </button>
                        </form>
                    </div>
                    {
                        this.state.posts &&
                        this.state.posts.map(post => console.log(post))
                    }
                    {this.state.posts && this.state.posts.map(post => (
                        <NeoPostItem
                            _id={post._id}
                            userId={this.props.userId}
                            showBtns={true}
                            like={this.handleLike}
                            unlike={this.handleUnlike}
                            currentPost={post}
                            comments={post.comments}
                            likes={post.likes}
                            image={post.user.image}
                            name={post.user.name}
                            id={post.user._id}
                            showDelete={true}
                            delete={this.deletePost}
                            {...post} />
                    ))}
                </div>


            </div>
        )
    }
}

//fetch userId from redux store
const mapStateToProps = (state) => {
    const { id } = state
    console.log("userId in Neoposts", state)
    return {
        userId: id
    }
}

export default connect(mapStateToProps)(NeoPosts)