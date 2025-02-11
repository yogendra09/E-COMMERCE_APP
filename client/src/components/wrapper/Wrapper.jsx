import { Provider } from "react-redux";
import { store } from "@/store/store.js";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SocketProvider from "../../context/SocketContext";
import PropTypes from 'prop-types';
import LoaderProvider from "../../context/LoaderContext";
import '../../css/style.css';
import '../../css/satoshi.css';
// import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
const Wrapper = ({ children }) => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
        <SocketProvider>
          <LoaderProvider>
          <ToastContainer />
          {children}
          </LoaderProvider>
          </SocketProvider>
        </BrowserRouter>
      </Provider>
    </div>
  );
};
Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
