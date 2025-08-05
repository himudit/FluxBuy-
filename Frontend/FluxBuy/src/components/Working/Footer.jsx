import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const projectLinks = [
        { label: 'About FluxBuy', href: '#' },
        { label: 'Features', href: '#' },
        { label: 'Docs / Demo', href: '#' },
        { label: 'GitHub Repository', href: 'https://github.com/himudit/FluxBuy' },
        { label: 'Terms & Privacy', href: '/privacy' },
    ];

    const developerLinks = [
        { label: 'Portfolio', href: 'https://himudit.github.io/my-portfolio/' },
        { label: 'GitHub', href: 'https://github.com/himudit' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mudit-garg-03m/' },
        { label: 'Email', href: 'mailto:gargmudit662@gmail.com' },
    ];

    const FooterColumn = ({ title, links }) => (
        <div className="flex flex-col space-y-2">
            <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
            <ul className="space-y-2">
                {links.map((link, index) => (
                    <li key={index}>
                        <a
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-300 hover:text-[#8f7cf6] text-sm transition-colors"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <footer className="bg-[#0D0A19] border-t border-[#1A1A2E]/30 pt-16 pb-8 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Link to="/" className="text-2xl font-bold">
                                <img src='./logoF.jpg' alt="FluxBuy logo" className="w-[3.5rem] h-[3.5rem]" />
                            </Link>
                            <span className="text-white font-bold text-2xl">FluxBuy</span>
                        </div>

                        <p className="text-gray-300 text-sm max-w-sm mt-6">
                            Seamless, secure, and simplified online shopping experience powered by modern tech and reliable payment.
                        </p>
                    </div>

                    {/* Project Column */}
                    <FooterColumn title="Project Links" links={projectLinks} />

                    {/* Developer Column */}
                    <FooterColumn title="Developer Info" links={developerLinks} />
                </div>

                {/* Bottom Section */}
                <div className="mt-16 pt-8 border-t border-[#1A1A2E]/30 text-center text-gray-400 text-sm">
                    © {new Date().getFullYear()} FluxBuy. All rights reserved. <br />
                    Made with ❤️ by Mudit Garg.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
