"use client";

import React, { useMemo, useState } from "react";
import { Search, Download, Phone } from "lucide-react";

/*
  Mock bookings data structure:
  {
    id: "B-001",
    userId: "user-1",
    userName: "Alice",
    amount: 35.5,      // revenue
    cost: 10.0,        // direct cost
    status: "paid",
    timestamp: "2025-09-18T10:23:00.000Z",
    details: "Parking slot A1"
  }
*/
const BOOKINGS = [
  { id: "B-001", userId: "user-1", userName: "Alice", amount: 35.5, cost: 10.0, status: "paid", timestamp: "2025-09-18T09:23:00.000Z", details: "Parking slot A1" },
  { id: "B-002", userId: "user-2", userName: "Bob",   amount: 50.0, cost: 18.0, status: "paid", timestamp: "2025-09-17T13:00:00.000Z", details: "Parking slot B3" },
  { id: "B-003", userId: "user-1", userName: "Alice", amount: 15.0, cost: 5.0,  status: "refunded", timestamp: "2025-09-16T16:45:00.000Z", details: "Hourly parking" },
  { id: "B-004", userId: "user-1", userName: "Alice", amount: 60.0, cost: 20.0, status: "paid", timestamp: "2025-09-14T11:30:00.000Z", details: "Daily pass" },
  { id: "B-005", userId: "user-1", userName: "Alice", amount: 20.0, cost: 7.5,  status: "paid", timestamp: "2025-09-01T08:10:00.000Z", details: "Early bird" },
  // add more mock rows as needed
];

const currentUserId = "user-1"; // <- change this to show another user's bookings

function startOfISOWeek(d: string | number | Date) {
  const date = new Date(d);
  const day = (date.getDay() + 6) % 7; // make Monday=0, Sunday=6
  date.setDate(date.getDate() - day);
  date.setHours(0,0,0,0);
  return date;
}

function isSameDay(a: { getFullYear: () => any; getMonth: () => any; getDate: () => any; }, b: { getFullYear: () => any; getMonth: () => any; getDate: () => any; }) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

function isSameMonth(a: { getFullYear: () => any; getMonth: () => any; }, b: { getFullYear: () => any; getMonth: () => any; }) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth();
}

function isSameWeek(a: any, ref: any) {
  const sa = startOfISOWeek(a);
  const sb = startOfISOWeek(ref);
  return sa.getTime() === sb.getTime();
}

