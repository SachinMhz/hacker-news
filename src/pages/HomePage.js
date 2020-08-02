import React from "react";
import Headline from "../components/Headline";
import loading from "../res/images/loading.gif";

const NO_OF_PAGES = 20;

function HeadlineWrapper({ page, data }) {
  const pageNo = (page - 1) * NO_OF_PAGES;
  const storyList = data.slice(pageNo, pageNo + NO_OF_PAGES);
  return (
    <div>
      {storyList.map((id) => (
        <Headline key={id} id={id} />
      ))}
    </div>
  );
}

class HomePage extends React.Component {
  state = {
    data: [],
    isLoading: true,
    headlineNo: 15,
    page: 1,
  };
  componentDidMount() {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then((res) => res.json())
      .then((result) => this.setState({ data: result, isLoading: false }));
  }

  nextPage = () => {
    if (this.state.page < 500 / NO_OF_PAGES) {
      this.setState({ page: this.state.page + 1 });
    }
  };
  prevPage = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  render() {
    return (
      <div className="Main">
        <div className="heading clearFix">
          <h1 className="heading__text">Hacker News </h1>
          <span className="heading__nav">
            <span className="heading__arrow" onClick={this.prevPage}>
              <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </span>
            <span className="heading__number">{this.state.page}</span>
            <span className="heading__arrow" onClick={this.nextPage}>
              <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </span>
          </span>
        </div>
        {this.state.isLoading ? (
          <div className="loading">
            <img className="loading__image" src={loading} alt="loading..." />
          </div>
        ) : (
          <div>
            <HeadlineWrapper data={this.state.data} page={this.state.page} />
          </div>
        )}
      </div>
    );
  }
}

export default HomePage;
