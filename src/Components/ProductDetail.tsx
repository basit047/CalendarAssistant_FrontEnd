import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

function ProductDetail() {
  const { id } = useParams();
  const apiUrl = `https://fakestoreapi.com/products/${id}`;
  const [productDetail, setProductDetial] = useState<Product>();

  useEffect(() => {
    if (id) {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((response) => setProductDetial(response))
        .catch((error) => `Failed to fetch data: ${error}`);
    }
  }, []);

  return (
    <div>
      <Link to={`/`} className="link-primary" style={{ textAlign: "left" }}>
        Back
      </Link>
      <br />
      <Header />
      {!productDetail ? (
        <p>No Product Exists</p>
      ) : (
        <div>
          <label className="form-control">
            <b>ProductId:</b> {productDetail?.id}
          </label>
          <br />
          <label className="form-control">
            <b>Title:</b> {productDetail?.title}
          </label>
          <br />
          <label className="form-control">
            <b>Price:</b> {productDetail?.price}
          </label>
          <br />
          <label className="form-control">
            <b>Description:</b> {productDetail?.description}
          </label>
          <br />
          <label className="form-control">
            <b>Category:</b> {productDetail?.category}
          </label>
          <br />
          <label className="form-control">
            <img src={productDetail?.image} className="img-fluid" />
          </label>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
