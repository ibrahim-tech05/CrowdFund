import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../../components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ContactUs = () => {
  return (
    <>
      <div className="min-h-screen bg-white text-[#1a1a2e] px-6 md:px-20 py-12 mt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl mb-8 text-gray-600">
            We’re here to help! Get in touch with CrowdFund Support.
          </p>
        </motion.div>

        <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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
              className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {contact.icon}
              <h3 className="text-2xl font-bold mb-4">{contact.title}</h3>
              <p className="text-gray-600">{contact.info}</p>
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 py-16 text-center">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-3xl font-bold mb-8"
          >
            Send Us a Message
          </motion.h2>
          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1a1a2e] text-white px-8 py-3 rounded-full hover:bg-[#16213e] transition duration-300"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
