import React from "react";
import User from "./User";

class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("Parent constructor");
    this.state = {
      count: 0,
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/blockDeepanshu");
    const json = await data.json();

    console.log(json);

    this.setState({
      count: this.state.count + 1,
    });
  }

  componentDidUpdate() {
    console.log("component did update");
  }

  componentWillUnmount() {
    console.log("component unmount");
  }

  render() {
    console.log("Parent render");
    return (
      <div style={{ color: "white" }}>
        <User name={"First"} location={"India"} />
        <User name={"Second"} location={"India"} />
      </div>
    );
  }
}

export default About;
