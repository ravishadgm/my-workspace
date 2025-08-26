"use client";

import Image from "next/image";
import styles from "./Footer.module.scss";

export default function Footer({
  logo,
  mainLinks = [],
  legalLinks = [],
  logoWidth = 100,
  logoHeight = 25,
  onNavigate, // 👈 injected from host
}) {
  const currentYear = new Date().getFullYear();

  const renderLinks = (links) =>
    links.map((link, index) => (
      <span key={link.href} className={styles.linkWrapper}>
        <a
          href={link.href}
          className={styles.link}
          aria-label={link.label}
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate(link.href);
            }
          }}
        >
          {link.label}
        </a>
        {index < links.length - 1 && (
          <span className={styles.separator} aria-hidden="true">
            |
          </span>
        )}
      </span>
    ));

  return (
    <footer className={styles.footerRoot}>
      <div className={styles.container}>
        {/* Logo */}
        {logo && (
          <div className={styles.logo}>
            <a
              href="/"
              aria-label="Homepage"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("/");
                }
              }}
            >
              <Image
                src={logo}
                alt="Logo"
                width={logoWidth}
                height={logoHeight}
                priority
              />
            </a>
          </div>
        )}

        {/* Main navigation */}
        {mainLinks.length > 0 && (
          <nav className={styles.navLinks} aria-label="Main navigation">
            {renderLinks(mainLinks)}
          </nav>
        )}

        {/* Legal links */}
        {legalLinks.length > 0 && (
          <nav className={styles.footerLinks} aria-label="Legal and support">
            {renderLinks(legalLinks)}
          </nav>
        )}
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <span>© 2024–{currentYear} Company. All rights reserved.</span>
      </div>
    </footer>
  );
}
