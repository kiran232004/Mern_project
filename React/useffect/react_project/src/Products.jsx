import axios from 'axios';
import  { useEffect, useState } from 'react'

const Products =()=>{
    
      const [products,setproducts]=useState([]);

      useEffect(()=>{
        axios.get('https://fakestoreapi.com/products')
        .then((response)=>{
            console.log(response.data);
            setproducts(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    },[])

    return(
        <div className='products'>
            {products.map((product)=>(
                    <div key={product.id} className='product'>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <p>Price: ${product.price}</p>
                        <img src={products.image} alt={product.title} style={{width:'100px'}}/>
                    </div>
            ))}
        
        </div>
      )
    }
        

export default Products;