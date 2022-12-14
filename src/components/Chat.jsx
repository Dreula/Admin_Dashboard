import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { FaFacebookMessenger } from 'react-icons/fa'
import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from 'react-router-dom';

const Chat = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] shadow-md p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
        <FaFacebookMessenger size={30} color={"rgb(23,169,253)"} />
          <p className="font-semibold text-lg dark:text-gray-200">Messages </p>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="mt-5 ">
        <span className='text-medium text-justify dark:text-gray-200' >To view messages go to <br />Manuyo Uno's facebook page inbox. </span>
        
        <div className="mt-5">
          <a onClick={() => window.open("https://bit.ly/3Ax1qua", "_blank")}>
            <Button
              color="white"
              bgColor={currentColor}
              text="Facebook Page Inbox"
              borderRadius="10px"
              width="full"
            />
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default Chat;