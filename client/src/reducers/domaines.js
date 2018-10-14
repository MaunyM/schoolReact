const domaine = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_DOMAINE':
            return {
                ...state,
                name: action.name,
                code: action.code
            };
        default:
            return state
    }
};

const domaines = (state = [], action) => {
    switch (action.type) {
        case 'DOMAINES_LOADED':
            return action.domaines;
        case 'ADD_DOMAINE':
            return [
                ...state,
                domaine({}, action)
            ];
        case 'UPDATE_DOMAINE':
            return [
                ...state.filter(domaine => domaine._id !== action.domaine._id),
                action.domaine
            ];
        default :
            return state
    }
};
export default domaines;
