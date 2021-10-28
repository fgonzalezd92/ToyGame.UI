import Menu from "./components/Menu";
import ProductsTable from "./components/ProductsTable";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Menu />
      <br />
      <div className="container">
        <ProductsTable></ProductsTable>
      </div>
    </div>
  );
}

export default App;
