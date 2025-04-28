//@ts-nocheck
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeDetail = () => {
    this.setState({
      color: "blue",
      brand: "Tesla",
      model: "Model S",
      year: 2021,
    });
  };

  componentDidMount() {
    console.log("ComponentDidMount");
    //runs after the component output has been rendered to the DOM
    //Retrieve data from backend server
  }

  componentWillUnmount(): void {
    console.log("ComponentWillUnmount");
    //runs after the component output has been removed from the DOM
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log("ComponentDidUpdate"); //runs after the component output has been updated
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          Colot: {this.state.color} - Model:{this.state.model} from{" "}
          {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change Detail
        </button>
      </div>
    );
  }
}

export default Test;
