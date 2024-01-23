import React from "react";
import "../styles/calculator.css";

function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export default function LoanCalculator() {
  const loanAmount = React.useRef(0);
  const interestRate = React.useRef(0);
  const loanTenure = React.useRef(0);

  const [loanEMI, setLoanEMI] = React.useState(0);
  const [totalInterestPayable, setTotalInterestPayable] = React.useState(0);
  const [totalAmount, setTotalAmount] = React.useState(0);

  const calculateBtnHandler = () => {
    console.log('calculate button')

    const interest = interestRate.current / 12.0 / 100.0;
    console.log('interest = ', interest)

    console.log('loanAmount.current   = ', loanAmount.current)
    console.log('interestRate.current = ', interestRate.current)
    console.log('loanTenure.current   = ', loanTenure.current)

    // calculate EMI
    const newLoanEMI =
      loanAmount.current *
      interest *
      (Math.pow(1 + interest, loanTenure.current) /
        (Math.pow(1 + interest, loanTenure.current) - 1.0));

    const newTotalAmount = loanTenure.current * newLoanEMI;
    const newTotalInterestPayable = newTotalAmount - loanAmount.current;

    // a note to my future self : mf only render states after all the
    // calculations are done, it will save you 2 hours of debugging time,
    // useState calls are asynchronous so you can not trust then in
    // between sequential calculations.

    setLoanEMI(newLoanEMI.toFixed(2));
    setTotalAmount(newTotalAmount.toFixed(2));
    setTotalInterestPayable(newTotalInterestPayable.toFixed(2));
  };

  const handleAmountInput = (e) => {
    if (isNumeric(e.target.value)) {
      const num_input = Number(e.target.value)
      loanAmount.current = num_input

      if (num_input < 0) {
        e.target.value = Math.abs(num_input)
        loanAmount.current = Number(Math.abs(num_input))
      }

      if (num_input > 999_999_999_999) {
        e.target.value = 999_999_999_999
        loanAmount.current = Number(999_999_999_999)
      }
    } else {
      e.target.value = ''
    }

    console.log('onChange loanAmount.current = ', loanAmount.current)
  }

  const handleInterestInput = (e) => {
    if (isNumeric(e.target.value)) {
      const num_input = Number(e.target.value)
      interestRate.current = num_input

      if (num_input < 0) {
        e.target.value = Math.abs(num_input)
        interestRate.current = Number(Math.abs(num_input))
      }

      if (num_input > 100) {
        e.target.value = 100
        interestRate.current = Number(100)
      }
    } else {
      e.target.value = ''
    }

    console.log('onChange interestRate.current = ', interestRate.current)
  }

  const handleTenureInput = (e) => {
    if (isNumeric(e.target.value)) {
      const num_input = Number(e.target.value)
      loanTenure.current = num_input

      if (num_input < 0) {
        e.target.value = Math.abs(num_input)
        loanTenure.current = Number(Math.abs(num_input))
      }

      if (num_input > 1200) {
        e.target.value = 1200
        loanTenure.current = Number(1200)
      }
    } else {
      e.target.value = ''
    }

    console.log('onChange loanTenure.current = ', loanTenure.current)
  }

  return (
    <div className="loan-calculator-form">
      <div className="loan-calculator-top">
        <h2>Loan Calculator</h2>

        <form action="#">
          <div>
            <div className="loan-calculator-labels">Amount</div>
            <input
              defaultValue={'0'}
              required
              type="text"
              onChange={handleAmountInput}
            />
          </div>

          <div>
            <div className="loan-calculator-labels">Interest Rate</div>
            <input
              defaultValue={'0'}
              required
              type="text"
              onChange={handleInterestInput}
            />
          </div>

          <div>
            <div className="loan-calculator-labels">Tenure (in months)</div>
            <input
              defaultValue={'0'}
              required
              type="text"
              onChange={handleTenureInput}
            />
          </div>
        </form>
      </div>

      <div className="loan-calculator-result">
        <div className="loan-calcu-result-left">
          <div>
            <h3>Loan EMI</h3>
            <div className="loan-calcu-output-val">{loanEMI}</div>
          </div>

          <div>
            <h3>Total Interest Payable</h3>
            <div className="loan-calcu-output-val">{totalInterestPayable}</div>
          </div>

          <div>
            <h3>Total Amount</h3>
            <div className="loan-calcu-output-val">{totalAmount}</div>
          </div>

          <button
            type="submit"
            className="loan-calculate-btn"
            onClick={() => calculateBtnHandler()}
          >
            Calculate
          </button>
        </div>

        {/* <div className="right">
                    <canvas id="myChart" width="400" height="400"></canvas>
                </div> */}
      </div>
    </div>
  );
}
