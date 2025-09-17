import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';

function RoomType() {
  const { type } = useParams(); // 🟢 Get type from URL
  const location = useLocation();
  const { products } = location.state || { products: [] };

  return (
    <div className="promotion">
      <h1>{type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Room'} Type</h1>
      <p>Explore all {type} accommodations available</p>

      <div className="pro-box">
        <div className="pro-products">
          {products.length > 0 ? (
            products.map((p: { id: React.Key | null | undefined; image: string | Blob | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; location: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; country: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; price: { toLocaleString: () => string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; review: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => (
              <Link
                to="/product-detail"
                state={{ product: p }}
                key={p.id}
                className="pro-product-card"
              >
                <img src={p.image} alt={typeof p.name === 'string' ? p.name : undefined} />
                <h3>{p.name}</h3>
                <p>{p.location}, {p.country}</p>
                <p>{p.price.toLocaleString()} Kip</p>
                <small>{p.review} reviews</small>
              </Link>
            ))
          ) : (
            <p>No products found for this type.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomType;
