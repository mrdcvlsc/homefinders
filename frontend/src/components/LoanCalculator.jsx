import '../styles/calculator.css';

export default function LoanCalculator() {
    return (
        <div className="loan-calculator-form">
            <div className="loan-calculator-top">
                <h2>Loan Calculator</h2>

                <form action="#">
                    <div>
                        <div className="loan-calculator-labels">Amount</div>
                        <input type="text" value="0"/>
                    </div>

                    <div>
                        <div className="loan-calculator-labels">Interest Rate</div>
                        <input type="text" value="0"/>
                    </div>

                    <div>
                        <div className="loan-calculator-labels">Tenure (in months)</div>
                        <input type="text" value="0"/>
                    </div>
                </form>
            </div>


            <div className="loan-calculator-result">
                <div className="loan-calcu-result-left">  
                    <div>
                        <h3>Loan EMI</h3>
                        <div className="loan-calcu-output-val">123</div>
                    </div>

                    <div>
                        <h3>Total Interest Payable</h3>
                        <div className="loan-calcu-output-val">123</div>
                    </div>

                    <div>
                        <h3>Total Amount</h3>
                        <div className="loan-calcu-output-val">123</div>
                    </div>

                    <button className="loan-calculate-btn">Calculate</button>
                </div>

                {/* <div className="right">
                    <canvas id="myChart" width="400" height="400"></canvas>
                </div> */}
            </div>
        </div>
    )
}