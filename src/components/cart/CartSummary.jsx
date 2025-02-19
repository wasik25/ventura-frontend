import { Link } from "react-router-dom";

const CartSummary = ({ cartTotal }) => {
  const subTotal = cartTotal.toFixed(2);
  const total = cartTotal.toFixed(2);

  return (
    <div className="col-md-4 align-self-start">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Cart Summary</h5>
          <hr />
          <div className="d-flex justify-content-between mb-3">
            <span>Total:</span>
            <strong>{`$${total}`}</strong>
          </div>
          <Link to="/checkout">
            <button
              className="btn btn-primary w-100"
              style={{
                background:
                  "linear-gradient(135deg, #A5CAD2, #E89B9D, #D66B6D)",
                border: "5px solid transparent", // Needed to make border visible
                borderImage:
                  "linear-gradient(135deg, #A5CAD2, #E89B9D, #D66B6D) 1",
              }}
            >
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
