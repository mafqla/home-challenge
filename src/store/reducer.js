const defaultState = {
    mykey: 1
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state=defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case "addKeyFn":
            newState.mykey++;
            break;
        default:
            break;
    }
    return newState;
}