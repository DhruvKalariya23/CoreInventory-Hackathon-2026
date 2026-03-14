function Dashboard() {
    return (
      <div style={{padding:"40px"}}>
        <h1>Inventory Dashboard</h1>
        <p>Welcome to CoreInventory Management System</p>
  
        <div style={{display:"flex", gap:"20px", marginTop:"30px"}}>
  
          <div style={{padding:"20px", border:"1px solid #ddd"}}>
            <h3>Total Products</h3>
            <p>120</p>
          </div>
  
          <div style={{padding:"20px", border:"1px solid #ddd"}}>
            <h3>Low Stock</h3>
            <p>8</p>
          </div>
  
          <div style={{padding:"20px", border:"1px solid #ddd"}}>
            <h3>Suppliers</h3>
            <p>15</p>
          </div>
  
        </div>
      </div>
    )
  }
  
  export default Dashboard