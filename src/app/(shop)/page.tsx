"use client";

import { useState, useEffect } from "react";
import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";
import BanerSlideShowHome from "@/components/product/slideshow/BanerSlideshow";

import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  tags: string[];
  rootcategory: string;
  categoryId: string;
  images: string[];
}

interface Props {
  searchParams: {
    page?: string;
  };
}

export default function Home({ searchParams }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    "6ceaabb8-fac7-4c89-8509-84ba0ca89db1"
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const page = parseInt(searchParams.page || "1");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getPaginatedProductsWithImages({
        page,
        categoryId: selectedCategoryId,
      });
      setProducts(data.products);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    };

    fetchProducts();
  }, [page, selectedCategoryId]); // Recargar cuando cambia la página o la categoría seleccionada

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <>
      <div className="r">
        <div className="overflow-hidden">
          <BanerSlideShowHome />
        </div>

        <div className="flex gap-3 flex-wrap p-4">
         
          <button
            className="btn-categories"
            onClick={() =>
              handleCategoryChange("6ceaabb8-fac7-4c89-8509-84ba0ca89db1")
            }
          >
            Cervezas
          </button>
          <button
            className="btn-categories"
            onClick={() =>
              handleCategoryChange("219e326f-8697-4077-8214-cd51507b0ed8")
            }
          >
            Sugerencias
          </button>
          
          <button
            className="btn-categories"
            onClick={() =>
              handleCategoryChange("8479e8fd-3794-482e-b4f6-5b98878488a9")
            }
          >
            Tapeos
          </button>
          <button
            className="btn-categories"
            onClick={() =>
              handleCategoryChange("f991b5d8-733c-4464-94d1-7e5a059110b9")
            }
          >
            Picadas
          </button>
          <button
            className="btn-categories"
            onClick={() =>
              handleCategoryChange("0f4b92d2-5044-4c88-ba1e-555573b91f65")
            }
          >
            Hamburguesas
          </button>
          <button
            className="btn-categories"
            onClick={() =>
              handleCategoryChange("8c49be14-eec4-444c-acfc-c136f895020e")
            }
          >
            Pizzas
          </button>
          <button
            className="btn-categories"
            onClick={() =>
              handleCategoryChange("4b5fde9b-c686-41db-b37b-4d74eba54758")
            }
          >
            Ensaladas
          </button>
          <button
            className="btn-categories"
            onClick={() =>
              handleCategoryChange("093b7920-8660-44b9-8061-be14c6066350")
            }
          >
            Coctelería
          </button>
          <button
            className="btn-categories"
            onClick={() =>
              handleCategoryChange("19cfd561-9e07-4d60-96bb-b2925ffb33e8")
            }
          >
            Vinos
          </button>
          <button
            className="btn-categories"
            onClick={() =>
              handleCategoryChange("5ca4aa14-5c48-4967-880a-561c7c0b788f")
            }
          >
            Bebidas
          </button>
          
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-10 gap-3 mx-3 mb-10">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.slug}`}>
            <div className="rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
              <div className="image-container">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-4 bg-gray-950 rounded-b-lg flex flex-col">
                <span className="text-lg h-14 font-semibold text-gray-100 hover:underline">
                  {product.title}
                </span>
                <span className="text-lg font-bold text-gray-300">
                  $ {product.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
