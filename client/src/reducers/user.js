const defaultState =
    {};


const user = (state = defaultState, action) => {
    switch (action.type) {
        case 'SIGN_IN_OK':
            return {
                ...state,
                error: false,
                name: action.user.name,
                id: action.user._id
            };
        case 'SIGN_IN_KO':
            return {
                ...state,
                error: true
            };
        case 'ME_LOADED':
            return {
                ...state,
                ...action.user
            };
        default:
            return state
    }
};

export default user;
