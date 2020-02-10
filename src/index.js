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

function actionIncrement(amount=1, target='amount'){
    return {type:INCREMENT, amount, target}
}

function actionDecrement(amount=1, target='amount'){
    return {type:DECREMENT, amount, target}
}

function actionAdd(name, init=0){
    return {type:ADD_COUNTER, name, init};
}

function actionDel(name){
    return {type:ADD_COUNTER,name};
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
function counter(state={amount: 100}, action){
    console.log("inside of counter function");
    
    const newState = {...state};

    switch(action.type){
        case INCREMENT:
            newState[action.target] = newState[action.target] + action.amount; break;
        case DECREMENT:
            newState[action.target] = newState[action.target] - action.amount; break;
        case ADD_COUNTER:
            newState[action.name] = action.init; break;
        case DEL_COUNTER:
                delete newState[action.name]; break;
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
    //they MUST return the new version of state.
    return newState;
}
// you give it a reducer, you give it a "store"
// the store is an object that manages your state using your reducer
const store = createStore(counter);

store.subscribe(() => {
    console.log(`the state is now:`);
    console.table(store.getState());
});
// lets give the store some actions to process.

store.dispatch(actionAdd('second', 50));
store.dispatch(actionIncrement(5));
store.dispatch(actionIncrement());
store.dispatch(actionIncrement());
store.dispatch(actionIncrement(20, 'second'));
store.dispatch(actionDecrement(5));
store.dispatch(actionDecrement());
store.dispatch(actionDecrement(22));
store.dispatch(actionAdd('third', 50));
store.dispatch(actionAdd('anothercounter'));
store.dispatch(actionDel('busted'));
store.dispatch(actionDel('second'));

//"push notifications" - subscribe to changes in store
