import Icon from "@mui/material/Icon";

export const HEADER = {
    H_MOBILE: 60,
    H_DESKTOP:60,
    H_DESKTOP_OFFSET: 60 - 16,
};

export const NAV = {
    WIDTH: 240,
};

const icon = (name: any) => (
    <Icon style={{fontSize: "20px"}}>{name}</Icon>
);
const navUserConfig = [
    {
        title: 'Credential Registration',
        path: '/user/dashboard',
        icon: icon('event'),
    },
    
    // {
    //     title: 'Register For Rally',
    //     path: 'rally',
    //     icon: icon('run_circle'),
    // },
   
    
];


export default navUserConfig;
