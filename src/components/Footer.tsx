import { version } from "../../package.json";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white text-center p-4">
      <p>Current version: v{version}</p>
    </footer>
  );
};

export default Footer;
