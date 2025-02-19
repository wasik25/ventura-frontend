import { useState } from "react";
import styles from "./PaymentSection.module.css";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { FaCcPaypal } from "react-icons/fa";
import api from "../../api";

const PaymentSection = () => {
  const cart_code = localStorage.getItem("cart_code");
  const [loading, setLoading] = useState(false);

 
  function paypalPayment() {
    setLoading(true);
    api
      .post("initiate-payment/", { cart_code })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data.payment_url) {
          window.location.href = res.data.payment_url;
        }
      })
      .catch((err) => {
        console.error("Error initiating payment:", err.message);
        setLoading(false);
      });
  }

  return (
    <div className="col-md-4">
      <div className={`card ${styles.card}`}>
        <div
          className="card-header"
          style={{
            background: "linear-gradient(135deg, #A5CAD2, #E89B9D, #D66B6D)",
            color: "white",
          }}
        >
          <h5>Payment Options</h5>
        </div>
        <div className="card-body">
          {/* PayPal Button */}
          <button
            className={`btn btn-primary w-100 mb-3 ${styles.paypalButton}`}
            onClick={paypalPayment}
            id="paypal-button"
          >
            Pay with SSLCommerz
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
