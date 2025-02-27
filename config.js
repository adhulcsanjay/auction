const API_URLS = {
    development: 'https://credentialapi.voleergo.com/',
    production: 'https://credentialapi.voleergo.com/',
  };
  // const API_URLS = {
  //   development: 'https://localhost:7260/',
  //   production: 'https://localhost:7260/',
  // };
  
  const getApiUrl = () => {
    const environment = process.env.NODE_ENV || 'development';
    return API_URLS[environment];
  };
  
  export default getApiUrl;

  export const EVENT_CATEGORY = [
    {
      id: 1,
      name: 'Solo',
    },
    {
      id: 2,
      name: 'Group',
    },
  ]

export const STATUS_ENUMS = [
  {id: 0, label: 'Pending', backgroundColor: 'rgb(250, 173, 20)'},
  {id: 1, label: 'Approved', backgroundColor: 'rgb(82, 196, 26)'},
  {id: 2, label: 'Rejected', backgroundColor: 'rgb(255, 77, 79)'}
]

export const REPORT_TYPE = [  
  {id: 'EXCEL', label: 'EXCEL', backgroundColor: 'rgb(82, 196, 26)'},
  {id: 'PDF', label: 'PDF', backgroundColor: 'rgb(255, 77, 79)'}
]

export const REPORTS_NAME = [
  {id: 1, label: 'Credential Report'},
   
]

export const RESULT_STATUS_ENUMS = [
  {id: false, label: 'Pending', backgroundColor: 'rgb(250, 173, 20)'},
  {id: true, label: 'Approved', backgroundColor: 'rgb(82, 196, 26)'}
]

export const RESULT_POSITION_ENUMS = [
  {id: '1', label: 'First', backgroundColor: 'rgb(250, 173, 20)'},
  {id: '2', label: 'Second', backgroundColor: 'rgb(82, 196, 26)'}
]

export const EVENT_CATEGORY_REPORT = [
  {
    id: 0,
    name: 'ALL',
  },
  {
    id: 1,
    name: 'Solo',
  },
  {
    id: 2,
    name: 'Group',
  },
]
