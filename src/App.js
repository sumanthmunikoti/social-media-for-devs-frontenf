import React from 'react';
import SocialMediaManagerComponent from './SocialMediaManagerComponent'
import { createStore } from 'redux';
import reducer from './Reducer/reducer'
import { Provider } from 'react-redux'

function App() {
  const store = createStore(reducer)
  return (
    <div>
      <Provider store={store}>
        <SocialMediaManagerComponent />
      </Provider>
    </div>
  );
}

export default App;