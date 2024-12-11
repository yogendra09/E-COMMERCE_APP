import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../src/store/store'

const Wrapper = ({children}) => {
  return (
    <div>
        <Provider store={store}>
        {children}
        </Provider>
    </div>
  )
}

export default Wrapper