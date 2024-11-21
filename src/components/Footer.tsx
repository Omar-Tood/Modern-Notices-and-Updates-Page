import React from 'react';
import { Mail, Phone, Info } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a href="mailto:contact@example.com" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                <Mail className="w-5 h-5 mr-2" />
                omarTood@gmail.com
              </a>
              <a href="tel:+1234567890" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                <Phone className="w-5 h-5 mr-2" />
                (+252) 617014906
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
            <p className="text-gray-600">
              Stay updated with our latest news, announcements, and events. Subscribe to our newsletter for regular updates.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Notice Board. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}