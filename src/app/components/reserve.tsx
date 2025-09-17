import React, { useState } from "react";


interface ReservationForm {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  note: string;
}

const ReservePage: React.FC = () => {
  const [formData, setFormData] = useState<ReservationForm>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation submitted:", formData);
    alert("Your reservation has been submitted!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: 1,
      note: "",
    });
  };

  return (
    <div className="reserve-page">
      <h2>Reserve a Spot</h2>
      <form className="reserve-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-row">
          <label>
            Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Time
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label>
          Number of Guests
          <select
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
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
          />
        </label>

        <button type="submit" className="reserve-btn">Reserve Now</button>
      </form>
    </div>
  );
};

export default ReservePage;
