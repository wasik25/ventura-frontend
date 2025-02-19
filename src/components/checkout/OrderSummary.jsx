import OrderItem from "./OrderItem";
import styles from "./OrderSummary.module.css";

const OrderSummary = ({ cartitems, cartTotal }) => {
  const total = cartTotal.toFixed(2);

  return (
    <div className="col-md-8">
      <div className={`card mb-4 ${styles.card}`}>
        <div
          className="card-header"
          style={{
            background: "linear-gradient(135deg, #A5CAD2, #E89B9D, #D66B6D)",
            color: "white",
          }}
        >
          <h5>Cart Summary</h5>
        </div>
        <div className="card-body">
          <div className="px-3" style={{ height: "300px", overflow: "auto" }}>
            {cartitems.map((cartitem) => (
              <OrderItem key={cartitem.id} cartitem={cartitem} />
            ))}
          </div>

          <hr />
          <div className="d-flex justify-content-between">
            <h6>Total</h6>
            <h6>{`$${total}`}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
