"use client";

import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation } from "react-router-dom";

export default function PaymentPage() {
  const [method, setMethod] = useState("cash");
  const location = useLocation();
  const { product, grandTotal } = location.state || {};

  // fallback amount: prefer grandTotal then product.price then 0
  const amount = typeof grandTotal !== "undefined" ? grandTotal : (product?.price ?? 0);

  const format = (v: number) => (typeof v === "number" ? v.toLocaleString() + " Kip" : v);
  const qrValue = `pay://booking?amount=${amount}&product=${encodeURIComponent(product?.name ?? "")}`;

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert(`Payment with: ${method} confirmed — amount: ${format(amount)}`);
  };

  return (
    <div className="payment-shell">
      <style>{`
        .payment-shell{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial;margin:24px;display:flex;justify-content:center}
        .payment-card{max-width:980px;width:100%;display:grid;grid-template-columns:1fr 380px;gap:20px}
        .card{background:linear-gradient(180deg, #ffffff, #fbfdff);border:1px solid rgba(16,24,40,0.04);border-radius:12px;padding:20px;box-shadow:0 6px 20px rgba(16,24,40,0.06)}
        .left .title{font-size:20px;font-weight:700;margin-bottom:8px}
        .muted{color:#6b7280;font-size:13px}
        .methods{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0}
        .option{flex:1;min-width:110px;border-radius:10px;padding:10px 12px;border:1px solid #e6eefc;display:flex;align-items:center;gap:10px;cursor:pointer;transition:all .15s ease}
        .option input{display:none}
        .option svg{width:20px;height:20px;opacity:.9}
        .option.active{background:#eef6ff;border-color:#cfe3ff;box-shadow:0 6px 14px rgba(14,73,203,0.06)}
        .qr-box{display:flex;flex-direction:column;align-items:center;gap:10px;padding:14px;border-radius:10px;background:linear-gradient(180deg,#f7fbff,#ffffff);border:1px dashed rgba(30,64,175,0.06)}
        .summary h4{margin:0 0 8px 0;font-size:16px}
        .price-large{font-size:22px;font-weight:700}
        .pay-btn{background:#0f172a;color:white;padding:10px 14px;border-radius:10px;border:0;cursor:pointer;font-weight:600;margin-top:12px}
        .pay-btn:active{transform:translateY(1px)}
        .field{display:flex;gap:8px;align-items:center}
        .note{font-size:13px;color:#475569}
        @media(max-width:940px){.payment-card{grid-template-columns:1fr;}.qr-box{width:100%}}
      `}</style>

      <div className="payment-card">
        <div className="card left">
          <div className="title">Select Payment Method</div>
          <div className="muted">Choose how you'd like to pay for your booking</div>

          <form onSubmit={handleSubmit}>
            <div className="methods" role="radiogroup" aria-label="Payment methods">
              <label className={`option ${method === "cash" ? "active" : ""}`}>
                <input type="radio" name="payment" value="cash" checked={method === "cash"} onChange={() => setMethod("cash")} />
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7h16v10H4z" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div>
                  <div style={{fontWeight:700}}>Cash</div>
                  <div className="note">Pay at check-in</div>
                </div>
              </label>

              <label className={`option ${method === "qr" ? "active" : ""}`}>
                <input type="radio" name="payment" value="qr" checked={method === "qr"} onChange={() => setMethod("qr")} />
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3z" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div>
                  <div style={{fontWeight:700}}>QR Code</div>
                  <div className="note">Scan to pay instantly</div>
                </div>
              </label>

              <label className={`option ${method === "visa" ? "active" : ""}`}>
                <input type="radio" name="payment" value="visa" checked={method === "visa"} onChange={() => setMethod("visa")} />
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h18v10H3z" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div>
                  <div style={{fontWeight:700}}>Card (Visa/Master)</div>
                  <div className="note">Secure card payment</div>
                </div>
              </label>

              <label className={`option ${method === "paypal" ? "active" : ""}`}>
                <input type="radio" name="payment" value="paypal" checked={method === "paypal"} onChange={() => setMethod("paypal")} />
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 7h18v10H3z" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <div>
                  <div style={{fontWeight:700}}>PayPal</div>
                  <div className="note">Pay with PayPal</div>
                </div>
              </label>
            </div>

            <div style={{marginTop:12}}>
              {method === "cash" && (
                <div className="field">
                  <div className="muted">Please prepare</div>
                  <div className="price-large">{format(amount)}</div>
                </div>
              )}

              {method === "qr" && (
                <div className="qr-box">
                  <QRCodeCanvas value={qrValue} size={200} />
                  <div className="note">Scan this QR code with your banking app to pay {format(amount)}.</div>
                </div>
              )}

              {method === "visa" && (
                <div style={{display:'grid',gap:8,marginTop:8}}>
                  <label>
                    Card Number
                    <input className="input" style={{width:'100%',padding:10,borderRadius:8,border:'1px solid #e6eefc'}} placeholder="1234 5678 9012 3456" />
                  </label>
                  <div style={{display:'flex',gap:8}}>
                    <input placeholder="MM/YY" className="input" style={{flex:1,padding:10,borderRadius:8,border:'1px solid #e6eefc'}} />
                    <input placeholder="CVV" className="input" style={{width:120,padding:10,borderRadius:8,border:'1px solid #e6eefc'}} />
                  </div>
                </div>
              )}

              {method === "paypal" && (
                <div style={{marginTop:8}} className="note">You will be redirected to PayPal to complete your payment of {format(amount)}.</div>
              )}

              <button type="submit" className="pay-btn">Confirm payment</button>
            </div>
          </form>
        </div>

        <div className="card summary">
          <h4>Booking summary</h4>
          <div style={{display:'flex',gap:12,alignItems:'center',marginTop:8}}>
            <img src={product?.image} alt={product?.name} style={{width:72,height:72,objectFit:'cover',borderRadius:8}} />
            <div>
              <div style={{fontWeight:700}}>{product?.name ?? 'No product'}</div>
              <div className="muted">{product?.city ?? ''} {product?.country ? ', ' + product.country : ''}</div>
            </div>
          </div>

          <div style={{marginTop:14}}>
            <div className="muted">Subtotal</div>
            <div className="price-large">{format(typeof grandTotal !== 'undefined' ? (grandTotal - Math.round((grandTotal/11))) : amount)}</div>
            <div className="muted" style={{marginTop:6}}>VAT (10%)</div>
            <div>{format(Math.round((amount) * 0.10))}</div>
            <hr style={{margin:'10px 0'}} />
            <div style={{fontWeight:800,fontSize:18}}>Total</div>
            <div style={{fontWeight:700,fontSize:18}}>{format(amount)}</div>
          </div>

          <div style={{marginTop:12}} className="note">Secure payment · 256‑bit encryption</div>
        </div>
      </div>
    </div>
  );
}
