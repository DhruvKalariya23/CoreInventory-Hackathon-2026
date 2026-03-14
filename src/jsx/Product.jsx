    // import { useState, useEffect } from "react";
    // import axios from "axios";

    // export default function Product() {
    //   const [products, setProducts] = useState([]);
    //   const [form, setForm] = useState({
    //     name: "",
    //     sku: "",
    //     category: "",
    //     unit: "",
    //     stock: 0,
    //   });

    //   const loadProducts = async () => {
    //     const res = await axios.get("http://localhost:5000/products");
    //     setProducts(res.data);
    //   };

    //   useEffect(() => {
    //     loadProducts();
    //   }, []);

    //   const handleChange = (e) => {
    //     setForm({ ...form, [e.target.name]: e.target.value });
    //   };

    //   const addProduct = async () => {
    //     await axios.post("http://localhost:5000/products", form);
    //     loadProducts();
    //   };

    //   const deleteProduct = async (id) => {
    //     await axios.delete(`http://localhost:5000/products/${id}`);
    //     loadProducts();
    //   };

    //   return (
    //     <div>

    //       <h2>Product</h2>

    //       <input name="name" placeholder="name" onChange={handleChange} />
    //       <input name="sku" placeholder="sku" onChange={handleChange} />
    //       <input name="category" placeholder="category" onChange={handleChange} />
    //       <input name="unit" placeholder="unit" onChange={handleChange} />
    //       <input name="stock" placeholder="stock" onChange={handleChange} />

    //       <button onClick={addProduct}>Add</button>

    //       <ul>
    //         {products.map((p) => (
    //           <li key={p.id}>
    //             {p.name} - {p.stock}
    //             <button onClick={() => deleteProduct(p.id)}>
    //               delete
    //             </button>
    //           </li>
    //         ))}
    //       </ul>

    //     </div>
    //   );
    // }