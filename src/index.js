// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
import { createStore } from "redux";



// store your dispatch types as CONST to help prevent typo bugs.
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ADD_COUNTER = 'ADD_COUNTER';
const DEL_COUNTER = 'DEL_COUNTER';


//write action creator funtions. They format your action object, to avoid bug via typo.
// ReactDOM.render(<App />, document.getElementById('root'));

function actionIncrement(amount=1, id=0){
    return {type:INCREMENT, amount, id}
}

function actionDecrement(amount=1, id=0){
    return {type:DECREMENT, amount, id}
}

function actionAdd(){
    return {type:ADD_COUNTER};
}

function actionDel(id){
    return {type:DEL_COUNTER,id};
}
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

//"the bank" - state
//describe the ideal version of state

// {
//     amount: 100

// }

// if we added to the amount, what would state look like?
// {
//     amount: 101
// }

//"a transaction slip" - action
// {
//     type: INCREMENT
// }

// {
//     type: DECREMENT
// }

// "the teller" - reducer funtion
// reducers are always named for the state they manage.
// they always recieve the current state and the action they are processing
function counter(state = {amount: [0]}, action){
    console.log("inside of counter function");
    
    const newState = {...state};

    switch(action.type){
        case INCREMENT:
            console.log("increment");
            newState.amount[action.id] = newState.amount[action.id] + action.amount; break;
        case DECREMENT:
            console.log("decrement");
            newState.amount[action.id] = newState.amount[action.id] - action.amount; break;
        case ADD_COUNTER:
            console.log("add");
            newState.amount.push(0);
            break;
        case DEL_COUNTER:
            console.log("del");
                newState.amount.splice(action.id, 1); break;
        default:
            break;
    }

    // if(action.type === INCREMENT){
    //     newState.amount = newState.amount + action.amount;
    // } else if(action.type === DECREMENT) {
    //     newState.amount = newState.amount - action.amount;
    // } else {
    //     //pass. Just return the unmodified copy of state in newState.
    // }
    // they MUST return the new version of state.
    return newState;
}
// you give it a reducer, you give it a "store"
// the store is an object that manages your state using your reducer
const store = createStore(counter, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    console.log(`the state is now:`);
    console.table(store.getState());
});
// lets give the store some actions to process.

store.dispatch(actionAdd());
store.dispatch(actionIncrement(5));
store.dispatch(actionIncrement());
store.dispatch(actionIncrement());
store.dispatch(actionIncrement(20));
store.dispatch(actionDecrement(5));
store.dispatch(actionDecrement());
store.dispatch(actionDecrement(22));
store.dispatch(actionAdd());
store.dispatch(actionAdd());
store.dispatch(actionDel(2));
store.dispatch(actionDel(1));

//"push notifications" - subscribe to changes in store
