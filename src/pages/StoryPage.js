import React from "react";
import Comment from "../components/Comment";

import loading from "../res/images/loading.gif";

class StoryPage extends React.Component {
  state = {
    item: [],
    isLoading: true,
    showChild: false,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      )
        .then((res) => res.json())
        .then((result) => {
          this.setState({ item: result, isLoading: false, showChild: true });
        });
    }
  }

  empty = () => {
    return (
      <div className="loading">
        <img className="loading__image" src={loading} alt="loading..." />
      </div>
    );
  };
  loaded = () => {
    const { title, url, by, kids, text } = this.state.item;
    const { showChild } = this.state;
    return (
      <div className="story">
        <a className="story__title" href={url} title={url}>
          {title}
        </a>
        <div className="story__user">(by {by})</div>

        <div style={{ marginLeft: 10 }}>
          {showChild && <div dangerouslySetInnerHTML={{ __html: text }} />}
          {showChild && kids && (
            <div>
              {kids.map((id) => (
                <Comment key={id} id={id} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  render() {
    return <div>{this.state.isLoading ? this.empty() : this.loaded()}</div>;
  }
}

export default StoryPage;
