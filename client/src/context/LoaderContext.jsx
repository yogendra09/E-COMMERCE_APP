import { createContext, useState } from "react";
import PropTypes from 'prop-types';


export const LoaderContext = createContext(); 

const LoaderProvider = ({ children }) => {
    const [Loading, setLoading] = useState(true)
    return(
        <LoaderContext.Provider value={{Loading, setLoading}}>
            {children}
        </LoaderContext.Provider>
    )
}
LoaderProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default LoaderProvider;
