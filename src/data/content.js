/**
 * Centralized Content & Configuration for the Romantic Experience
 * Streamlined to 4 core sections: Hero, Edits, Love Letter, and Final Message.
 */

export const siteConfig = {
  // Recipient details
  recipientName: "Bhoomi",
  heroHeading: "for my favorite person ♡",
  heroSubtitle: "A little corner of the internet made just for you.",
  heroCta: "Come inside ♡",

  // Navigation Links - strictly Home | Edits | Letter
  navLinks: [
    { name: "Home", href: "#hero" },
    { name: "Edits", href: "#edits" },
    { name: "Letter", href: "#love-letter" },
  ],

  // 2. EDITS SECTION (3 visual cards with cartoon thumbnails and minimal emoji tags)
  editsSection: {
    tag: "FOR YOUR EYES ONLY",
    heading: "our little edits 🎬",
    subtitle: "Three little pieces of us, made with love.",
    edits: [
      {
        id: 1,
        label: "EDIT 01 ♡ 🦋",
        video: "/videos/edit1.mp4",
        thumbnail: "/images/edit1.jpg",
        floatingEmoji: "🦋",
      },
      {
        id: 2,
        label: "EDIT 02 ♡ 🌷",
        video: "/videos/edit2.mp4",
        thumbnail: "/images/edit2.jpg",
        floatingEmoji: "🌷",
      },
      {
        id: 3,
        label: "EDIT 03 ♡ 🧸",
        video: "/videos/edit3.mp4",
        thumbnail: "/images/edit3.jpg",
        floatingEmoji: "🧸",
      }
    ]
  },

  // 3. LOVE LETTER SECTION (Properly romantic, genuine, heartfelt letter)
  loveLetterSection: {
    tag: "A PRIVATE NOTE",
    heading: "a little piece of my heart ♡",
    subheading: "for the girl I want beside me through it all...",
    envelopeTitle: "a little letter for you ♡",
    envelopeSubtitle: "open when you're ready...",
    salutation: "My love,",
    closeButtonText: "close letter ♡",
    signature: "— yours, always",
  },

  // 4. Final Section
  finalSection: {
    heading: "our story is only getting started.",
    revealedHeading: "And I'm excited for every chapter with you. ♡",
    footerNote: "made with a little code & a lot of love."
  }
};