function formatCurrency(n: number) {
  return Number(n).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ReportBookings() {
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("day"); // 'day' | 'week' | 'month' | 'custom'
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  // filter only bookings for current user
  const userBookings = useMemo(() => BOOKINGS.filter(b => b.userId === currentUserId), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const now = new Date();
    let start = null, end = null;

    if (range === "day") {
      start = new Date(now); start.setHours(0,0,0,0);
      end = new Date(now); end.setHours(23,59,59,999);
    } else if (range === "week") {
      start = startOfISOWeek(now);
      end = new Date(start); end.setDate(start.getDate() + 6); end.setHours(23,59,59,999);
    } else if (range === "month") {
      start = new Date(now.getFullYear(), now.getMonth(), 1); start.setHours(0,0,0,0);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0); end.setHours(23,59,59,999);
    } else if (range === "custom") {
      if (customStart) {
        start = new Date(customStart); start.setHours(0,0,0,0);
      }
      if (customEnd) {
        end = new Date(customEnd); end.setHours(23,59,59,999);
      }
    }

    return userBookings.filter(b => {
      const dt = new Date(b.timestamp);

      // filter by date range if defined
      if (start && dt < start) return false;
      if (end && dt > end) return false;

      // text query match
      if (!q) return true;
      return (
        b.id.toLowerCase().includes(q) ||
        (b.details && b.details.toLowerCase().includes(q)) ||
        (b.status && b.status.toLowerCase().includes(q))
      );
    }).sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [userBookings, range, customStart, customEnd, query]);

  // totals
  const totals = useMemo(() => {
    let revenue = 0, cost = 0;
    for (const b of filtered) {
      // treat refunded or canceled as negative revenue if you want — currently include as-is
      // if you want to treat refunded as negative: if (b.status === 'refunded') revenue -= b.amount;
      revenue += Number(b.amount || 0);
      cost += Number(b.cost || 0);
    }
    const profit = revenue - cost;
    return { revenue, cost, profit };
  }, [filtered]);

  // quick helpful text for the active range
  const rangeLabel = useMemo(() => {
    if (range === "day") return "Today";
    if (range === "week") return "This week";
    if (range === "month") return "This month";
    if (range === "custom") {
      if (customStart && customEnd) return `${customStart} → ${customEnd}`;
      if (customStart) return `From ${customStart}`;
      if (customEnd) return `Until ${customEnd}`;
      return "Custom range";
    }
    return "";
  }, [range, customStart, customEnd]);

  return (
    <div className="rb-container">
      <div className="rb-box">
        <header className="rb-header">
          <div className="rb-left">
            <div className="rb-logo">i</div>
            <div>
              <div className="rb-title">User Dashboard</div>
              <div className="rb-sub">Bookings & financial overview</div>
            </div>
            <div className="rb-section-title">• {rangeLabel}</div>
          </div>

          <div className="rb-right">
            <div className="rb-search">
              <Search className="icon" size={16} />
              <input placeholder="Search bookings (id, details, status)" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>

            <button className="rb-btn">
              <Download size={14} /> Export
            </button>
          </div>
        </header>

        <div className="rb-main">
          <aside className="rb-sidebar">
            <div className="rb-sidebar-section">
              <div className="rb-sidebar-title">Date range</div>
              <div className="rb-range-buttons">
                <button className={range === "day" ? "active" : ""} onClick={() => setRange("day")}>Day</button>
                <button className={range === "week" ? "active" : ""} onClick={() => setRange("week")}>Week</button>
                <button className={range === "month" ? "active" : ""} onClick={() => setRange("month")}>Month</button>
                <button className={range === "custom" ? "active" : ""} onClick={() => setRange("custom")}>Custom</button>
              </div>

              {range === "custom" && (
                <div className="rb-custom-dates">
                  <label>Start
                    <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} />
                  </label>
                  <label>End
                    <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} />
                  </label>
                  <button className="rb-apply" onClick={() => {/* no-op — state already applied */}}>Apply</button>
                </div>
              )}
            </div>

            <div className="rb-sidebar-section">
              <div className="rb-sidebar-title">Summary</div>
              <div className="rb-metrics">
                <div className="metric">
                  <div className="metric-label">Revenue</div>
                  <div className="metric-value">₭ {formatCurrency(totals.revenue)}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Cost</div>
                  <div className="metric-value">₭ {formatCurrency(totals.cost)}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Profit</div>
                  <div className="metric-value">₭ {formatCurrency(totals.profit)}</div>
                </div>
              </div>
            </div>
          </aside>

          <section className="rb-list-area">
            <div className="rb-list-header">
              <h3>Bookings ({filtered.length})</h3>
              <div className="rb-range-note">Showing: {rangeLabel}</div>
            </div>

            <div className="rb-list">
              {filtered.map(b => {
                const dt = new Date(b.timestamp);
                return (
                  <div className="rb-item" key={b.id}>
                    <div className="rb-item-left">
                      <div className="rb-item-id">#{b.id}</div>
                      <div className="rb-item-details">{b.details}</div>
                      <div className="rb-item-time">{dt.toLocaleString()}</div>
                    </div>

                    <div className="rb-item-right">
                      <div className="rb-amount">₭ {formatCurrency(b.amount)}</div>
                      <div className="rb-cost">cost ₭ {formatCurrency(b.cost)}</div>
                      <div className={`rb-status ${b.status}`}>{b.status}</div>
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="rb-empty">No bookings in this range</div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
