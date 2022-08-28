import React from "react";

class DebtHist extends React.Component { 

  render() {
    const {items} = this.props;
    return (
      <ul>
        {items.forEach((item) => (
          <li key={item.id}>Date: {item.date}  Amount: {item.payNow}  Remaining: {item.remDebt}</li>
        ))}
      </ul>
    )
  }
}

export default DebtHist;