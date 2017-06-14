
const domaines = (state = [], action) => {
    switch (action.type) {
        case 'DOMAINES_LOADED': return action.domaines;
        break;
        default :
            return state
    }
};
export default domaines;
