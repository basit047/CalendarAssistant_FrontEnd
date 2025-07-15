import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [pageCount, setPageCount] = useState(5);
  const apiUrl = `https://fakestoreapi.com/products?limit=${pageCount}`;
  const searchEventHandler = (val: string) => {
    setSearchText(val);
  };

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((response) => setProducts(response))
      .catch((error) => console.log(`Error fetching data: ${error}`));
  }, [pageCount]);

  function onCountChange(value: any) {
    setPageCount(value);
  }

  return (
    <div className="container">
      {products.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div className="row">
            <div className="col">
              <Link to={`/AddProduct`} className="link-primary">
                Add New Product
              </Link>
            </div>
            <div className="col">
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                className="form-control"
                onChange={(e) => {
                  searchEventHandler(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <select
                className="form-select form-select-sm"
                onChange={(e) => onCountChange(e.target.value)}
              >
                <option value="5" defaultValue={5}>
                  5
                </option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
              </select>
            </div>
          </div>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((x) => x.title.includes(searchText))
                .map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>
                      <Link
                        to={`/ProductDetail/${product.id}`}
                        className="link-primary"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ProductList;
