import Icon from "@mui/material/Icon";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


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


const navConfig = [
    // {
    //     title: 'Dashboard',
    //     path: '/user/dashboard',
    //     icon: icon('dashboard'),
    // },
    // {
    //     title: 'Event Registration',
    //     path: '/user/register-event',
    //     icon: icon('event'),
    // },
    // {
    //     title: 'Credential Registration',
    //     path: '/admin/cred-register',
    //     icon: icon('event'),
    // },
    {
        title: 'Credential List',
        path: '/admin/cred-list',
        icon: icon('group'),
    },
    // {
    //     title: 'User Registration',
    //     path: '/admin/userregister',
    //     icon: icon('emoji_events'),
    // },
    // {
    //     title: 'Register For Rally',
    //     path: 'rally',
    //     icon: icon('run_circle'),
    // },
    // {
    //     title: 'Participants',
    //     path: '/admin/event-participants',
    //     icon: icon('group'),
    // },
    // {
    //     title: 'Announcements',
    //     path: '/admin/announcements',
    //     icon: icon('campaign'),
    // },
    // {
    //     title: 'Results',
    //     path: '/admin/results',
    //     icon: icon('emoji_events'),
    // },
    // {
    //     title: 'General Rules',
    //     path: '/admin/rules',
    //     icon: icon('settings_accessibility'),
    // },
    {
        title: 'Reports',
        path: '/admin/reports',
        icon: icon('analytics'),
    },
    // {
    //     title: 'Add Events',
    //     path: '/admin/addevent',
    //     icon: icon('format_list_bulleted'),
    
    // },
    // {
    //     title: 'Event Fee',
    //     path: '/admin/eventfee',
    //     icon: <CurrencyRupeeIcon/>,
    // },
    // {
    //     title: 'Events',
    //     path: '/admin/events',
    //     icon: icon('festival'),
    // },
   
    // {
    //     title: 'Results',
    //     path: '/admin/results',
    //     icon: icon('emoji_events'),
    // },
    // {
    //     title: 'Results Approval',
    //     path: '/admin/results-approval',
    //     icon: icon('verified'),
    // }
    
    
];

export default navConfig;
