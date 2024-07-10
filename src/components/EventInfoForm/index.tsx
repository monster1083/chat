"use client"
import { useState } from "react";
import "./index.css"
import { useEventInfoStore } from "@/store/event";

export default function EventInfoForm() {
  const {updateEventInfo} = useEventInfoStore();

  const [formData, setFormData] = useState({
    eventName: '',
    when: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    updateEventInfo(formData)
    // Here you can add your logic to handle form submission, e.g., send data to server
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="form-group">
        <label htmlFor="eventName">Event Name:</label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          className="text-black"
          value={formData.eventName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="when">When:</label>
        <input
          type="date"
          id="when"
          name="when"
          className="text-black"
          value={formData.when}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
