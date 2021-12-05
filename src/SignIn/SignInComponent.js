import { API_URL } from "../common/constants";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

export default function SignInComponent() {

    const [email, setEmail] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const login = async () => {
        await fetch(`${API_URL}/users/auth`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        }).then(response =>
            response.json()
        ).then(r => {
            console.log("SUCCESS", r)
            dispatch({
                type: "SAVE_USER",
                email: r[0].email,
                id: r[0]._id
            })
            
            navigate(`/dashboard`)
        })
    }


    return (
        <div>
            Login Page
            <form className="form">
                <div className="form-group">
                    <input onChange={async (e) =>
                            setEmail(e.target.value)
                    }
                        placeholder="Email Address"
                        name={"email"}
                        required
                        type={"email"}
                        value={email}
                    />
                </div>
            </form>
            <button type="submit" onClick={login} className="btn btn-primary">
                Sign In
            </button>
        </div>
    )

}