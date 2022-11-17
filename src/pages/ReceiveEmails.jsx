import {React, useEffect, useState} from 'react';

import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { emailsGrid } from '../data/grid';
import { Header } from '../components';

const ReceiveEmails = () => {
  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: true, allowEditing: false, allowAdding: false, showDeleteConfirmDialog: true };


  const [emails, setEmails] = useState(null)

  useEffect(() => {
    let isMounted = true;
      const fetchEmails = async () => {
        const response = await fetch('/api/email')
        const json = await response.json()

        if (response.ok) {
          if(isMounted){
            setEmails(json)
          }
        }
      }

      fetchEmails()
      return () => { isMounted = false }
  }, [])


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Received Emails" />
      <GridComponent
        dataSource={emails}
        enableHover={true}
        width="auto"
        height='auto'
        allowPaging
        pageSettings={{ pageCount: 5 }}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        allowTextWrap={true}
        rowHeight={50}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {emailsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default ReceiveEmails;