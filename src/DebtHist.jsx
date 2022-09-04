import React from "react";

class DebtHist extends React.Component { 

  render() {
    const {items} = this.props;
    return (
      <div>
        <h3>Transaction History</h3>
        <hr />
        <ul className="debt-hist">
        {items.map((item) => (
          <li key={item.id}>Date:{item.date} ~~ Amount: ${item.payNow} ~~ Remaining: ${item.remDebt}</li>
        ))}
      </ul>
      </div>
    )
  }
}

export default DebtHist;