import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default class App extends React.Component {
  render() {
    return (
      <Loader
        type="ThreeDots"
        color="#ff7272"
        height={72}
        width={72}
        timeout={3000}
      />
    );
  }
}
