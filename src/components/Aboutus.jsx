import React from "react";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className="text-3xl font-semibold text-center my-4">About Us</h1>
      
      <section className="about-section p-6">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-lg mt-2">
          We are dedicated to using technology to improve disaster management
          and response efforts. Our platform provides real-time coordination,
          task assignments, and disaster updates to ensure timely and efficient
          action during emergencies.
        </p>
      </section>
      
      <section className="team-section p-6 mt-4">
        <h2 className="text-2xl font-semibold">Our Team</h2>
        <p className="text-lg mt-2">
          Our team is made up of passionate individuals who are committed to
          making a difference. We have experts in software development, data
          analysis, AI, and disaster management.
        </p>
        <ul className="mt-4">
          <li>Shivam Verma - Project Lead</li>
         
        </ul>
      </section>

      <section className="contact-section p-6 mt-4">
        <h2 className="text-2xl font-semibold">Contact Us</h2>
        <p className="text-lg mt-2">
          If you have any questions or would like to learn more about our
          project, feel free to get in touch with us.
        </p>
        <p>Email: Vermamavish12035@gmail.com</p>
        <p>Phone: +91 9219056049</p>
      </section>
    </div>
  );
};

export default AboutUs;

