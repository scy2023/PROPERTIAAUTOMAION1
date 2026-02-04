const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-4 text-[11px] text-slate-400 flex flex-col md:flex-row md:justify-between gap-2">
        <p>© {year} Propertia Automation</p>
        <p>Built with Next.js, TypeScript & AI‑ready APIs</p>
      </div>
    </footer>
  );
};

export default Footer;
