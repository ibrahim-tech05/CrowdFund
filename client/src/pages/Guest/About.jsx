import React from "react";
import { FaHandHoldingHeart, FaLightbulb, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-white text-[#1a1a2e] px-6 md:px-20 py-12 ">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <h1 className="mb-4 text-5xl font-bold">About CrowdFund</h1>
          <p className="mb-8 text-xl text-gray-600">
            Empowering dreams, one campaign at a time.
          </p>
        </motion.div>

        <div className="py-12 bg-gray-50">
          <div className="container px-4 mx-auto">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mb-8 text-3xl font-bold text-center"
            >
              How It Works
            </motion.h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
                  className="p-6 text-center transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
                >
                  {step.icon}
                  <h3 className="mb-4 text-2xl font-bold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="container px-4 py-16 mx-auto text-center">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8 text-3xl font-bold"
          >
            Ready to Make a Difference?
          </motion.h2>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8 text-gray-600"
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
    </>
  );
};

export default About;
