import React from "react";

class PayNow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debtInfo: this.props.debtInfo,
      
    }
  }
  render() {
    return (
      <div>
        <form >
          <label htmlFor="payNow">Enter Payment Amount</label>
          <br />
          <input onChange={this.handlePayNow} type="number"/>
          <br />
          <button>Submit Payment</button>
        </form>
      </div>
    )
  }
};

export default PayNow;