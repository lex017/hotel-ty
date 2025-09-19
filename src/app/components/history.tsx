"use client";

import React, { useMemo, useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";


/* mock bookings (replace with Firestore data) */
const BOOKINGS = [
  { id: "B-010", userId: "user-1", userName: "Alice", amount: 35.5, status: "paid", timestamp: "2025-09-18T09:23:00.000Z", details: "Parking slot A1" },
  { id: "B-009", userId: "user-1", userName: "Alice", amount: 20.0, status: "paid", timestamp: "2025-09-18T08:10:00.000Z", details: "Early bird" },
  { id: "B-008", userId: "user-1", userName: "Alice", amount: 60.0, status: "paid", timestamp: "2025-09-14T11:30:00.000Z", details: "Daily pass" },
  { id: "B-007", userId: "user-1", userName: "Alice", amount: 15.0, status: "refunded", timestamp: "2025-09-12T16:45:00.000Z", details: "Hourly parking" },
  { id: "B-006", userId: "user-2", userName: "Bob",   amount: 50.0, status: "paid", timestamp: "2025-09-11T13:00:00.000Z", details: "Parking slot B3" },
];

const currentUserId = "user-1";

function groupByDayWithTotals(bookings: any[]) {
  const map = new Map<string, any[]>();
  bookings.forEach(b => {
    const d = new Date(b.timestamp);
    const key = d.toLocaleDateString();
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(b);
  });

  const arr = Array.from(map.entries())
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
    .map(([date, items]) => {
      const sorted = items.sort((x: any, y: any) => new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime());
      const total = sorted.reduce((s: number, it: any) => s + Number(it.amount || 0), 0);
      return { date, items: sorted, total };
    });

  return arr;
}

function fmtCurrency(n: number) {
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function BookingHistoryBeautiful() {
  const [query, setQuery] = useState("");
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>({});
  const [details, setDetails] = useState<any | null>(null);

  const userBookings = useMemo(() => BOOKINGS.filter(b => b.userId === currentUserId), []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return userBookings.filter(b =>
      !q ||
      b.id.toLowerCase().includes(q) ||
      b.details.toLowerCase().includes(q) ||
      b.status.toLowerCase().includes(q)
    );
  }, [userBookings, query]);

  const grouped = useMemo(() => groupByDayWithTotals(filtered), [filtered]);

  const totalRevenue = useMemo(() => filtered.reduce((s, b) => s + Number(b.amount || 0), 0), [filtered]);

  function toggleDay(date: string) {
    setExpandedDays(prev => ({ ...prev, [date]: !prev[date] }));
  }

  return (
    <div className="hb-root">
      <div className="hb-card">
        <header className="hb-header">
          <div className="hb-left">
            <h2 className="hb-title">Booking History</h2>
            <div className="hb-sub">Your past bookings — grouped by day</div>
          </div>

          <div className="hb-actions">
          

            <div className="hb-search">
              <Search size={16} />
              <input
                placeholder="Search id, details, status..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="hb-body">
          {grouped.length === 0 ? (
            <div className="hb-empty">
              <svg width="92" height="72" viewBox="0 0 92 72" fill="none" aria-hidden>
                <rect x="4" y="8" width="84" height="56" rx="8" fill="#F8FAFF"/>
                <path d="M12 20h68" stroke="#E6EEF9" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="20" cy="40" r="8" fill="#EEF6FF"/>
                <rect x="34" y="34" width="40" height="12" rx="3" fill="#F4F8FF"/>
              </svg>
              <div className="hb-empty-text">No bookings found</div>
            </div>
          ) : (
            grouped.map(group => (
              <div className="hb-day" key={group.date}>
                <button
                  className={`hb-day-head ${expandedDays[group.date] ? "open" : ""}`}
                  onClick={() => toggleDay(group.date)}
                  aria-expanded={!!expandedDays[group.date]}
                >
                  <div className="hb-day-left">
                    <div className="hb-day-date">{group.date}</div>
                    <div className="hb-day-meta">{group.items.length} booking(s)</div>
                  </div>

                  <div className="hb-day-right">
                    <div className="hb-day-total">₭ {fmtCurrency(group.total)}</div>
                    <ChevronDown className="hb-chevron" />
                  </div>
                </button>

                <div className={`hb-day-body ${expandedDays[group.date] ? "show" : ""}`}>
                  {group.items.map((b: any) => (
                    <div key={b.id} className="hb-item" onClick={() => setDetails(b)}>
                      <div className="hb-item-left">
                        <div className="hb-item-id">#{b.id}</div>
                        <div className="hb-item-details">{b.details}</div>
                        <div className="hb-item-time">{new Date(b.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
                      </div>

                      <div className="hb-item-right">
                        <div className="hb-item-amt">₭ {fmtCurrency(Number(b.amount || 0))}</div>
                        <div className={`hb-badge ${b.status}`}>{b.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {details && (
        <div className="hb-modal-backdrop" onClick={() => setDetails(null)}>
          <div className="hb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="hb-modal-head">
              <h4>Booking {details.id}</h4>
              <button className="hb-modal-close" onClick={() => setDetails(null)} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="hb-modal-body">
              <div className="hb-row"><span>User</span><strong>{details.userName}</strong></div>
              <div className="hb-row"><span>Time</span><strong>{new Date(details.timestamp).toLocaleString()}</strong></div>
              <div className="hb-row"><span>Details</span><strong>{details.details}</strong></div>
              <div className="hb-row"><span>Amount</span><strong>₭ {fmtCurrency(Number(details.amount || 0))}</strong></div>
              <div className="hb-row"><span>Status</span><strong className={`hb-badge ${details.status}`}>{details.status}</strong></div>
            </div>

            <div className="hb-modal-foot">
              <button className="hb-btn" onClick={() => setDetails(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
