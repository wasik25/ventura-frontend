import { useParams } from "react-router-dom";
import ProductPagePlaceHolder from "./ProductPagePlaceHolder";
import RelatedProducts from "./RelatedProducts";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../api";
import api from "../../api";
import { toast } from "react-toastify";

const ProductPage = ({ setNumberCartItems }) => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ body: "", rating: "" });
  const [loading, setLoading] = useState(false);
  const [inCart, setInCart] = useState(false);
  const cart_code = localStorage.getItem("cart_code");

  const fetchReviews = () => {
    api
      .get(`product_detail/${slug}/reviews`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  };

  const addReview = () => {
    console.log("Submitting review:", newReview);
    api
      .post(`product_detail/${slug}/add_review/`, newReview)
      .then(() => {
        console.log("Review submitted successfully");
        fetchReviews();
        setNewReview({ body: "", rating: "" });
      })
      .catch((err) => {
        console.log(
          "Error submitting review:",
          err.response?.data || err.message
        );
      });
  };

  useEffect(() => {
    if (product.id && cart_code) {
      api
        .get(`product_in_cart?cart_code=${cart_code}&product_id=${product.id}`)
        .then((res) => {
          setInCart(res.data.product_in_cart);
        })
        .catch((err) => console.log(err.message));
    }
  }, [cart_code, product.id]);

  const newItem = { cart_code: cart_code, product_id: product.id };

  const add_item = () => {
    api
      .post("add_item/", newItem)
      .then((res) => {
        setInCart(true);
        toast.success("Product added to cart");
        setNumberCartItems((curr) => curr + 1); 
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    setLoading(true);
    api
      .get(`product_detail/${slug}`)
      .then((res) => {
        setProduct(res.data);
        setSimilarProducts(res.data.similar_products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
    fetchReviews();
  }, [slug]);

  if (loading) {
    return <ProductPagePlaceHolder />;
  }

  return (
    <div>
      <section className="py-3">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={`${BASE_URL}${product.image}`}
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <h1 className="display-5 fw-bolder">{product.name}</h1>
              <div className="fs-5 mb-5">
                <span>{`$${product.price}`}</span>
                <span>{` | Average Rating: ${
                  product.average_rating || 0
                }`}</span>
              </div>
              <p className="lead">{product.description}</p>
              <div className="d-flex">
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                  onClick={add_item}
                  disabled={inCart}
                >
                  {inCart ? "Product added to cart" : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews container px-4 px-lg-5 my-5">
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className="mb-3">
            <p>
              <strong>{review.reviewer_name}:</strong> {review.body}
            </p>
            <p>Rating: {"⭐".repeat(review.rating)}</p>
          </div>
        ))}
        <form onSubmit={addReview} className="mt-4">
          <textarea
            placeholder="Write your review..."
            value={newReview.body}
            onChange={(e) =>
              setNewReview({ ...newReview, body: e.target.value })
            }
            className="form-control mb-3"
          />
          <select
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: e.target.value })
            }
            className="form-select mb-3"
          >
            <option value="">Select Rating</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
          <button type="button" onClick={addReview}>
            Submit Review
          </button>
        </form>
      </section>

      <RelatedProducts products={similarProducts} />
    </div>
  );
};

export default ProductPage;
