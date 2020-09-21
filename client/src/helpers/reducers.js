export default function searchReducer(state, action) {
    switch (action.type) {
        case 'login': {
            return  true
        }
        case 'logout': {
            return false
        }
        default:
            return state
    }
}