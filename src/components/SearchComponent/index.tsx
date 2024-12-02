import React, { useState, useCallback } from "react";
import Autocompletion from "../shared/Autocompletion";
import useFetchProducts from "./useFetchProducts";
import './index.css';

function SearchComponent() {
  
  const [searchValue, setSearchValue] = useState<string>(""); // Debounced value
  const { data, error, loading } = useFetchProducts(searchValue); // Custom hook
 
  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []); 

  return (
    <div className="search-component">
      <h1>Search Component</h1>
        <Autocompletion 
         query={searchValue}
         onSearch={handleSearch}
         suggestions={data?.map((product) => product.title) || []}
         error={error}
         loading={loading} />
    </div>
  );
}

export default SearchComponent;
