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
    fetch(`http://52.26.193.201:3000/products/list`)
      .then((response) => response.json())
      .then((productList) => {
        console.log(productList)
        // let searchHistoryFilter = searchHistory.filter(
        //   (item) => item.name !== pokeData.name
        // );
        setList(productList)
        // setSearchHistory([pokeData, ...searchHistoryFilter]);
      })
      .catch((err) => {
        // setError("No Products Found");
      });

    // let searchBar = document.querySelector("#search-bar");
    // searchBar.value = "";
    e.preventDefault();
  }

  useEffect(() => {
		handleSearchClick();
	}, []);

  // function handleModel(id) {
  //   let url = `http://52.26.193.201:3000/products/${id}/styles/`
  //   fetch(url)
  //   .then((response) => response.json())
  //   .then((results) => {
  //     console.log(results.photos[0].thumbnail_url)

  //   })
  //   .catch((err) => {
  //     // setError("No Products Found");
  //   });
  // }

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
