import React from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import loading from "../res/images/loading.gif";

class Headline extends React.Component {
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
        this.setState({ item: result, isLoading: false });
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
    const { title, score, kids, by, url } = this.state.item;
    const { showChild } = this.state;
    return (
      <div className={"headline clearFix"}>
        <div className="float-left">
          <a className="headline__title" href={url} title={url}>
            {title}
          </a>
          <span className="headline__score">{score} points</span>
          <span className="headline__user">
            by <strong>{by}</strong>
          </span>
        </div>
        <Link
          className="headline__comment float-right"
          to={`/story/${this.state.id}`}
          onClick={() => this.setState({ showChild: !showChild })}
        >
          Comments
        </Link>
        <div>
          {showChild && kids && (
            <div style={{ borderLeft: "5px solid red" }}>
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

export default Headline;
