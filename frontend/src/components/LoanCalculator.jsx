import React from "react";
import "../styles/calculator.css";

export default function LoanCalculator() {
  const loanAmount = React.useRef(0);
  const interestRate = React.useRef(0);
  const loanTenure = React.useRef(0);

  const [loanEMI, setLoanEMI] = React.useState(0);
  const [totalInterestPayable, setTotalInterestPayable] = React.useState(0);
  const [totalAmount, setTotalAmount] = React.useState(0);

  const calculateBtnHandler = () => {
    const interest = interestRate.current / 12 / 100;

    // calculate EMI
    const newLoanEMI =
      loanAmount.current *
      interest *
      (Math.pow(1 + interest, loanTenure.current) /
        (Math.pow(1 + interest, loanTenure.current) - 1));

    const newTotalAmount = Math.round(loanTenure.current * newLoanEMI);
    const newTotalInterestPayable = Math.round(
      newTotalAmount - loanAmount.current,
    );

    // a note to my future self : mf only render states after all the
    // calculations are done, it will save you 2 hours of debugging time,
    // useState calls are asynchronous so you can not trust then in
    // between sequential calculations.
    setLoanEMI(Math.round(newLoanEMI));
    setTotalAmount(newTotalAmount);
    setTotalInterestPayable(newTotalInterestPayable);
  };

  return (
    <div className="loan-calculator-form">
      <div className="loan-calculator-top">
        <h2>Loan Calculator</h2>

        <form action="#">
          <div>
            <div className="loan-calculator-labels">Amount</div>
            <input
              type="number"
              onChange={(e) => (loanAmount.current = e.target.value)}
            />
          </div>

          <div>
            <div className="loan-calculator-labels">Interest Rate</div>
            <input
              type="number"
              onChange={(e) => (interestRate.current = e.target.value)}
            />
          </div>

          <div>
            <div className="loan-calculator-labels">Tenure (in months)</div>
            <input
              type="number"
              onChange={(e) => (loanTenure.current = e.target.value)}
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
