import React, { useEffect, useState } from "react";
import "./style.css"
const Loadmore = () => {
  const [loading, setloading] = useState(false);
  const [count, setcount] = useState(0);
  const [products, setproducts] = useState([]);
  const [disablebtn,setdisablebtn]=useState(false);
  const fetchProducts = async () => {
    try {
      setloading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        } `
      );

      const result = await response.json();
      console.log(result);

      if (result && result.products && result.products.length) {
        setproducts((prev)=>[...prev,...result.products]);
        setloading(false);
      }
    } catch (e) {
      console.log(e);
      setloading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [count]);
  useEffect(()=>{
 if(products && products.length===100) setdisablebtn(true);
  },[products])
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="container">
        <div className="products-container">
          {products && products.length
            ? products.map((item) => {
                return (
                  <>
                    <div className="product" key={item.id}>
                      <img src={item.thumbnail} alt={item.title} />
                      <p>{item.title}</p>
                    </div>
                  </>
                );
              })
            : null}
        </div>
        <div className="button-container">
            <button disabled={disablebtn} onClick={()=>setcount(count+1)}>Load more button</button>
            {
                disablebtn?<p className="reach">You have reached your limit</p>:null
            }
        </div>
      </div>
      ;
    </>
  );
};

export default Loadmore;
