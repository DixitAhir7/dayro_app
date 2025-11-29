import React from 'react';
import { NavLink } from 'react-router-dom';
import LanguageSelector from 'utilits/translatefunction/LanguageSelector';
import Theme from 'components/appcom/Theme';
import useSmartTranslate from 'utilits/translatefunction/Translatefunction';
import { Settings, User } from 'lucide-react';

function Userfunctionality({ openSetting, closesetting, referenceDiv }) {

  const useTranslate = useSmartTranslate();

  return (
    <div className="relative">
      <div
        className="ml-1 z-10 cursor-pointer"
        onClick={openSetting}
        ref={closesetting}
      >
        <Settings className="text-2xl" />
      </div>

      <div
        ref={referenceDiv}
        className="absolute top-5 left-0 max-sm:-left-25 max-sm:bg-gray-300 max-sm:rounded-xl md:ml-2 md:mt-4 max-sm:mt-2 origin-top scale-0 opacity-0 z-20 shadow-lg p-2 w-35"
      >
        <Theme />
        <div id="translateDiv" className='flex'>
          <LanguageSelector />
        </div>

        <div className="flex mt-4">
          <User className='text-lg' />
          <NavLink
            className='md:ml-1'
            to="account"
          >
            {useTranslate('profileupdate', 'Edit Profile')}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Userfunctionality);