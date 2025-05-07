"use client";

import React from "react";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our App</h1>
          <p className="hero-description">
            Your business, streamlined. Track deliveries, manage inventory, and
            more.
          </p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <h2 className="feature-title">Feature 1</h2>
          <p className="feature-description">
            Manage your orders effortlessly with real-time tracking.
          </p>
        </div>
        <div className="feature">
          <h2 className="feature-title">Feature 2</h2>
          <p className="feature-description">
            Analyze business performance with detailed reports.
          </p>
        </div>
        <div className="feature">
          <h2 className="feature-title">Feature 3</h2>
          <p className="feature-description">
            Connect with your suppliers for faster restocking.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial">
          <p className="testimonial-text">
            "This app transformed how we manage our inventory and deliveries.
            Highly recommend!"
          </p>
          <p className="testimonial-author">- John Doe, CEO</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Our Business App. All Rights Reserved.</p>
      </footer>

      {/* Styles */}
      <style jsx>{`
        /* General styles */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f7fa;
        }

        /* Hero Section */
        .hero {
          background-color: #0070f3;
          color: white;
          padding: 60px 20px;
          text-align: center;
        }

        .hero-title {
          font-size: 3rem;
          margin-bottom: 10px;
        }

        .hero-description {
          font-size: 1.25rem;
          margin-bottom: 20px;
        }

        .cta-button {
          background-color: white;
          color: #0070f3;
          border: none;
          padding: 10px 20px;
          font-size: 1rem;
          cursor: pointer;
          border-radius: 5px;
        }

        .cta-button:hover {
          background-color: #e1e1e1;
        }

        /* Features Section */
        .features {
          display: flex;
          justify-content: space-around;
          margin: 50px 0;
          padding: 0 20px;
        }

        .feature {
          width: 30%;
          text-align: center;
        }

        .feature-title {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .feature-description {
          font-size: 1rem;
        }

        /* Testimonials Section */
        .testimonials {
          background-color: #f0f0f0;
          padding: 40px 20px;
          text-align: center;
        }

        .testimonial {
          font-size: 1.2rem;
          margin-bottom: 20px;
        }

        .testimonial-text {
          font-style: italic;
          margin-bottom: 10px;
        }

        .testimonial-author {
          font-weight: bold;
        }

        /* Footer */
        .footer {
          background-color: #333;
          color: white;
          text-align: center;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
