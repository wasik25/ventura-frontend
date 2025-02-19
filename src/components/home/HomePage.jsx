import Header from "./Header";
import CardContainer from "./CardContainer";
import api from "../../api";
import { useEffect, useState } from "react";
import PlaceHolderContainer from "../ui/PlaceHolderContainer";
import Error from "../ui/Error";
import { randomValue } from "../../GenerateCartCode";
import "./HomePage.css"; 

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ size: "", color: "" });
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (localStorage.getItem("cart_code") === null) {
      localStorage.setItem("cart_code", randomValue);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    api
      .get("products", { params: { ...filters, sort_by: sortBy } })
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [filters, sortBy]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const resetFilters = () => {
    setFilters({ size: "", color: "" });
    setSortBy("");
  };

  return (
    <>
      <Header />
      <div className="content-container">
        <div className="filters-container">
          <div className="filter-card">
            <h4>Sort</h4>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="price"
                  checked={sortBy === "price"}
                  onChange={handleSortChange}
                />
                Price
              </label>
              <label>
                <input
                  type="radio"
                  name="sort"
                  value="popularity"
                  checked={sortBy === "popularity"}
                  onChange={handleSortChange}
                />
                Popularity
              </label>
            </div>
            <button className="reset-button" onClick={() => setSortBy("")}>
              Reset Sort
            </button>
          </div>

          <div className="filter-card">
            <h4>Filter</h4>
            <div className="dropdown-group">
              <label>
                Size:
                <select
                  name="size"
                  onChange={handleFilterChange}
                  value={filters.size}
                >
                  <option value="">All</option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                  <option value="XL">Extra Large</option>
                </select>
              </label>
              <label>
                Color:
                <select
                  name="color"
                  onChange={handleFilterChange}
                  value={filters.color}
                >
                  <option value="">All</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="White">White</option>
                </select>
              </label>
            </div>
            <button className="reset-button" onClick={resetFilters}>
              Reset Filter
            </button>
          </div>
        </div>

        <div className="products-container">
          {error && <Error error={error} />}
          {loading && <PlaceHolderContainer />}
          {!loading && error === "" && <CardContainer products={products} />}
        </div>
      </div>
    </>
  );
};

export default HomePage;
