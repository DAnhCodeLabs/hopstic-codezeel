const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="h-12 px-6 flex items-center justify-between text-sm text-gray-500 bg-white">
      <span>© {year} Admin Dashboard</span>

      <span className="text-xs">v1.0.0</span>
    </div>
  );
};

export default Footer;
