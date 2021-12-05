import React, { Component } from "react";

import withCardView from "./common/withCardView";
import Table from "./common/table";

class ListOfConnectedAVs extends Component {
  state = {
    data: [
      {email: "hello",
      vid: "12345",
      vcurrentstatus: "active",
    },
    {
      email: "abc",
      vid: "56789",
      vcurrentstatus: "inactive"
    }
    ]
  };

  columns = [
    { path: "email", label: "AV Owner" },
    { path: "vid", label: "AV Number" },
    { path: "vcurrentstatus", label: "AV State" },
  ];


  render() {
    return (
      <React.Fragment>
        <h1>List of connected AVs</h1>
        <div
          className="dropdown-divider"
          style={{
            marginBottom: "30px",
            borderBlockColor: "#BEE5F0",
          }}
        ></div>
        <Table
          data={this.state.data}
          columns={this.columns}
          keyAtt="number"
        ></Table>
      </React.Fragment>
    );
  }
}

export default withCardView(ListOfConnectedAVs);
