import OrderHistoryItem from "./OrderHistoryItem";

const OrderHistoryItemContainer = ({ orderitems }) => {
  return (
    <div className="row" style={{ height: "300px", overflow: "auto" }}>
      <div className="col-md-12">
        <div className="card">
          <div
            className="card-header"
            style={{
              background: "linear-gradient(135deg, #A5CAD2, #E89B9D, #D66B6D)",
              color: "white",
            }}
          >
            <h5>Order History</h5>
          </div>

          {orderitems.map((item) => (
            <OrderHistoryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItemContainer;
