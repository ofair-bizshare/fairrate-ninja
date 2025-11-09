import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ofairLogo from '@/assets/ofair-logo.png';
const Footer: React.FC = () => {
  return <footer className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <div className="rounded-full border-4 border-primary p-2">
              <img src={ofairLogo} alt="oFair Logo" className="h-24 w-24 object-contain rounded-full" />
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-col gap-2">
              <p className="font-bold text-primary text-lg">oFair</p>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>קטיף 82, נתיבות</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:0545308505" className="hover:text-primary">050-5577565</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@ofair.co.il" className="hover:text-primary">info@ofair.co.il</a>
              </div>
            </div>
            
            <div className="flex gap-8 mt-4">
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                תנאי שימוש ופרטיות
              </Link>
              <div className="text-muted-foreground hover:text-primary transition-colors">
                <span className="cursor-pointer">צור קשר</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <div className="flex justify-center gap-8 mb-6">
            <a href="https://www.facebook.com/profile.php?id=61573771175534#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/ofair_il?fbclid=IwZXh0bgNhZW0CMTAAAR1Hdq28l9YzB4sHU41YXjS5UYVD_LihmktdeE0cqacfrxkIm1ryJ6_Y3qQ_aem_uZmC0wj1Asq9SbLb9ZLcWg" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 text-white p-3 rounded-full hover:opacity-90 transition-opacity">
              <Instagram className="h-6 w-6" />
            </a>
          </div>
          
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} oFair. כל הזכויות שמורות.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;