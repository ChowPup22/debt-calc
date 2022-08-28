import React from 'react';
import DebtHist from './DebtHist';

class DebtCalcApp extends React.Component {
  constructor() {
    super();
    this.state = {
      totalDebt: 0,
      interest: 0,
      minPay: 0,
      debtInfo: [],
      payNow: 0,
      remDebt: 0,
      date: '',
      id: '',
      payHist: [],
    }
  }

  handleDebt = ({target: { value }}) => this.setState({totalDebt: value});
  handleInt = ({target: { value }}) => this.setState({interest: value}, this.handleMinPay());
  handlePayNow = ({target: {value}}) => this.setState({ payNow: value});

  handleMinPay = () => {
    const {totalDebt, interest} = this.state;
    // e.preventDefault();

    const int = ((interest / 100) /12 * totalDebt);

    const min = ((totalDebt * 0.01) + int).toFixed(2);
  
    this.setState({minPay: min});

    const newInfo = {
      intNow: int.toFixed(2),
      totalDebt: totalDebt,
    }

    this.setState({debtInfo: newInfo});
    
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const {debtInfo, payNow} = this.state;

    const rem = (debtInfo.totalDebt - (payNow - debtInfo.intNow)).toFixed(2);
    

    const newItem = {
      payNow: payNow,
      remDebt: rem,
      date: new Date(),
      id: Date.now(),
    }

    this.setState((state) => ({ 
      payHist: [...state.payHist, newItem],
      remDebt: rem,
      totalDebt: rem,
      payNow: 0,
      date: '',
      id: '',
    }));

    this.handleMinPay();
  }

  render() {


    return (
      <div>
        <h2>Debt Calculator</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="totalDebt">Total Debt</label>
          <br />
          <input 
            onChange={this.handleDebt}
            type="number"
            autoComplete='off'
            value={this.state.totalDebt}
          />
          <br />
          <label htmlFor="interest">Interest Rate</label>
          <br />
          <input 
            onChange={this.handleInt}
            type="number" 
            autoComplete='off'
            value={this.state.interest}
          />
          <br />
          <br />
          <div>
            <label htmlFor="remDebt">Debt Remaining:</label>
            <br />
            <input 
              type="number"
              value={this.state.totalDebt}
              readOnly={true}
            />
            <h4>Min Payment: ${this.state.minPay}</h4>
          </div>
          <label htmlFor="payNow">Enter Payment Amount</label>
          <br />
          <input onChange={this.handlePayNow} type="number" value={this.state.payNow}/>
          <br />
          <button>Submit Payment</button>
        </form>
        {/* <PayNow debtInfo={this.state.debtInfo}/> */}
        <DebtHist items={this.state.payHist} />
      </div>
    )
  }
}

export default DebtCalcApp;