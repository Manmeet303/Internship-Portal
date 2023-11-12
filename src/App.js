import { useEffect } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Importing the Header Footer Components.
import Header from "./components/header";
import Footer from "./components/footer";
// Importing Routes.
import CompanyRoute from "./Route/CompanyRoute";
import UserRoute from "./Route/UserRoute";
// Importing Views
import Home from "./views/home.js";
import AboutUs from "./views/AboutUs";
import ContactUs from "./views/ContactUs";
import Company from "./views/Company";
// Importing Store and UserAction.
import { loadUser } from "./actions/userAction";
import store from "./store";
// Generalized CSS
import "./css/App.css";
import "react-toastify/dist/ReactToastify.css";
import "./css/Header.css";
import "./css/Footer.css";
import CompanyInfo from "./components/CompanyInfo";
const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <BrowserRouter className="App">
            <Header />
            {/* General Paths */}
            <Route exact path="/" component={Home} />
            <Route exact path="/AboutUs" component={AboutUs} />
            <Route exact path="/ContactUs" component={ContactUs} />
            <Route exact path="/Company" component={Company} />
            <Route exact path="/Company/Info/:id" component={CompanyInfo} />
            {/* User Routes */}
            <UserRoute />
            {/* Company Routes */}
            <CompanyRoute />
            <Footer />
            {/* Toast Notifier */}
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </BrowserRouter>
    );
};

export default App;
