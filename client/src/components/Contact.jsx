import React, { useState } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiCopy, FiCheck, FiSend, FiArrowUp, FiFileText } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const ContactMethod = ({ icon: Icon, label, value, link, isCopyable = false }) => {
  const [copied, setCopied] = useState(false);

  const handleAction = () => {
    if (isCopyable) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cardContent = (
    <div
      onClick={handleAction}
      className={`p-4 rounded-xl bg-[#111317] border border-[#20242c] hover:border-[#2e3542] flex items-center justify-between transition-colors group ${
        isCopyable ? 'cursor-pointer active:scale-[0.99]' : ''
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div className="p-2.5 rounded-lg bg-[#181b22] text-[#9ca3af] group-hover:text-[#f59e0b] transition-colors">
          <Icon size={18} />
        </div>
        <div>
          <div className="text-[11px] font-mono text-[#71717a] mb-0.5">
            {label}
          </div>
          <div className="text-sm font-medium text-[#ededed] group-hover:text-white transition-colors">
            {value}
          </div>
        </div>
      </div>
      {isCopyable && (
        <div className="text-xs font-mono text-[#71717a] group-hover:text-[#ededed] flex items-center gap-1 pl-2">
          {copied ? (
            <span className="text-[#10b981] inline-flex items-center gap-1">
              <FiCheck size={13} /> Copied
            </span>
          ) : (
            <span className="inline-flex items-center gap-1">
              <FiCopy size={13} /> Copy
            </span>
          )}
        </div>
      )}
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      {cardContent}
    </a>
  ) : (
    cardContent
  );
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setTimeout(() => {
        setIsSubmitting(false);
        setStatusMessage({
          type: 'success',
          text: 'Thank you! You can also reach me directly at sachinsinghtomar7749@gmail.com.'
        });
        setFormData({ name: '', email: '', message: '' });
      }, 600);
      return;
    }

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setStatusMessage({ type: 'success', text: 'Message sent successfully! I will reply soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Email error:', err);
      setStatusMessage({
        type: 'error',
        text: 'Failed to send. Please write directly to sachinsinghtomar7749@gmail.com.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section id="contact" className="py-20 border-t border-[#1a1d24] relative">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          
          {/* Header */}
          <div className="mb-12">
            <span className="font-mono text-xs text-[#f59e0b] block mb-2 uppercase tracking-wider">
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#f3f4f6]">
              Get in Touch
            </h2>
            <p className="text-[#9ca3af] text-base mt-2 max-w-xl">
              Feel free to reach out if you have an engineering role, a question, or want to collaborate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Direct Methods */}
            <div className="lg:col-span-5 space-y-3">
              <ContactMethod
                icon={FiMail}
                label="Email"
                value="sachinsinghtomar7749@gmail.com"
                isCopyable
              />
              <ContactMethod
                icon={FiPhone}
                label="Phone"
                value="+91 9523358619"
                isCopyable
              />
              <ContactMethod
                icon={FiLinkedin}
                label="LinkedIn"
                value="linkedin.com/in/sachinsinghdev"
                link="https://www.linkedin.com/in/sachinsinghdev"
              />
              <ContactMethod
                icon={FiGithub}
                label="GitHub"
                value="github.com/silent-knight19"
                link="https://github.com/silent-knight19"
              />
              <ContactMethod
                icon={FiFileText}
                label="Résumé"
                value="View PDF (Google Drive)"
                link="https://drive.google.com/file/d/16Mb5gtcXYeXDg07_rwXUu-YhLQvvx4RH/view?usp=sharing"
              />
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-6 md:p-8 rounded-xl bg-[#111317] border border-[#20242c]">
                <h3 className="text-lg font-semibold text-[#f3f4f6] mb-1">
                  Send a Message
                </h3>
                <p className="text-xs text-[#71717a] font-mono mb-5">
                  I typically respond within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#71717a] mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-[#161920] border border-[#232833] rounded-lg px-3.5 py-2.5 text-sm text-[#ededed] placeholder-[#4b5563] focus:outline-none focus:border-[#f59e0b]/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#71717a] mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full bg-[#161920] border border-[#232833] rounded-lg px-3.5 py-2.5 text-sm text-[#ededed] placeholder-[#4b5563] focus:outline-none focus:border-[#f59e0b]/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#71717a] mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can I help you?"
                      className="w-full bg-[#161920] border border-[#232833] rounded-lg px-3.5 py-2.5 text-sm text-[#ededed] placeholder-[#4b5563] focus:outline-none focus:border-[#f59e0b]/60 transition-colors resize-none"
                    ></textarea>
                  </div>

                  {statusMessage && (
                    <div
                      className={`p-3 rounded-lg text-xs font-mono ${
                        statusMessage.type === 'success'
                          ? 'bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981]'
                          : 'bg-[#ef4444]/10 border border-[#ef4444]/30 text-[#ef4444]'
                      }`}
                    >
                      {statusMessage.text}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] disabled:opacity-50 text-black font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="font-mono text-xs">Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FiSend size={13} />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#181b22] py-8 bg-[#090a0c] text-xs font-mono text-[#71717a]">
        <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span>© 2026 Sachin Singh. Built with React &amp; Tailwind CSS.</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com/silent-knight19"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ededed] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sachinsinghdev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#ededed] transition-colors"
            >
              LinkedIn
            </a>
            <button
              onClick={scrollToTop}
              className="hover:text-[#f59e0b] transition-colors inline-flex items-center gap-1"
            >
              <span>Top</span>
              <FiArrowUp size={12} />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
