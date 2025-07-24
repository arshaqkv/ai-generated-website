// utils/extractSections.js
export const extractSectionsFromPrompt = (prompt) => {
  const sections = [
    "title",
    "header",
    "navbar",
    "hero",
    "about",
    "services",
    "features",
    "portfolio",
    "projects",
    "team",
    "pricing",
    "faq",
    "testimonials",
    "blog",
    "contact",
    "footer",
  ];

  return sections.filter((section) => prompt.toLowerCase().includes(section));
};
