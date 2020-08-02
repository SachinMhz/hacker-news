import React from "react";
import Reply from "./Reply";
import loading from "../res/images/loading.gif";

class Comment extends React.Component {
  state = {
    id: this.props.id,
    item: [],
    isLoading: true,
    showChild: false,
  };

  componentDidMount() {
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${this.state.id}.json?print=pretty`
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({ item: result, isLoading: false, showChild: true });
      });
  }

  empty = () => {
    return (
      <div className="loading">
        <img className="loading__image" src={loading} alt="loading..." />
      </div>
    );
  };

  loaded = () => {
    const { by, kids, text } = this.state.item;
    const { showChild } = this.state;
    return (
      <div className="comment">
        <div className="comment__header">
          <span className="comment__user">{by}</span>
          <span
            className="comment__visibility"
            onClick={() => this.setState({ showChild: !showChild })}
          >
            [{showChild ? "hide" : "show"} -{kids ? kids.length : "0"}]
          </span>
        </div>
        {showChild && <div dangerouslySetInnerHTML={{ __html: text }} />}
        {showChild && kids && (
          <div>
            {kids.map((id) => (
              <Reply key={id} id={id} />
            ))}
          </div>
        )}
      </div>
    );
  };
  render() {
    return <div>{this.state.isLoading ? this.empty() : this.loaded()}</div>;
  }
}

export default Comment;
