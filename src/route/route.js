import React from "react"
import ScrollToTop from "react-scroll-to-top"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from '../components/header'
import Footer from '../components/footer'
import Home from "./Home";
import Register from "./Register";
// import BookRoom from "./BookRoom";

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop smooth />
      <div className="main">
        <div className="container">
          <Header />
          <section>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              {/* <Route exact path="/book" component={BookRoom} /> */}
            </Switch>
          </section>
          <Footer />
        </div>
      </div>
    </Router>
  );
}
export default AppRoutes;