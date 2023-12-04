import React from "react";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };

    console.log(`${this.props.name} child constructor`);
  }

  componentDidMount() {
    console.log(`${this.props.name} child componentDidMount`);
  }

  render() {
    const { count } = this.state;
    console.log(`${this.props.name} child render`);
    return (
      <div>
        <h1>count = {count}</h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Click
        </button>
        <h2>Name:{this.props.name}</h2>
        <h3>Location :{this.props.location}</h3>
        <h4>Contact:@gatme</h4>
      </div>
    );
  }
}

export default User;
