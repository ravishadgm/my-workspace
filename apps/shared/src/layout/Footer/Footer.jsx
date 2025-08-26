"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.scss";

export default function Footer({
  logo,
  mainLinks = [],
  legalLinks = [],
  logoWidth = 100,
  logoHeight = 25,
}) {
  const currentYear = new Date().getFullYear();

  const renderLinks = (links) =>
    links.map((link, index) => (
      <span key={link.href} className={styles.linkWrapper}>
        <Link href={link.href} className={styles.link}>
          {link.label}
        </Link>
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
            <Link href="/" aria-label="Homepage">
              <Image
                src={logo}
                alt="Logo"
                width={logoWidth}
                height={logoHeight}
              />
            </Link>
          </div>
        )}

        {/* Main Navigation */}
        {mainLinks.length > 0 && (
          <div className={styles.navLinks} aria-label="Main navigation">
            {renderLinks(mainLinks)}
          </div>
        )}

        {/* Legal & Support */}
        {legalLinks.length > 0 && (
          <div className={styles.footerLinks} aria-label="Legal and support">
            {renderLinks(legalLinks)}
          </div>
        )}
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <span
          aria-label={`Copyright ${currentYear} Company. All rights reserved.`}
        >
          © 2024–{currentYear} Company. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
