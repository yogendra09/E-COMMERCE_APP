import { Provider } from "react-redux";
import { store } from "@/store/store.js";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Wrapper = ({ children }) => {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
          {children}
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default Wrapper;
