import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="text-center max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold leading-tight"
        >
          Full Stack
          <span className="text-cyan-400"> Developer</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-slate-400 text-lg"
        >
          I build modern and scalable web applications
          using React, NestJS, PostgreSQL, and modern UI systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 flex gap-6 justify-center"
        >
          <button className="px-8 py-3 bg-cyan-500 rounded-lg hover:bg-cyan-600 transition">
            Hire Me
          </button>

          <button className="px-8 py-3 border border-cyan-500 rounded-lg hover:bg-cyan-500/10 transition">
            View Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
