"use client";

import { useState } from "react";

function id() {
  return Math.random().toString(36).substring(2, 10);
}

type Flight = {
  id: string;
  flightNo: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  delay: string;
};

export default function Page() {
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: id(),
      flightNo: "AI-202",
      from: "Delhi",
      to: "Dubai",
      departure: "10:30 AM",
      arrival: "01:45 PM",
      delay: "10 mins",
    },
    {
      id: id(),
      flightNo: "EK-501",
      from: "Mumbai",
      to: "Singapore",
      departure: "12:00 PM",
      arrival: "06:30 PM",
      delay: "On Time",
    },
  ]);

  const [editing, setEditing] = useState<Flight | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState<Flight>({
    id: "",
    flightNo: "",
    from: "",
    to: "",
    departure: "",
    arrival: "",
    delay: "",
  });

  function openEdit(f: Flight) {
    setEditing(f);
    setForm(f);
  }

  function openAdd() {
    setShowAdd(true);
    setEditing(null);
    setForm({
      id: id(),
      flightNo: "",
      from: "",
      to: "",
      departure: "",
      arrival: "",
      delay: "",
    });
  }

  function saveFlight() {
    if (!form.flightNo.trim()) return;

    if (editing) {
      setFlights((prev) =>
        prev.map((f) => (f.id === editing.id ? form : f))
      );
      setEditing(null);
    } else {
      setFlights((prev) => [...prev, form]);
    }
    setShowAdd(false);
  }

  function statusType(delay: string) {
    if (!delay) return "unknown";
    const d = delay.toLowerCase();
    if (d.includes("on time")) return "ontime";
    if (d.includes("cancel")) return "cancelled";
    if (d.includes("delay") || d.includes("late") || d.match(/\d/)) return "delayed";
    return "info";
  }

  return (
    <>
      {}
      <video autoPlay loop muted playsInline className="bgVideo">
        <source src="/flight.mp4" type="video/mp4" />
      </video>

      <div className="overlay" />

      <div className="app">
        {/* Top navbar */}
        <header className="navbar">
          <div className="brand">
            <span className="logoDot" />
            <span className="brandName">AirSarth</span>
          </div>

          <div className="searchWrap">
            <input
              className="searchInput"
              placeholder="Search flights..."
            />
          </div>

          <div className="navActions">
            <button className="navBtn primary" onClick={openAdd}>
              + Add Flight
            </button>
            <button className="navBtn">Help</button>
          </div>
        </header>

        {}
        <main className="content">
          <div className="headingRow">
            <div>
              <h1 className="title">Flight Status</h1>
              <p className="subtitle">
                Live overview of departures & arrivals. Edit delays and details manually.
              </p>
            </div>
            <div className="tag">
              {flights.length} flights listed
            </div>
          </div>

          <section className="grid">
            {flights.map((f) => {
              const status = statusType(f.delay);
              return (
                <article key={f.id} className="card">
                  <div className="cardHeader">
                    <div>
                      <h2 className="flightNo">{f.flightNo}</h2>
                      <div className="route">
                        {f.from} <span className="arrow">➜</span> {f.to}
                      </div>
                    </div>
                    <button
                      className="editChip"
                      onClick={() => openEdit(f)}
                    >
                      ✏️ Edit
                    </button>
                  </div>

                  <div className="times">
                    <div className="timeBlock">
                      <span className="label">Departure</span>
                      <span className="value">{f.departure}</span>
                    </div>
                    <div className="timeBlock">
                      <span className="label">Arrival</span>
                      <span className="value">{f.arrival}</span>
                    </div>
                  </div>

                  <div className="footerRow">
                    <span className={`status status-${status}`}>
                      {status === "ontime" && "On Time"}
                      {status === "delayed" && "Delayed"}
                      {status === "cancelled" && "Cancelled"}
                      {status === "info" && "Status"}
                      {status === "unknown" && "Unknown"}
                    </span>
                    <span className="delayText">{f.delay || "—"}</span>
                  </div>
                </article>
              );
            })}

            {flights.length === 0 && (
              <div className="empty">
                No flights yet. Click <strong>+ Add Flight</strong> to create one.
              </div>
            )}
          </section>
        </main>
      </div>

      {}
      {(editing || showAdd) && (
        <div className="modalOverlay">
          <div className="modal">
            <h2 className="modalTitle">
              {editing ? "Edit Flight" : "Add New Flight"}
            </h2>

            <div className="formGrid">
              <label className="field">
                <span>Flight Number</span>
                <input
                  value={form.flightNo}
                  onChange={(e) =>
                    setForm({ ...form, flightNo: e.target.value })
                  }
                  placeholder="e.g. AI-202"
                />
              </label>

              <label className="field">
                <span>From</span>
                <input
                  value={form.from}
                  onChange={(e) =>
                    setForm({ ...form, from: e.target.value })
                  }
                  placeholder="Origin city"
                />
              </label>

              <label className="field">
                <span>To</span>
                <input
                  value={form.to}
                  onChange={(e) =>
                    setForm({ ...form, to: e.target.value })
                  }
                  placeholder="Destination city"
                />
              </label>

              <label className="field">
                <span>Departure Time</span>
                <input
                  value={form.departure}
                  onChange={(e) =>
                    setForm({ ...form, departure: e.target.value })
                  }
                  placeholder="e.g. 10:30 AM"
                />
              </label>

              <label className="field">
                <span>Arrival Time</span>
                <input
                  value={form.arrival}
                  onChange={(e) =>
                    setForm({ ...form, arrival: e.target.value })
                  }
                  placeholder="e.g. 01:45 PM"
                />
              </label>

              <label className="field fullWidth">
                <span>Delay / Status</span>
                <input
                  value={form.delay}
                  onChange={(e) =>
                    setForm({ ...form, delay: e.target.value })
                  }
                  placeholder='e.g. "On Time", "Delayed 30 mins"'
                />
              </label>
            </div>

            <div className="modalActions">
              <button className="btnPrimary" onClick={saveFlight}>
                Save
              </button>
              <button
                className="btnGhost"
                onClick={() => {
                  setEditing(null);
                  setShowAdd(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        :root {
          --blue: #2874f0;
          --blue-dark: #c7d2fe;
          --font: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
            Roboto, "Helvetica Neue", Arial, sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .bgVideo {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100vh;
          object-fit: cover;
          z-index: -2;
          filter:brightness(0.9) contrast(1.05);
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: radial-gradient(
              circle at top,
              rgba(15, 23, 42, 0.15),
              rgba(15, 23, 42, 0.35)
            ),
            linear-gradient(
              to bottom right,
              rgba(15, 23, 42, 0.3),
              rgba(15, 23, 42, 0.4)
            );
          z-index: -1;
        }

        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: var(--font);
          color: #0f172a;
        }

        .navbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 10px 32px;
          background: linear-gradient(90deg, #1e40af, #2563eb);
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.5);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
          color: white;
        }

        .logoDot {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 30%, #facc15, #f97316);
          box-shadow: 0 0 14px rgba(250, 204, 21, 0.9);
        }

        .brandName {
          font-weight: 700;
          letter-spacing: 0.05em;
          font-size: 16px;
          text-transform: uppercase;
        }

        .searchWrap {
          flex: 1;
          max-width: 460px;
        }

        .searchInput {
          width: 100%;
          padding: 8px 12px;
          border-radius: 4px;
          border: none;
          outline: none;
          font-size: 14px;
        }

        .navActions {
          display: flex;
          gap: 10px;
        }

        .navBtn {
          border-radius: 4px;
          border: none;
          font-size: 14px;
          padding: 6px 12px;
          cursor: pointer;
          background: rgba(15, 23, 42, 0.05);
          color: white;
        }

        .navBtn.primary {
          background: #facc15;
          color: #1f2937;
          font-weight: 600;
        }

        .content {
          max-width: 1120px;
          width: 100%;
          margin: 18px auto 32px;
          padding: 0 16px 24px;
        }

        .headingRow {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 10px;
          margin-bottom: 18px;
          color: white;
        }

        .title {
          margin: 0 0 4px;
          font-size: 26px;
          font-weight: 700;
        }

        .subtitle {
          margin: 0;
          font-size: 13px;
          opacity: 0.85;
        }

        .tag {
          background: rgba(15, 23, 42, 0.85);
          color: #e5e7eb;
          border-radius: 999px;
          padding: 4px 12px;
          font-size: 12px;
          border: 1px solid rgba(148, 163, 184, 0.7);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
        }

        /* DARK GLASS CARD + WHITE TEXT */
        .card {
          background: rgba(15, 23, 42, 0.88);
          border-radius: 14px;
          padding: 14px 14px 12px;
          box-shadow: 0 12px 35px rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.6);
          backdrop-filter: blur(12px);
          color: #e5e7eb;
        }

        .cardHeader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .flightNo {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #e5e7eb; /* white-ish */
        }

        .route {
          font-size: 13px;
          color: #c7d2fe; /* light indigo */
          margin-top: 2px;
        }

        .arrow {
          margin: 0 4px;
        }

        .editChip {
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.8);
          padding: 4px 10px;
          font-size: 12px;
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          cursor: pointer;
        }

        .times {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin: 8px 0 10px;
          padding-top: 6px;
          border-top: 1px solid rgba(55, 65, 81, 0.9);
        }

        .timeBlock {
          flex: 1;
        }

        .label {
          display: block;
          font-size: 11px;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .value {
          font-size: 14px;
          font-weight: 600;
          color: #f9fafb; /* near white */
        }

        .footerRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 4px;
        }

        .status {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          border-radius: 999px;
          padding: 3px 8px;
          font-weight: 600;
        }

        .status-ontime {
          background: #166534;
          color: #bbf7d0;
        }

        .status-delayed {
          background: #92400e;
          color: #fed7aa;
        }

        .status-cancelled {
          background: #7f1d1d;
          color: #fecaca;
        }

        .status-info,
        .status-unknown {
          background: #374151;
          color: #e5e7eb;
        }

        .delayText {
          font-size: 13px;
          color: #e5e7eb;
          font-weight: 500;
        }

        .empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 18px;
          border-radius: 8px;
          background: rgba(15, 23, 42, 0.75);
          color: #e5e7eb;
          font-size: 13px;
        }

        /* Modal */
        .modalOverlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal {
          width: 100%;
          max-width: 520px;
          background: #f9fafb;
          border-radius: 12px;
          padding: 18px 18px 14px;
          box-shadow: 0 20px 60px rgba(15, 23, 42, 0.65);
          border: 1px solid #e5e7eb;
        }

        .modalTitle {
          margin: 0 0 10px;
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        .formGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px 12px;
          margin-bottom: 12px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12px;
          color: #4b5563;
        }

        .field.fullWidth {
          grid-column: 1 / -1;
        }

        .field input {
          padding: 8px 10px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
          outline: none;
          font-size: 13px;
        }

        .field input:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.5);
        }

        .modalActions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 4px;
        }

        .btnPrimary,
        .btnGhost {
          border-radius: 6px;
          border: none;
          padding: 7px 14px;
          font-size: 13px;
          cursor: pointer;
          font-weight: 600;
        }

        .btnPrimary {
          background: var(--blue);
          color: white;
        }

        .btnGhost {
          background: transparent;
          color: #4b5563;
        }

        @media (max-width: 768px) {
          .navbar {
            flex-wrap: wrap;
            padding: 8px 12px;
          }

          .content {
            margin-top: 14px;
          }

          .formGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
