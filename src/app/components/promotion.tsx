"use client";
import React from 'react';
import { Link, useLocation } from 'react-router-dom';


function Promotion() {
  const location = useLocation();
  const { products } = location.state || { products: [] };

  return (
    <div className="promotion">
      <h1>Special Promotions</h1>
      <p>Find the best deals and offers for your next trip</p>

      <div className="pro-box">
        <div className="pro-products">
          {products.map((p: { id: React.Key | null | undefined; image: string | Blob | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; location: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; country: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; price: { toLocaleString: () => string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; review: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
            <Link
              to="/product-detail"
              state={{ product: p }}
              key={p.id}
              className="pro-product-card"
            >
              <img src={p.image} alt={typeof p.name === 'string' ? p.name : String(p.name ?? '')} />
              <h3>{p.name}</h3>
              <p>{p.location}, {p.country}</p>
              <p>{p.price.toLocaleString()} Kip</p>
              <small>{p.review} reviews</small>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Promotion;
