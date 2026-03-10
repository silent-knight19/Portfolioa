/**
 * Contact.jsx
 * =============
 * Role: Contact section with info cards and a message form, plus a site footer.
 *
 * How it works:
 * - Left side: contact items (GitHub, LinkedIn, Email, Phone) with copy-to-clipboard
 * - Right side: a message form powered by EmailJS (sends emails directly from the browser)
 * - Bottom: a footer with copyright, "Built with React" tag, and social links
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaPaperPlane, FaHeart } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

/**
 * ContactItem component
 * =====================
 * A single contact info card. Can be:
 * - A clickable link (opens in new tab) for GitHub/LinkedIn
 * - A copyable text (copies to clipboard on click) for Email/Phone
 */
const ContactItem = ({ icon: Icon, label, value, link, copyable = false }) => {
  // Track whether we just copied the text (to show "Copied!" feedback)
  const [copied, setCopied] = useState(false);

  // Copy the value to clipboard when clicked
  const handleCopy = () => {
    if (copyable) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);  // Reset after 2 seconds
    }
  };

  // The inner content (shared between link and non-link versions)
  const Content = () => (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-mint/50 transition-all group cursor-pointer hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(0,255,157,0.05)] ${copyable ? 'active:scale-95' : ''}`}
      onClick={handleCopy}
    >
      {/* Icon circle */}
      <div className="p-3 rounded-full bg-white/5 text-cyber-mint group-hover:bg-cyber-mint group-hover:text-black transition-colors">
        <Icon size={20} />
      </div>
      <div>
        {/* Label (e.g. "GitHub", "Email") */}
        <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</h4>
        {/* Value (or "Copied!" feedback) */}
        <p className="text-gray-200 font-mono text-sm md:text-base">
          {copied ? <span className="text-cyber-mint">Copied to clipboard!</span> : value}
        </p>
      </div>
    </div>
  );

  // If there's a link, wrap the content in an <a> tag
  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <Content />
    </a>
  ) : (
    <Content />
  );
};

export default function Contact() {
  // Form state for the message form
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  /**
   * handleSubmit
   * ============
   * Sends the form data via EmailJS.
   * EmailJS sends an email directly from the browser without needing a backend.
   * The service ID, template ID, and public key come from environment variables.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formState.name,
          email: formState.email,
          message: formState.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error('Failed to send email:', err);
      setError(true);
      setTimeout(() => setError(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="contact" className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden py-24">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-mint/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24"
        >
          {/* ======= Left Column: Contact Info ======= */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                LET'S <span className="text-cyber-mint text-glow-mint">CONNECT</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Whether you have a project in mind, a bug to report, or just want to chat about the latest in tech — I'm all ears.
              </p>
            </div>

            {/* Contact info cards */}
            <div className="grid grid-cols-1 gap-4">
              <ContactItem
                icon={FaGithub}
                label="GitHub"
                value="github.com/silent-knight19"
                link="https://github.com/silent-knight19"
              />
              <ContactItem
                icon={FaLinkedin}
                label="LinkedIn"
                value="linkedin.com/in/sachinsinghdev"
                link="https://www.linkedin.com/in/sachinsinghdev"
              />
              <ContactItem
                icon={FaEnvelope}
                label="Email"
                value="sachinsinghtomar7749@gmail.com"
                link="mailto:sachinsinghtomar7749@gmail.com"
                copyable
              />
              <ContactItem
                icon={FaPhone}
                label="Phone"
                value="+91 9523358619"
                copyable
              />
            </div>
          </div>

          {/* ======= Right Column: Message Form ======= */}
          <div className="relative">
            {/* Gradient glow behind the form */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyber-mint/20 to-neon-purple/20 rounded-2xl blur opacity-20"></div>

            <div className="relative glass-card p-8 md:p-10 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-cyber-mint rounded-full"></span>
                Send a Transmission
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name input */}
                <div className="group">
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-cyber-mint transition-colors">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-mint focus:outline-none focus:ring-1 focus:ring-cyber-mint/50 transition-all placeholder-gray-600 hover:border-white/20"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email input */}
                <div className="group">
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-cyber-mint transition-colors">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-mint focus:outline-none focus:ring-1 focus:ring-cyber-mint/50 transition-all placeholder-gray-600 hover:border-white/20"
                    placeholder="name@example.com"
                  />
                </div>

                {/* Message textarea */}
                <div className="group">
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2 group-focus-within:text-cyber-mint transition-colors">
                    Message
                  </label>
                  <textarea
                    required
                    rows="5"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-mint focus:outline-none focus:ring-1 focus:ring-cyber-mint/50 transition-all placeholder-gray-600 resize-none hover:border-white/20"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                {/* Submit button with different states */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`w-full py-4 rounded-lg font-bold tracking-wider flex items-center justify-center gap-2 transition-all ${
                    error
                      ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                      : submitted
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : 'bg-white/5 border border-white/10 text-white hover:border-cyber-mint hover:text-cyber-mint hover:bg-cyber-mint/10 hover:shadow-[0_0_20px_rgba(0,255,157,0.1)]'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : error ? (
                    <span>Failed to send. Try again.</span>
                  ) : submitted ? (
                    <span>Message Sent!</span>
                  ) : (
                    <>
                      Send Message <FaPaperPlane size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer className="border-t border-white/5 py-8 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright and "Built with" tag */}
          <p className="text-gray-500 text-sm font-mono">
            © 2025 Sachin Singh. Built with{' '}
            <span className="text-neon-blue">React</span> +{' '}
            <FaHeart className="inline text-red-500 mx-1" size={12} />
          </p>

          {/* Social links in the footer */}
          <div className="flex gap-6">
            <a href="https://github.com/silent-knight19" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <FaGithub size={18} />
            </a>
            <a href="https://www.linkedin.com/in/sachinsinghdev" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <FaLinkedin size={18} />
            </a>
            <a href="mailto:sachinsinghtomar7749@gmail.com" className="text-gray-500 hover:text-white transition-colors">
              <FaEnvelope size={18} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
