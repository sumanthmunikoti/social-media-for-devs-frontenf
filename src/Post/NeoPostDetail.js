import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../common/constants";
import NavBarComponent from "../Component/NavBar/NavBarComponent";
import { useLocation, Link } from "react-router-dom";
import NeoPostItem from "./NeoPostItem";


export default function NeoPostDetail() {

    const location = useLocation()
    const { id } = location.state
    console.log("locs", location.state)
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [commentNumber, setCommentNumber] = useState(0)

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
                            onChange={e => this.handleComment(e)}
                            required
                        />
                    </form>
                </div>
            </div>
        </div>
    )

}
