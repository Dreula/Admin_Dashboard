import {React, useEffect} from 'react';
import { Header, Table, UpdateResident, AddResident } from '../components';
import { BiUserPlus } from "react-icons/bi";
import { FaFileExport } from 'react-icons/fa'
import { useResidentContext } from '../hook/useStateContext';
import { useStateContext } from '../contexts/ContextProvider';
import { useAuthContext } from '../hook/useAuthContext';

import { downloadExcel } from "react-export-table-to-excel";

const ResidenceData = () => {
  const { flag, setFlag, visible, setVisible } = useStateContext();
  const { admin } = useAuthContext()

  const {residents, dispatch} = useResidentContext()

  useEffect(() => {
      const fetchResidents = async () => {
        const response = await fetch('/api/resident', {
          headers: {
            'Authorization': `Bearer ${admin.token}`
          }
        })
        const json = await response.json()

        if (response.ok) {
          dispatch({type: 'SET_RESIDENTS', payload: json})
        }
      }

      if (admin) {
        fetchResidents()
      }
  }, [dispatch, admin]);

  const handleAddBtn = () => {
    if(flag === true) {
      setFlag(false)
    }
    setVisible(!visible)
  }

  const header = ["ID","Name","Address","Phone Number", "createdAt", "updatedAt"]

  const handleDownloadExcel = () => {

    downloadExcel({
      fileName: "Resident Data",
      sheet: "Residents",
      tablePayload: {
        header,
        body: residents,
      },
    });
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Residents Data" />
      
      <div className="container mx-auto flex justify-between py-5 border-b">
            <div className="left flex gap-3">
                <button
                  onClick={handleAddBtn} 
                  className='flex bg-blue-500 text-white px-4 py-2 border rounded-md hover:border-blue-600 
                  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                  active:bg-blue-800 active:shadow-lg
                  transition
                  duration-50
                  ease-in-out'>
                  Add Resident  <span className='px-1'><BiUserPlus size={23}></BiUserPlus></span>
                </button>
            </div>
        </div>
        <div className='relative'>
          <button 
              onClick={handleDownloadExcel}
              className='flex border p-2 -top-14 right-0 absolute ease-in-out transition
              duration-50 bg-green-600 rounded-md text-white focus:outline-none focus:ring-0 focus:shadow-lg hover:bg-green-800'>
            Export to Excel <span className='px-1'><FaFileExport size={20}></FaFileExport></span>
          </button>
        </div>
        <div className='block m-5'>
          { visible ? <AddResident /> : <></>}
          { flag ? <UpdateResident /> : <></>}
        </div>
      <div className='block mt-1'>
        <Table residents={residents} />
      </div>
    </div>
  );
};
export default ResidenceData;