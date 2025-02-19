import styles from "./UserInfo.module.css";
import pic from "../../assets/profile_pic.jpg";

const UserInfo = ({ userInfo }) => {
  return (
    <div className="row mb-4">
      <div className={`col-md-3 py-3 card ${styles.textCenter}`}>
        <img
          src={pic}
          alt="User Profile"
          className={`img-fluid rounded-circle mb-3 mx-auto ${styles.profileImage}`}
        />
        <h4>{`${userInfo.first_name} ${userInfo.last_name}`}</h4>
        <p className="text-muted">{userInfo.email}</p>
        <button
          className="btn  mt-2"
          style={{
            background: "linear-gradient(135deg, #A5CAD2, #E89B9D, #D66B6D)",
            color: "white",
          }}
        >
          Edit Profile
        </button>
      </div>
      <div className="col-md-9">
        <div className="card">
          <div
            className="card-header"
            style={{
              background: "linear-gradient(135deg, #A5CAD2, #E89B9D, #D66B6D)",
              color: "white",
            }}
          >
            <h5>Account Overview</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Full Name:</strong>{" "}
                  {`${userInfo.first_name} ${userInfo.last_name}`}
                </p>
                <p>
                  <strong>Email:</strong> {userInfo.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userInfo.phone}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Username:</strong> {userInfo.username}
                </p>
                <p>
                  <strong>City:</strong> {userInfo.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
