import { Globe } from "lucide-react";

const Footer = ({ filters }) => (
  <footer
    className={`bg-gray-100 border-t border-gray-200 pb-15 lg:pb-0 ${
      filters ? "mt-0" : "mt-16"
    }`}
  >
    <div
      className={`px-4 sm:px-6 lg:px-8 py-8 ${
        filters ? "max-w-screen-xl mx-auto" : "max-w-9xl mx-auto container"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                AirCover
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Anti-discrimination
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Disability support
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:underline">
                Airbnb your home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                AirCover for Hosts
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Hosting resources
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Community forum
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Airbnb</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:underline">
                Newsroom
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                New features
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Investors
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">© 2025 Airbnb, Inc.</p>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <Globe size={16} className="text-gray-600" />
          <span className="text-sm text-gray-600">English (US)</span>
          <span className="text-sm text-gray-600">$ USD</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
