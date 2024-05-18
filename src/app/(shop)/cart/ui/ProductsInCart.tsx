"use client";

import { useCartStore } from "@/store/ui/cart/cart-store";
import React, { useEffect, useState } from "react";

import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import { FaTrashRestore } from "react-icons/fa";
import Link from "next/link";
import ProductImage from "@/components/product/product-image/productImage";

const ProductsInCart = () => {

    const removeProduct = useCartStore(
        (state) => state.removeProduct
      );
    
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  },[]);

  const productsInCart = useCartStore((state) => state.cart);
  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}`}
          className="flex max-h-32 my-4 bg-white rounded-xl shadow-xl "
        >
          
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            style={{
              width:"auto",
              height:"full",
              objectFit:'cover'
              
   
            }}
            alt={product.title}
            className="mr-5 rounded"
            priority={true}   
          />
          <div className="w-full">
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              <p className="font-bold">{product.title}</p>
            </Link>

            <p className="">Tamaño: {product.size}</p>
            <p>${product.size === 'L' ? product.price * 1.25:product.size === 'S'?  product.price * 0.80 : product.price}</p>

            <div className="flex justify-between p-4">
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChange={value => updateProductQuantity(product,value)}
              ></QuantitySelector>
              <button className="pr-2">
                <FaTrashRestore size={30} onClick={()=>removeProduct(product)}></FaTrashRestore>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsInCart;
