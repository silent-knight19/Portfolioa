import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ContactItem = ({ icon: Icon, label, value, link, copyable = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copyable) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const Content = () => (
    <div 
      className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyber-mint/50 transition-all group cursor-pointer ${copyable ? 'active:scale-95' : ''}`}
      onClick={handleCopy}
    >
      <div className="p-3 rounded-full bg-white/5 text-cyber-mint group-hover:bg-cyber-mint group-hover:text-black transition-colors">
        <Icon size={20} />
      </div>
      <div>
        <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</h4>
        <p className="text-gray-200 font-mono text-sm md:text-base">
          {copied ? <span className="text-cyber-mint">Copied to clipboard!</span> : value}
        </p>
      </div>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      <Content />
    </a>
  ) : (
    <Content />
  );
};

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      // Send email using EmailJS
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
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden py-24">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-mint/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24"
      >
        {/* Left Column: Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              LET'S <span className="text-cyber-mint">CONNECT</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you have a project in mind, a bug to report, or just want to chat about the latest in tech — I'm all ears.
            </p>
          </div>

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

        {/* Right Column: Message Form */}
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyber-mint/20 to-neon-purple/20 rounded-2xl blur opacity-20"></div>
          <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-cyber-mint rounded-full"></span>
              Send a Transmission
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-mint focus:outline-none focus:ring-1 focus:ring-cyber-mint/50 transition-all placeholder-gray-600"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Your Email</label>
                <input 
                  type="email" 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-mint focus:outline-none focus:ring-1 focus:ring-cyber-mint/50 transition-all placeholder-gray-600"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Message</label>
                <textarea 
                  required
                  rows="5"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-mint focus:outline-none focus:ring-1 focus:ring-cyber-mint/50 transition-all placeholder-gray-600 resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || submitted}
                className={`w-full py-4 rounded-lg font-bold tracking-wider flex items-center justify-center gap-2 transition-all ${
                  error
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                    : submitted 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                    : 'bg-white/5 border border-white/10 text-white hover:border-cyber-mint hover:text-cyber-mint hover:bg-cyber-mint/10'
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
  );
}
