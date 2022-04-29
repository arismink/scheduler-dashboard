import React, { Component } from "react";

import classnames from "classnames";

import Loading from "./Loading";
import Panel from "./Panel";
import { set } from "lodash";

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];

class Dashboard extends Component {

  constructor(props) {
    super(props);

    // Default state
    this.state = {
      loading: false,
      focused: null
    };

  };

  selectPanel(id) {
    // Depend on existing state to get next value
    this.setState(prevState => ({
      focused: prevState.focused !== null ? null : id
    }))
  };


  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
    });
    

    if (this.state.loading) {
      return <Loading />
    };

    // When value is null, we are in unfocused 4-panel view.. In focused mode, we want to render only 1 panel
    const panels = (this.state.focused ? data.filter(panel => this.state.focused === panel.id) : data)
      .map(panel => {
        return (
          <Panel
            key={panel.id}
            id={panel.id}
            label={panel.label}
            value={panel.value}
            onSelect={event => this.selectPanel(panel.id)}
          />)
    })

    return <main className={dashboardClasses}> {panels} </main>;
  };

}

export default Dashboard;
