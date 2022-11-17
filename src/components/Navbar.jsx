import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { BsChatLeft  } from 'react-icons/bs';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Chat, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { useAuthContext } from '../hook/useAuthContext';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
  const { admin } = useAuthContext()

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      {admin && (
      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      )}
      {admin && (
        <div className="flex">
          <NavButton title="Messages" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft  />} />
          <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick('userProfile')}
            >
              <span className='h-8 p-1'>
                <FaUserCircle size={23} color={currentColor} />
              </span>

              <p>
                <span className="text-gray-400 text-14">Hi,</span>{' '}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {admin.email}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </TooltipComponent>
          {isClicked.chat && (<Chat />)}
          {isClicked.userProfile && (<UserProfile />)}
        </div>
      )}
    </div>
  );
};

export default Navbar;