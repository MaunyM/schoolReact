const defaultState =
    {
        sidebarVisible : false
    };


const navigation = (state = defaultState, action) => {
    switch (action.type) {
        case 'SIDEBAR_SHOW':
            return {
                ...state,
                sidebarVisible : true
            };
        case 'SIDEBAR_HIDE':
            return {
                ...state,
                sidebarVisible : false
            };
        default:
            return state
    }
};

export default navigation;
