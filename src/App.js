import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import StoryPage from "./pages/StoryPage";

class App extends React.Component {
  render() {
    return (
      <div className="Main">
        <BrowserRouter>
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/story/:id" component={StoryPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
