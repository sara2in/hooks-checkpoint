import './App.css';
import { useState, useEffect } from "react";
import AppContext from "./contexts/AppContext";

import NavBar from './components/NavBar'
import ProductList from './components/ProductList'

function App() {

  let [searchTerm, setSearchterm] = useState('');
  let [list, setList] = useState([])

  async function handleSearchClick(e) {
    // setError(false);
    console.log('submit')
    fetch(`http://52.26.193.201:3000/products/list?page=1&count=100`)
      .then((response) => response.json())
      .then((productList) => {
        console.log(productList)
        setList(productList)
      })
      .catch((err) => {
        // setError("No Products Found");
      });
    e.preventDefault();
  }

  useEffect(() => {
		handleSearchClick();
	}, []);


  return (
    <AppContext.Provider
    value={{
      handleSearchClick,
      list
    }}
    >
      <div className="App">
        <NavBar />
        <ProductList />
      </div>
    </AppContext.Provider>
  );
}

export default App;
