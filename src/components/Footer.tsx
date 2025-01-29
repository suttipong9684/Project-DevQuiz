const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-blue-950  text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {currentYear} Your Company Name. All Rights Reserved.
          </p>
          <p className="text-xs mt-1 text-gray-400">
            Built with ❤️ using React and Tailwind CSS.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  