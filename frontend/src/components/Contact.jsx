import React, { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaMailBulk,
} from "react-icons/fa";
import emailjs from "emailjs-com";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    
    emailjs.send(
  "service_9gqian8",   // this is my service ID from emailjs
  "template_zgk1x7s",  // this is my template ID from emailjs
  formData,
  "3nfhdJegav-Il8j34"      // this is my public key from emailjs
)
      .then(
        (result) => {
          console.log("Message sent:", result.text);
          alert("✅ Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
          setIsSending(false);
        },
        (error) => {
          console.error("EmailJS error:", error.text);
          alert("❌ Failed to send message. Please try again later.");
          setIsSending(false);
        }
      );
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Get In Touch</h2>
      <p className="contact-subtext">
        Have a project in mind or want to discuss opportunities? I’d love to hear from you!
      </p>

      <div className="contact-grid">
       
        <div className="glass-card contact-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject of your message"
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="btn btn-gradient full-width"
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Right - Info Cards */}
        <div className="contact-info">
          <div className="glass-card info-card">
            <FaEnvelope className="info-icon" />
            <div className="info-text">
              <h4>Email</h4>
              <p>bnyashwanth2006@gmail.com</p>
            </div>
          </div>

          <div className="glass-card info-card">
            <FaMapMarkerAlt className="info-icon" />
            <div className="info-text">
              <h4>Location</h4>
              <p>Bengaluru, India</p>
            </div>
          </div>

          <div className="glass-card info-card">
            <FaPhone className="info-icon" />
            <div className="info-text">
              <h4>Phone</h4>
              <p>Available on request</p>
            </div>
          </div>

          <div className="glass-card info-card">
            <div className="info-text">
              <h4>Connect with me</h4>
              <div className="social-row">
                <a
                  href="https://github.com/bnyashwanth"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/bn-yashwanth

"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>
                <a href="mailto:bnyashwanth2006@gmail.com">
                  <FaMailBulk />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
