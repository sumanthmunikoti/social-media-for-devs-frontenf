const initialState = {
    email: '',
    id: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "SAVE_USER": {
            console.log(action.email)
            console.log(action.id)
            return {
                email: action.email,
                id: action.id
            }
        }
        default:
            return state
    }
}

export default reducer