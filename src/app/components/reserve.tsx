"use client";

import React, { JSX, useState } from "react";
import "../css/reserve.css";
import { useLocation, useNavigate } from "react-router-dom";

interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  checkIn: string;   // changed to checkIn
  checkOut: string;  // changed to checkOut
  guests: number;
  note: string;
}

export default function ReservePage(): JSX.Element {
  const [formData, setFormData] = useState<ReservationForm>({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    note: "",
  });

  const [hasCoupon, setHasCoupon] = useState(false);
  const [coupon, setCoupon] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  const handlePayment = () => {
  navigate("/payment", { state: { product, formData, grandTotal } });
};


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value as string, 10) : value,
    }));
  };

  // 🔹 calculate nights difference
  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const inDate = new Date(formData.checkIn);
    const outDate = new Date(formData.checkOut);
    const diffTime = outDate.getTime() - inDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();
  const totalPrice = product ? product.price * (nights || 1) : 0;
  const vat = Math.round(totalPrice * 0.10);
  const grandTotal = totalPrice + vat;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation submitted:", formData, { coupon });
    alert("Your reservation has been submitted!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      checkIn: "",
      checkOut: "",
      guests: 1,
      note: "",
    });
    setCoupon("");
    setHasCoupon(false);
  };

  return (
    <div className="container-rev">
      <div className="top-steps">
        <div className="step">
          <div className="circle">1</div>
          <div className="label">
            <div>Your details</div>
            <div className="muted">Guest information</div>
          </div>
        </div>
        <div className="step">
          <div className="circle" style={{ background: "#eaf2ff", color: "#1e40af" }}>2</div>
          <div className="label">
            <div>Payment details</div>
            <div className="muted">Review & confirm</div>
          </div>
        </div>
        <div className="step">
          <div className="circle" style={{ background: "#f3f4f6", color: "#6b7280" }}>3</div>
          <div className="label">
            <div>Booking</div>
            <div className="muted">Complete</div>
          </div>
        </div>
      </div>

      <div className="grid">
        {/* -------- FORM -------- */}
        <div className="card">
          <h3 style={{ fontSize: 20, marginBottom: 8 }}>Booking Review</h3>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Your Details</div>
          <p style={{ color: "#6b7280", marginBottom: 12 }}>
            Please provide the guest information for the reservation.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Guest info */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <label>
                Title
                <select name="title" className="input title-select">
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Ms</option>
                </select>
              </label>

              <label>
                First Name
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="First name"
                />
              </label>

              <label>
                Last Name
                <input
                  name="lastName"
                  onChange={() => { }}
                  className="input"
                  placeholder="Last name"
                />
              </label>
            </div>

            <div className="small-grid" style={{ marginBottom: 12 }}>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="you@email.com"
                />
              </label>

              <label>
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="+856 7xx xxx xx"
                />
              </label>
            </div>

            {/* 🔹 Check In/Out */}
            <div className="small-grid" style={{ marginBottom: 12 }}>
              <label>
                Check In
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </label>

              <label>
                Check Out
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  required
                  className="input"
                />
              </label>
            </div>

            {/* Guests */}
            <label style={{ marginBottom: 12 }}>
              Number of Guests
              <select
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="input"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Special Request / Note
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="input"
                placeholder="Any special requests..."
              />
            </label>

            {/* Coupon */}
            <div className="coupon">
              <label
                className="info"
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <input
                  type="checkbox"
                  checked={hasCoupon}
                  onChange={() => setHasCoupon((v) => !v)}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>I have coupon</div>
                  <div style={{ color: "#6b7280", fontSize: 13 }}>
                    Enter your coupon number
                  </div>
                </div>
              </label>

              {hasCoupon && (
                <div style={{ marginTop: 10 }}>
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="input"
                  />
                </div>
              )}
            </div>

            <div className="actions">
              <button type="submit" className="reserve-btn">
                Reserve Now
              </button>
            </div>
          </form>
        </div>

        {/* -------- BILL -------- */}
        <aside className="card summary">
          <img src={product.image} alt={product.name} />
          <div style={{ fontWeight: 700 }}>{product.name}</div>
          <div className="meta">
            {product.city}, {product.country}
          </div>

          <div className="row" style={{ marginTop: 10 }}>
            <div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>Check In</div>
              <div style={{ fontWeight: 600 }}>
                {formData.checkIn || "Select date"}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>Check Out</div>
              <div style={{ fontWeight: 600 }}>
                {formData.checkOut || "Select date"}
              </div>
            </div>
          </div>

          {/* Price summary */}
          <div className="row" style={{ marginTop: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: "#6b7280" }}>Subtotal</div>
              <div>{totalPrice.toLocaleString()} Kip</div>

              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>VAT (10%)</div>
              <div>{vat.toLocaleString()} Kip</div>

              <hr style={{ margin: "6px 0" }} />

              <div style={{ fontWeight: 700 }}>
                Total: {grandTotal.toLocaleString()} Kip
              </div>

              <small style={{ color: "#6b7280" }}>
                ({nights || 1} night{nights > 1 ? "s" : ""} ×{" "}
                {product.price.toLocaleString()} Kip)
              </small>
            </div>

            <button  onClick={handlePayment} className="reserve-btn">
              Pay Now
            </button>
          </div>

        </aside>
      </div>
    </div>
  );
}
