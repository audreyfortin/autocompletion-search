import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
}

interface UseFetchProductsReturn {
  data: Product[] | null;
  error: string | undefined;
  loading: boolean;
}

const useFetchProducts = (query: string): UseFetchProductsReturn => {
  const [data, setData] = useState<Product[] | null>(null);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query.trim()) {
      setData(null);
      setError(undefined);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=10`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products. Status: ${response.status}`);
        }
        
        const { products } = await response.json();
        setData(products);
      } catch (err: any) {
        setData(null);
        setError(err.message || "Failed to fetch products.");
      } finally {
        setLoading(false); // Ensure loading state is cleared
      }
    };

    fetchData();
  }, [query]);

  return { data, error, loading };
};

export default useFetchProducts;