import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../css/product.css";

function Product() {

  const [products, setProducts] = useState([]);
  const [showNewRow, setShowNewRow] = useState(false);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    unit: "",
    stock: "",
  });


  // LOAD PRODUCTS
  const loadProducts = async () => {

    const res = await fetch(
      "http://localhost:5000/products"
    );

    const data = await res.json();

    setProducts(data);
  };


  useEffect(() => {
    loadProducts();
  }, []);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // ADD PRODUCT
  const addProduct = async () => {

    await fetch(
      "http://localhost:5000/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    setShowNewRow(false);

    setForm({
      name: "",
      sku: "",
      category: "",
      unit: "",
      stock: "",
    });

    loadProducts();
  };


  // DELETE PRODUCT
  const deleteProduct = async (id) => {

    await fetch(
      `http://localhost:5000/products/${id}`,
      {
        method: "DELETE",
      }
    );

    loadProducts();
  };


  return (
    <div>

      <Navbar />

      <div className="product-page">

        <div className="product-header">

          <button
            className="new-btn"
            onClick={() => setShowNewRow(true)}
          >
            New
          </button>

          <h3>Products</h3>

        </div>


        <table className="product-table">

          <thead>
            <tr>
              <th>Product Name</th>
              <th>Internal Reference</th>
              <th>Category</th>
              <th>Unit Price</th>
              <th>On Hand</th>
              <th>Action</th>
            </tr>
          </thead>


          <tbody>


            {/* NEW ROW */}

            {showNewRow && (

              <tr>

                <td>
                  <input name="name" onChange={handleChange} />
                </td>

                <td>
                  <input name="sku" onChange={handleChange} />
                </td>

                <td>
                  <input name="category" onChange={handleChange} />
                </td>

                <td>
                  <input name="unit" onChange={handleChange} />
                </td>

                <td>
                  <input name="stock" onChange={handleChange} />
                </td>

                <td>
                  <button onClick={addProduct}>
                    Save
                  </button>
                </td>

              </tr>

            )}


            {/* DATA */}

            {products.map((p) => (

              <tr key={p.id}>

                <td>{p.name}</td>
                <td>{p.sku}</td>
                <td>{p.category}</td>
                <td>{p.unit}</td>
                <td>{p.stock}</td>

                <td>

                  <button
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Product;