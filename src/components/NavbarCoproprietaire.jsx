import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft , BsFillKeyFill } from 'react-icons/bs';
import { RiNotification3Line, RiHammerLine } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import ChatSyndicComponent from './ChatSyndicComponent';
import NotificationCoproprietaireComponent from './NotificationCoproprietaireComponent';
import TravauxCoproprietaireComponent from './TravauxCoproprietaireComponent';


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

const NavbarCoproprietaire= ({firstname,lastname,email,userType,phoneNumber,image,idCoproperty,id_user}) => {
 
    const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();
    const imageUrl = `http://localhost:8000${image}`;
  
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
  
        <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
        <div className="flex">
          <NavButton title="Works" customFunc={() => handleClick('travaux')} color={currentColor} icon={<RiHammerLine />} />
          <NavButton title="Chat"  customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
          <NavButton title="Notifications" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
          
          <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick('userProfile')}
            >
              <img
                className="rounded-full w-8 h-8"
                src={imageUrl}
                alt="user-profile"
              />
              <p>
                <span className="text-gray-400 text-14">Hi,</span>{' '}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {firstname} {lastname}
                </span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14" />
            </div>
          </TooltipComponent>
          <NavButton
          title="Logout"
          customFunc={() => {
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("id");
            localStorage.removeItem("type");
            const logoutURL = "http://localhost:3000/login"; 
            const newWindow = window.open(logoutURL, "_blank"); 
            window.location.reload(true);
            window.close();
          }}
          color={currentColor}
          icon={<BsFillKeyFill />}
        />
          {isClicked.travaux && (<TravauxCoproprietaireComponent idCoproperty={idCoproperty}/>)}
          {isClicked.chat && (<ChatSyndicComponent  id_user={id_user}/>)}
          {isClicked.notification && (<NotificationCoproprietaireComponent  idCoproperty={idCoproperty}/>)}
          {isClicked.userProfile && ( <UserProfile firstname={firstname} lastname={lastname} email={email} userType={userType} phoneNumber={phoneNumber} imageUrl={imageUrl} id_user={id_user}/>)}
        </div>
      </div>
    );
};

export default NavbarCoproprietaire;
