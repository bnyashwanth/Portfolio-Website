import { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const emailData = {
      ...formData,
      subject: 'Portfolio Contact Form Message',
    };

    emailjs
      .send(
        'service_9gqian8',
        'template_zgk1x7s',
        emailData,
        '3nfhdJegav-Il8j34'
      )
      .then(
        (result) => {
          console.log('Message sent:', result.text);
          alert('✅ Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
          setIsSending(false);
        },
        (error) => {
          console.error('EmailJS error:', error.text);
          alert('❌ Failed to send message. Please try again later.');
          setIsSending(false);
        }
      );
  };

  return (
    <section id="contact" className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <div data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-text-muted text-center mb-12 md:mb-16 text-lg">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div
            className="bg-white/80 dark:bg-gray-900/60
 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800/50 shadow-sm hover:shadow-lg hover:border-purple-500/30 transition-all duration-300"
            data-aos="fade-right"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-text-primary mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-gray-200 dark:border-gray-700 text-text-primary placeholder-text-muted focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-text-primary mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-gray-200 dark:border-gray-700 text-text-primary placeholder-text-muted focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-text-primary mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-white/10 dark:border-gray-700 text-text-primary placeholder-text-muted focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30 transform hover:scale-[1.02]"
              >
                {isSending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-6" data-aos="fade-left">
            <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800/50 shadow-sm hover:shadow-lg hover:border-purple-500/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-text-primary mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-text-muted text-sm mb-1 uppercase tracking-wider font-semibold">Email</p>
                  <a
                    href="mailto:bnyashwanth2006@gmail.com"
                    className="text-text-primary hover:text-purple-500 transition-colors text-lg"
                  >
                    bnyashwanth2006@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-text-muted text-sm mb-1 uppercase tracking-wider font-semibold">Location</p>
                  <p className="text-text-primary text-lg">Bengaluru, India</p>
                </div>
              </div>
            </div>

            <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800/50 shadow-sm hover:shadow-lg hover:border-purple-500/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-text-primary mb-6">Connect with me</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/bnyashwanth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-background/50 border border-gray-200 dark:border-gray-700 text-text-muted hover:text-text-primary hover:border-purple-500 transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-2xl" />
                </a>
                <a
                  href="https://www.linkedin.com/in/bn-yashwanth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-background/50 border border-gray-200 dark:border-gray-700 text-text-muted hover:text-text-primary hover:border-purple-500 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
                <a
                  href="mailto:bnyashwanth2006@gmail.com"
                  className="w-12 h-12 flex items-center justify-center rounded-xl bg-background/50 border border-gray-200 dark:border-gray-700 text-text-muted hover:text-text-primary hover:border-purple-500 transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <FaEnvelope className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
