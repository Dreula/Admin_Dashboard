import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { CgWebsite } from 'react-icons/cg';
import { MdCampaign, MdOutlineVolunteerActivism, MdOutlineMailOutline } from 'react-icons/md';
import { BsKanban} from 'react-icons/bs';
import { IoMdContacts } from 'react-icons/io';

export const EditorData = () => (
  <div>
    <h3>
    PAALALA: Oras ng koleksyon ng basura sa Manuyo Uno-Lopez Compound. Nov. 22, 2022 (Tuesday). 6:00 AM.
    </h3>
  </div>
);
export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'web-posts',
        icon: <CgWebsite />,
      },
    ],
  },

  {
    title: 'Pages',
    links: [
      {
        name: 'campaign',
        icon: <MdCampaign />,
      },
      {
        name: 'residence-Data',
        icon: <IoMdContacts />,
      },
      {
        name: 'received-Emails',
        icon: <MdOutlineMailOutline />,
      },
      {
        name: 'volunteers',
        icon: <MdOutlineVolunteerActivism />,
      },
    ],
  },
  {
    title: 'Apps',
    links: [
      {
        name: 'to-do-list',
        icon: <BsKanban />,
      },
      {
        name: 'editor',
        icon: <FiEdit />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const contextMenuItems = [
  'AutoFit',
  'AutoFitAll',
  'SortAscending',
  'SortDescending',
  'Copy',
  'Edit',
  'Save',
  'Delete',
  'Save',
  'Cancel',
  'PdfExport',
  'ExcelExport',
  'CsvExport',
  'FirstPage',
  'PrevPage',
  'LastPage',
  'NextPage',
];




