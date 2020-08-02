import React from "react";
import { HashRouter , Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import StoryPage from "./pages/StoryPage";

class App extends React.Component {
  render() {
    return (
      <div className="Main">
        <HashRouter >
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/story/:id" component={StoryPage} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
