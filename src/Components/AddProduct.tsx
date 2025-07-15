import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../Header";
import Input from "./Input";
import { FileUpload } from "./FileUpload";

function AddProduct() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((response) => setCategories(response))
      .catch((error) => `Failed to load data: ${error}`);
  }, []);

  const formHandler = (event: any) => {
    event.preventDefault();
    const title = event.target.title.value;
    const price = event.target.price.value;
    const description = event.target.description.value;
    const category = event.target.category.value;
    const image = event.target.image.value;
    console.log(title);
    console.log(price);
    console.log(description);
    console.log(category);
    console.log(image);

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        price: price,
        description: description,
        category: category,
        image: image,
      }),
    }).then((response) => {
      if (response.ok) {
        alert("Success");
      } else {
        console.log("Error saving data");
      }
    });
  };

  return (
    <div>
      <Link to={`/`} className="link-primary">
        Back to Product Listing
      </Link>
      <Header />
      <form onSubmit={(e) => formHandler(e)}>
        <FileUpload />
        <Input type="text" label="Title" name="title" />
        <Input type="number" label="Price" name="price" step=".01" />
        <Input type="text" label="Description" name="description" />
        <Input type="file" label="Image" name="image" />
        <div className="mb-3 row">
          <label className="col-sm-4 col-form-label">Category</label>
          <div className="col-sm-8">
            <select
              className="form-control"
              name="category"
              disabled={categories ? false : true}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            {true && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
