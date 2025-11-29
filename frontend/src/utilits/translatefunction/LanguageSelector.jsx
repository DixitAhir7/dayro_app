import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// language dropdown in sidebar
export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <>
      <Languages className='text-2xl mt-2' />
      <select
        className='mt-1.5 focus:outline-none'
        onChange={handleLanguageChange}
        value={i18n.language}
      >
        <option value="en">English</option>
        <option value="gu">ગુજરાતી</option>
      </select>
    </>
  );
}
