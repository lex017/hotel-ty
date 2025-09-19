"use client";
import React, { JSX, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/* --------- Types --------- */
interface User {
  id: number;
  FirstName?: string;
  LastName?: string;
  Username: string;
  Email?: string;
  Password?: string;
  Country?: string;
  date?: string;
  gender?: string;
  image?: string;
}

interface Review {
  id: number;
  userId?: number;        
  Username?: string;       
  Email?: string;
  Country?: string;
  createdAt?: string;
  image?: string;
  comment: string;
}

interface Product {
  name: string;
  city: string;
  country: string;
  image: string;
  price: number;
  review: number;
  lat?: number;
  lng?: number;
}

type ReviewSectionProps = {
  users?: User[];
  initialReviews?: Review[];
};
  
function ReviewSection({ users = [], initialReviews = [] }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews || []);
  const [text, setText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(
    users?.[0]?.id ?? null
  );
  const [submitting, setSubmitting] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedUserId && users.length) setSelectedUserId(users[0].id);
  }, [users, selectedUserId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return alert("Please enter a comment.");
    if (!selectedUserId) return alert("Please select a user.");

    setSubmitting(true);
    const usr = users.find((u) => u.id === selectedUserId);
    const newReview: Review = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      userId: selectedUserId,
      Username: usr?.Username ?? "Guest",
      image: usr?.image,
      comment: trimmed,
      createdAt: new Date().toISOString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setText("");
    setSubmitting(false);

    // scroll new item into view
    requestAnimationFrame(() => {
      if (listRef.current) listRef.current.scrollTop = 0;
    });
  };

  const formatTime = (iso?: string) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };

  return (
    <div className="re-com">
     

      <form className="review-form" onSubmit={handleSubmit}>
        <select
          value={selectedUserId ?? ""}
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
          aria-label="Select user"
        >
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.FirstName ? `${u.FirstName} (${u.Username})` : u.Username}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Write your comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Write a comment"
        />

        <button type="submit" disabled={submitting}>
          {submitting ? "Posting..." : "Post"}
        </button>
      </form>

      <div className="review-list" ref={listRef}>
        {reviews.length === 0 && <div className="no-comments">No comments yet.</div>}
        {reviews.map((r) => {
          const u = users.find((x) => x.id === r.userId) || { Username: r.Username, image: r.image };
          return (
            <div className="review-item" key={r.id}>
              <div className="review-avatar">
                {u.image ? (
                  <img src={u.image} alt={u.Username} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  (u.Username || "U").slice(0, 1).toUpperCase()
                )}
              </div>

              <div className="review-body">
                <div className="review-head">
                  <div className="review-name">{u.Username || "User"}</div>
                  <div className="review-time">{formatTime(r.createdAt)}</div>
                </div>
                <div className="review-text">{r.comment}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------- ProductDetail (typed) ---------------- */
export default function ProductDetail(): JSX.Element {
  const user: User[] = [
    { id: 1, FirstName: "souliya", LastName: "ppm", Username: "alex", image: "https://images.unsplash.com/photo-1756456386209-2c83bab17506?w=600&auto=format&fit=crop&q=60" },
    { id: 2, FirstName: "Anong", LastName: "Sivong", Username: "anong98", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=60" },
    { id: 3, FirstName: "John", LastName: "Smith", Username: "johnny", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=60" },
    { id: 4, FirstName: "Mai", LastName: "Nguyen", Username: "mai_ng", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60" },
  ];

  const review: Review[] = [
    {
      id: 1,
      Username: "mai_ng",
      Email: "mainguyen@example.com",
      Country: "Vietnam",
      createdAt: "1999-07-09T23:00:00.000Z",
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop&q=60",
      comment: "Hi i want to go there how much cost?",
    },
  ];

  // typed location state (product may be passed via react-router)
  const location = useLocation();
  const state = (location.state as { product?: Product } | null) ?? null;

  const fallbackProduct: Product = {
    name: "Demo Hotel",
    city: "Vang Vieng",
    country: "Lao",
    image: "https://images.unsplash.com/photo-1501117716987-c8e672f7b497?w=1200&auto=format&fit=crop&q=60",
    price: 250000,
    review: 12,
    lat: 18.9235,
    lng: 102.4413,
  };

  const product: Product = state?.product ?? fallbackProduct;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="product-detail">
      

      <div className="ht-header">
        <div className="ht-text">
          <h1>{product.name}</h1>
          <p>{product.city}, {product.country}</p>
        </div>
        <div className="ht-btn">
           <Link
            to="/reserve"
            state={{ product }}
          >
            Reserve
           </Link>
        </div>
      </div>

      <div className="ht-cont">
        <div className="ht-img">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="ht-detail">
          <div className="ht-d1">
            <p>{(product.price || 0).toLocaleString()} Kip</p>
            <small>{product.review} reviews</small>
          </div>

          <hr />

          <div className="ht-d2">
            <h4>Review</h4>
            <p>{user[0].Username}</p>
            <p>{review[0].comment}</p>

          <br />
          </div>

          <aside id="comment-drawer" className={`comment-drawer ${drawerOpen ? "open" : ""}`} role="dialog" aria-modal="false" aria-label="Comments panel">
            <div className="drawer-header">
              <h3>Comments</h3>
              <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close comments">✕</button>
            </div>

            <div className="drawer-body">
              {review && review.length ? (
                review.map((r) => (
                  <div className="comment" key={r.id}>
                    <strong>{user.find((u) => u.Username === r.Username)?.Username ?? user[0].Username}</strong>
                    <p>{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="no-comments">No comments yet.</p>
              )}
            </div>
          </aside>

          <div className="ht-map">
            {/* use allow="fullscreen" to avoid TS complaining about allowFullScreen prop */}
            <iframe
              title="property-map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${product.city}, ${product.country}`)}&output=embed`}
              style={{ border: 0, width: "100%", height: "160px", borderRadius: "10px" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allow="fullscreen"
            />
          </div>
        </div>
      </div>

      <div className="description">
        <div className="property">
          <div className="head-des">
            <h1>About this property</h1>
          </div>
          <hr />
          <div className="main-des">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nihil sint expedita vel, fugit, cumque maiores voluptatem officia provident voluptate nemo! Incidunt ratione dolor maxime impedit iusto repellendus et nobis.</p>
          </div>
        </div>

        <div className="highlights">
          <div className="hi-head">
            <h2>Property highlights</h2>
            <h2>Perfect for a 2-night stay!</h2>
          </div>
          <div className="hi-main">
            <p>Situated in the best rated area in Vang Vieng, this hotel has an excellent location score of 9.1</p>
          </div>
          <div className="hi-footer">
            <p>Breakfast info</p>
          </div>
          <div className="hi-hign">
            <h1>room with:</h1>
            <p>Terrace</p>
            <p>Mountain view</p>
            <p>Free private parking available at the hotel</p>
            <div className="ht-btn">
              <a href="#">Reserve</a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <ReviewSection users={user} initialReviews={review} />
      </div>
    </div>
  );
}
