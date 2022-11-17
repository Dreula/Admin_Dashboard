
export const emailsGrid = [
    //{ type: 'checkbox', width: '50' },
    {
      field: '_id',
      isPrimaryKey: 'true',
      visible: false,
    },
    { 
      field: 'name',
      headerText: 'Name',
      width: '110',
      textAlign: 'Left' },
    {
      field: 'email',
      headerText: 'Email',
      width: '160',
      textAlign: 'Left' },
    { 
      field: 'phone',
      headerText: 'Phone',
      width: '100',
      textAlign: 'Left' },
    // { 
    //   field: 'date',
    //   headerText: 'Date',
    //   width: '100',
    //   textAlign: 'Left' },
    { 
      field: 'message',
      headerText: 'Message',
      width: '400',
      textAlign: 'Left' },
  ];

export const residencedataGrid = [
    { type: 'checkbox',
      width: '50',
    },
    {
      field: '_id',
      isPrimaryKey: true,
      headerText: 'Id',
      visible: false,
    },
    { field: 'name',
      headerText: 'Name',
      width: '150',
      textAlign: 'Left',
    },
    { 
      field: 'address',
      headerText: 'Address',
      width: '200',
      textAlign: 'Left', 
    },
    { field: 'phone',
      headerText: 'Contact Number',
      width: '150',
      textAlign: 'Left' 
    },
  ];

  export const volunteersGrid = [
    //{ type: 'checkbox', width: '50' },
    {
      field: '_id',
      isPrimaryKey: 'true',
      visible: false,
    },
    { 
      field: 'name',
      headerText: 'Name',
      width: '110',
      textAlign: 'Left' },
    { 
        field: 'age',
        headerText: 'Age',
        width: '80',
        textAlign: 'Left' },
    {
      field: 'address',
      headerText: 'Address',
      width: '160',
      textAlign: 'Left' },
    
    { 
      field: 'contact',
      headerText: 'Contact Information',
      width: '150',
      textAlign: 'Left' },
  ];

  