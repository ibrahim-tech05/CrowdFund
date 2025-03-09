import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { sendContactMessage } from "../../api/contact";
import CircleLoader from "../../components/CircleLoader";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendContactMessage(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white text-[#1a1a2e] px-6 md:px-20 py-12 ">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <h1 className="mb-4 text-5xl font-bold">Contact Us</h1>
          <p className="mb-8 text-xl text-gray-600">
            We’re here to help! Get in touch with CrowdFund Support.
          </p>
        </motion.div>

        <div className="container grid grid-cols-1 gap-8 px-4 py-12 mx-auto text-center md:grid-cols-3">
          {[
            {
              icon: (
                <FaPhone className="text-4xl mx-auto mb-4 text-[#1a1a2e]" />
              ),
              title: "Call Us",
              info: "+123 456 7890",
            },
            {
              icon: (
                <FaEnvelope className="text-4xl mx-auto mb-4 text-[#1a1a2e]" />
              ),
              title: "Email Us",
              info: "support@crowdfund.com",
            },
            {
              icon: (
                <FaMapMarkerAlt className="text-4xl mx-auto mb-4 text-[#1a1a2e]" />
              ),
              title: "Visit Us",
              info: "123 CrowdFund St, Innovation City",
            },
          ].map((contact, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="p-6 transition-shadow duration-300 rounded-lg shadow-lg bg-gray-50 hover:shadow-xl"
            >
              {contact.icon}
              <h3 className="mb-4 text-2xl font-bold">{contact.title}</h3>
              <p className="text-gray-600">{contact.info}</p>
            </motion.div>
          ))}
        </div>

        <div className="container px-4 py-16 mx-auto text-center">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8 text-3xl font-bold"
          >
            Send Us a Message
          </motion.h2>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-2xl p-8 mx-auto rounded-lg shadow-lg bg-gray-50"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
              required
            />
            <textarea
              rows="4"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none"
              required
            ></textarea>
            {error && <p className="mb-4 text-red-500">{error}</p>}
            {success && (
              <p className="mb-4 text-green-500">
                Message sent successfully!
              </p>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1a1a2e] text-white px-8 py-3 rounded-full hover:bg-[#16213e] transition duration-300"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <CircleLoader /> : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;