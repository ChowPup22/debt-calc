import React from "react";

const DebtHist = ({items}) => (
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
export default DebtHist;