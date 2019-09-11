import React, { Component } from "react";
import axios from "axios";

export class Home extends Component {
  state = {
    comments: []
  };

  componentDidMount = async () => {
    try {
      const { data } = await axios.get(
        "http://jsonplaceholder.typicode.com/photos?_start=0&_limit=6"
      );
      this.setState({ comments: data });
    } catch (err) {
      console.error(err);
    }
  };
  render() {
    const { comments } = this.state;

    const gridContainer = {
      display: "grid",
      gridTemplateColumns: "auto auto auto"
    };

    const pictures = comments.map(x => {
      return (
        <div key={x.id}>
          <img
            style={{ height: "100%", width: "100%" }}
            src={x.url}
            alt="some nice things"
          ></img>
        </div>
      );
    });

    return <div style={gridContainer}>{pictures}</div>;
  }
}

export default Home;
