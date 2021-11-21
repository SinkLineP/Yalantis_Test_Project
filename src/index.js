import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initalState = {
  users: [],
};

function updateRecord(state, id, changeActive) {
  const newUsers = state.users.map((rec) => {
    if (rec.id === id) {
      return { ...rec, active: changeActive };
    }
    return rec;
  });
  return { ...state, users: newUsers };
}

function employees(state = initalState, action) {
  switch (action.type) {
    case 'ADD_USERS':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'UPDATE_USERS':
      return updateRecord(state, action.payload.id, action.payload.active);

    default:
      return state;
  }
}

const store = createStore(
  employees,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  // console.log('subscribe', store.getState());
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
