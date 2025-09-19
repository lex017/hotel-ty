"use client";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Homepage() {
  const sampleProducts = [
    {
      id: 1,
      name: "Vang Vieng Home Town",
      city: "Vang Vieng",
      country: "Lao",
      price: 250000,
      originalPrice:500000,
      promotion: "pro",
      review: 314,
      rating: 4.2,
      type: "hotels",
      image: "https://plus.unsplash.com/premium_photo-1661962821338-c07da63995f9?w=600",
      freeCancel: true,
      isTopRated: true,
    },
    {
      id: 2,
      name: "Luang Prabang Riverside",
      city: "Luang Prabang",
      country: "Lao",
      price: 300000,
      originalPrice:500000,
      promotion: "pro",
      review: 420,
      rating: 4.7,
      type: "apartments",
      image: "https://plus.unsplash.com/premium_photo-1681338224373-9669c2497c05?w=600",
      freeCancel: true,
      isTopRated: true,
    },
    {
      id: 3,
      name: "Pakse Mekong View",
      city: "Pakse",
      country: "Lao",
      price: 200000,
      originalPrice:500000,
      promotion: "pro",
      review: 210,
      rating: 4.0,
      type: "apartments",
      image: "https://images.unsplash.com/photo-1682102538897-4983dac9da44?w=600",
      freeCancel: false,
      isTopRated: false,
    },
    {
      id: 4,
      name: "Savannakhet City Stay",
      city: "Savannakhet",
      country: "Lao",
      price: 180000,
      originalPrice:500000,
      promotion: "pro",
      review: 180,
      rating: 3.8,
      type: "villas",
      image: "https://images.unsplash.com/photo-1747063267908-c55644ff40f9?w=600",
      freeCancel: true,
      isTopRated: false,
    },
    {
      id: 5,
      name: "Vientiane Riverside Hotel",
      city: "Vientiane",
      country: "Lao",
      price: 350000,
      originalPrice:500000,
      promotion: "pro",
      review: 510,
      rating: 4.9,
      type: "resorts",
      image: "https://images.unsplash.com/photo-1649957101531-7dca6c97700b?w=600",
      freeCancel: true,
      isTopRated: true,
    },
  ];

  const [products] = useState(
    sampleProducts.sort(() => 0.5 - Math.random()).slice(0, 4)
  );

  return (
    <div className="home">
      <div className="container">
        <h2>Offers</h2>
        <p>Promotions, deals and special offers for you</p>

        {/* slide */}
        <div className="slide">
          <div className="slide-box">
            <h4>Holiday rental</h4>
            <h1>Live the dream in a holiday home</h1>
            <h3>Choose from houses, villas, chalets and more</h3>
            <Link to="/promotion"
              state={{ products: sampleProducts }} className="btn-suc">
              Book your
            </Link>
          </div>
          <div className="slide-box">
            <h4>Late Escape Deals</h4>
            <h2>Go for a good time, not a long time</h2>
            <h3>Squeeze out the last bit of sun with at least 15% off</h3>
            <Link to="/promotion"
              state={{ products: sampleProducts }} className="btn-suc">
              Book your
            </Link>
          </div>
        </div>

        {/* browse property types */}

        <div className="slide-col4">
          <Link
            to="/roomtype/hotels"
            state={{ products: sampleProducts.filter(p => p.type === 'hotels') }}
            className="slide-box4"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=600&auto=format&fit=crop&q=60"
              alt="Hotels"
            />
            <p>Hotels</p>
          </Link>

          <Link
            to="/roomtype/apartments"
            state={{ products: sampleProducts.filter(p => p.type === 'apartments') }}
            className="slide-box4"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=600&auto=format&fit=crop&q=60"
              alt="Apartments"
            />
            <p>Apartments</p>
          </Link>

          <Link
            to="/roomtype/resorts"
            state={{ products: sampleProducts.filter(p => p.type === 'resorts') }}
            className="slide-box4"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=600&auto=format&fit=crop&q=60"
              alt="Resorts"
            />
            <p>Resorts</p>
          </Link>

          <Link
            to="/roomtype/villas"
            state={{ products: sampleProducts.filter(p => p.type === 'villas') }}
            className="slide-box4"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=600&auto=format&fit=crop&q=60"
              alt="Villas"
            />
            <p>Villas</p>
          </Link>
        </div>

        {/* explore Laos */}
        <div className="box3">
          <h1>Explore Laos</h1>
          <h4>These popular destinations have a lot to offer</h4>
        </div>
        <div className="slide-col6">
          <Link
            to="/city/luang-prabang"
            state={{ products: sampleProducts.filter(p => p.city === 'Luang Prabang') }}
            className="slide-box6"
          >
            <img src="https://images.unsplash.com/photo-1705917950934-7efe2b6866cc?w=600&auto=format&fit=crop&q=60" alt="Luang Prabang" />
            <p>Luang Prabang</p>
          </Link>

          <Link
            to="/city/vientiane"
            state={{ products: sampleProducts.filter(p => p.city === 'Vientiane') }}
            className="slide-box6"
          >
            <img src="https://images.unsplash.com/photo-1723622688505-3efc54d4dbae?w=600&auto=format&fit=crop&q=60" alt="Vientiane" />
            <p>Vientiane</p>
          </Link>

          <Link
            to="/city/vang-vieng"
            state={{ products: sampleProducts.filter(p => p.city === 'Vang Vieng') }}
            className="slide-box6"
          >
            <img src="https://images.unsplash.com/photo-1729937350763-c7e2eacb239b?w=600&auto=format&fit=crop&q=60" alt="Vang Vieng" />
            <p>Vang Vieng</p>
          </Link>

          <Link
            to="/city/pakse"
            state={{ products: sampleProducts.filter(p => p.city === 'Pakse') }}
            className="slide-box6"
          >
            <img src="https://images.unsplash.com/photo-1695512910842-1f94262b17e9?w=600&auto=format&fit=crop&q=60" alt="Pakse" />
            <p>Pakse</p>
          </Link>

          <Link
            to="/city/nong-khiaw"
            state={{ products: sampleProducts.filter(p => p.city === 'Nong Khiaw') }}
            className="slide-box6"
          >
            <img src="https://plus.unsplash.com/premium_photo-1661962821338-c07da63995f9?w=600&auto=format&fit=crop&q=60" alt="Nong Khiaw" />
            <p>Nong Khiaw</p>
          </Link>

          <Link
            to="/city/thakhek"
            state={{ products: sampleProducts.filter(p => p.city === 'Thakhek') }}
            className="slide-box6"
          >
            <img src="https://plus.unsplash.com/premium_photo-1661963095864-01a3dbb82d90?w=600&auto=format&fit=crop&q=60" alt="Thakhek" />
            <p>Thakhek</p>
          </Link>
        </div>

        {/* deals */}
        <div className="box4">
          <h1>Deals for the weekend</h1>
          <h4>Save on stays for 12 September - 14 September</h4>
        </div>

        {/* random products */}
        <div className="ad-box">
          <div className="products">
            {products.map((p) => (
              <Link
                to="/product-detail"
                state={{ product: p }}
                key={p.id}
                className="product-card"
              >
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p>{p.city}, {p.country}</p>
                <p>{p.price.toLocaleString()} Kip</p>
                <small>{p.review} reviews</small>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
