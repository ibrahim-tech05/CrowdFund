import React from "react";
import { FaHandHoldingHeart, FaLightbulb, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-white text-[#1a1a2e] px-6 md:px-20 py-12 mt-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-4">About CrowdFund</h1>
          <p className="text-xl mb-8 text-gray-600">
            Empowering dreams, one campaign at a time.
          </p>
        </motion.div>

        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-3xl font-bold text-center mb-8"
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <FaLightbulb className="text-4xl mx-auto mb-4 text-[#1a1a2e]" />
                  ),
                  title: "Discover Campaigns",
                  description:
                    "Explore campaigns that inspire you, from education to environment.",
                },
                {
                  icon: (
                    <FaHandHoldingHeart className="text-4xl mx-auto mb-4 text-[#1a1a2e]" />
                  ),
                  title: "Support a Cause",
                  description:
                    "Contribute to campaigns you believe in. Every donation makes a difference.",
                },
                {
                  icon: (
                    <FaUsers className="text-4xl mx-auto mb-4 text-[#1a1a2e]" />
                  ),
                  title: "Join the Community",
                  description:
                    "Connect with like-minded individuals and create positive change together.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                >
                  {step.icon}
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 text-center">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-3xl font-bold mb-8"
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-gray-600 mb-8"
          >
            Join us today and start supporting campaigns that matter to you.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#1a1a2e] text-white px-8 py-3 rounded-full hover:bg-[#16213e] transition duration-300"
            onClick={() => navigate("/explore")}
          >
            Explore Campaigns
          </motion.button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
