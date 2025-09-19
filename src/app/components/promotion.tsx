"use client";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Promotion() {
  const location = useLocation();
  const { products } = location.state || { products: [] };

  return (
    <div className="promotion">
      <h1>Special Promotions</h1>
      <p>Find the best deals and offers for your next trip</p>

      <div className="pro-box">
        <div className="pro-products">
          {products.map(
            (p: {
              id: React.Key | null | undefined;
              image: string;
              name: string;
              city: string;
              country: string;
              price: number; // discounted price
              originalPrice?: number; // optional original price
              review: number;
            }) => {
              // calculate discount here
              let discountPercent = 0;
              if (p.originalPrice && p.originalPrice > p.price) {
                discountPercent = Math.round(
                  ((p.originalPrice - p.price) / p.originalPrice) * 100
                );
              }

              return (
                <Link
                  to="/product-detail"
                  state={{ product: p }}
                  key={p.id}
                  className="pro-product-card"
                >
                  <img src={p.image} alt={p.name} />
                  <h3>{p.name}</h3>
                  <p>
                    {p.city}, {p.country}
                  </p>

                  {discountPercent > 0 ? (
                    <div className="price-section">
                      <p className="discounted-price">
                        {p.price.toLocaleString()} Kip
                      </p>
                      <p className="original-price">
                        <s>{p.originalPrice?.toLocaleString()} Kip</s>
                      </p>
                      <span className="discount-badge">
                        -{discountPercent}%
                      </span>
                    </div>
                  ) : (
                    <p>{p.price.toLocaleString()} Kip</p>
                  )}

                  <small>{p.review} reviews</small>
                </Link>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default Promotion;
