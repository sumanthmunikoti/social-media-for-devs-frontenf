import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../common/constants";
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import { useLocation, Link } from "react-router-dom";
import NeoPostItem from "./NeoPostItem";


export default function NeoPostDetail() {

    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [commentNumber, setCommentNumber] = useState(0)

    const location = useLocation()
    console.log("locs", location.state)
    
    let id = ''
    let userId = ''
    
    if (location.state !== null) {
        id = location.state.id
        userId = location.state.userId
    } 

    // const id = location.state.id
    // const userId = location.state.userId



    useEffect(() => {

        async function fetchData() {
            let postData = await axios.get(`${API_URL}/posts/${id}`)
            let data = []

            data.push(postData.data)

            setPost(data[0])
            setComments(data[0].comments)
        }
        fetchData()
    }, [])

    const handlePostComponent = async (comment) => {
        await fetch(`${API_URL}/posts/comment/${post._id}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                text: comment
            })
        });
    }

    return (
        <div>
            <NavBarComponent />
            <div className={"container"}>
                {
                    post.likes &&
                    <NeoPostItem
                        showDelete={false}
                        likes={post.likes}
                        _id={post._id}
                        user={post.user}
                        showBtns={false}
                        comments={post.comments}
                        text={post.text}
                        date={post.date}
                        image={post.user.image}
                    />
                }

                <div>
                    <div className="bg-primary">
                        <h3>Leave a comment</h3>
                    </div>
                    <form className="form">
                        <textarea
                            name='text'
                            cols='30'
                            rows='5'
                            placeholder='Comment here pls'
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            required
                        />
                        <input type='submit' className="btn btn-dark" value='Submit'
                            onClick={() => handlePostComponent(comment)} />
                    </form>

                    {/* {this.state.comments && this.state.comments.length > 0 && this.state.comments.map(com => (
                        <CommentItem
                            postId={this.state.id}
                            _id={com._id}
                            text={com.text}
                            user={com.user}
                            {...com} />

                    ))} */}
                </div>
            </div>
        </div>
    )

}
