import React from 'react';
import DebtHist from './DebtHist';

class DebtCalcApp extends React.Component {
  constructor() {
    super();
    this.state = {
      totalDebt: 0,
      interest: 0,
      minPay: 0,
      numPayments: 0,
      debtInfo: [],
      payNow: 0,
      remDebt: 0,
      date: '',
      id: '',
      payHist: [],
      read: false,
    }
  }

  handleDebt = ({target: { value }}) => this.setState({totalDebt: value});
  handleInt = ({target: { value }}) => this.setState({interest: value}, this.handleMinPay(value));
  handlePayNow = ({target: {value}}) => this.setState({ payNow: value});

  handleMinPay = (value) => {

    const {totalDebt} = this.state;

    if (totalDebt > 100) {
      const rate = value /100;

      const int = (rate * totalDebt)/12;

      const min = ((totalDebt * 0.01) + int).toFixed(2);

      const num = (totalDebt /min).toFixed(0);
    
      const newInfo = {
        intNow: int.toFixed(2),
        totalDebt: totalDebt,
      }

      this.setState({minPay: min, debtInfo: newInfo, numPayments: num});

    } else if (totalDebt <= 100) {
      const min = ((totalDebt * 0.01) + totalDebt).toFixed(2);

      const num = (totalDebt /min).toFixed(0);

      const newInfo = {
        intNow: 0,
        totalDebt: totalDebt,
      }

      this.setState({minPay: min, debtInfo: newInfo, numPayments: num});
    }

    
    // this.setState({numPayments: num.toFixed(0)});
    
  };

  handleSubmit = (e) => {
    const {debtInfo, payNow, minPay, interest} = this.state;
    e.preventDefault();

    if (payNow >= minPay) {

      const principle = (payNow - debtInfo.intNow);

      const rem = (debtInfo.totalDebt - principle).toFixed(2);
      
      const timeStamp = () => {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        var hrs = today.getHours();
        var mins = today.getMinutes();
        var sec = today.getSeconds();
        
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        if(hrs<10) hrs='0'+hrs;
        if(mins<10) mins='0'+mins;
        if(sec<10) sec='0'+sec;
        return (mm+'-'+dd+'-'+yyyy+' :: '+hrs+':'+mins+':'+sec);
        };

      const newItem = {
        payNow: payNow,
        remDebt: rem,
        date: timeStamp(),
        id: Date.now(),
      }

      this.setState((state) => ({ 
        payHist: [...state.payHist, newItem],
        remDebt: rem,
        totalDebt: rem,
        payNow: 0,
        date: '',
        id: '',
        read: true,
      }));
      
    } else if (payNow < minPay) {
      this.setState({payNow: 0})
      alert(`Payment must be greater than or equal to the Minimum Payment! ($${minPay})`);
    }
    this.handleMinPay(interest);
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
            readOnly={this.state.read}
          />
          <br />
          <label htmlFor="interest">Interest Rate</label>
          <br />
          <input 
            onChange={this.handleInt}
            type="number" 
            autoComplete='off'
            value={this.state.interest}
            readOnly={this.state.read}
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
            <h5>Estimated Minimum Payments: {this.state.numPayments}</h5>
            <h4>Min Payment: ${this.state.minPay}</h4>
          </div>
          <label htmlFor="payNow">Enter Payment Amount</label>
          <br />
          <input onChange={this.handlePayNow} type="number" value={this.state.payNow}/>
          <br />
          <button>Submit Payment</button>
        </form>
        <DebtHist items={this.state.payHist} />
      </div>
    )
  }
}

export default DebtCalcApp;