import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import { userData } from '@/app/hooks/use-responsive';
import axiosInterceptorInstance from '../../../../../axiosInterceptorInstance';
 
const MENU_OPTIONS = [
  {
    label: 'My Profile',
    route: 'user-profile',
    icon: 'eva:person-fill',
  },
  // {
  //   label: 'Change Password',
  //   route: 'change-password',
  //   icon: 'eva:settings-2-fill',
  // },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
 
  const router = useRouter()
  const userInfo = userData();
  const [currentUser, setCurrentUser] = useState<any>();
  const [open, setOpen] = useState(null);
  const [fkUser,setFkuser]=useState(0);

  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const navigate = (path: string) => {
    router.push(path);
  }

  const handleLogout = () =>{
    window.sessionStorage.clear();
  }
 

  useEffect(() => {
    getUser();
    const profile=sessionStorage.getItem('session');
    
    console.log("profile", profile)
    if(profile){
      const profileUser=JSON.parse(profile);
      setFkuser(profileUser.response.fK_UserRole)
    }
	}, []);

  const getUser = async () => {
    try {
      const loginData: any = sessionStorage.getItem('session');
      const userId = JSON.parse(loginData).response?.iD_Users;;
      console.log("userid",userId)
      const data = loginData.firstName
      console.log("data",data)
      
      // const response = await axiosInterceptorInstance.get(`/v1/signup?id_Users=${userInfo?.iD_Users}&createdBy=1`); 
      // if(response?.data){
      //   const result = response.data.result[0];
      //   console.log("result",response.data.result[0])
      //   setCurrentUser(result);
      setCurrentUser(data)
      }
     catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: "skyblue",
          "&:hover": {
            background: "skyblue", 
          },
          
        }}
      >
        {
          currentUser&&
            <Avatar
            src={''}
            alt={currentUser?.firstName}
            sx={{
              width: 36,
              height: 36,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          >
            {currentUser?.firstName.charAt(0).toUpperCase()}
          </Avatar>
        }
        
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          
        <Typography variant="subtitle2" noWrap>
            {currentUser?.firstName} {currentUser?.lastName}
          </Typography>
          
        </Box>

        <Divider sx={{ borderStyle: 'solid' }} />
          
        {(fkUser==1 )&&  
        MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={() => {handleClose(); navigate(option.route)}} sx={{ typography: 'body2', py: 1.2}}>
            {option.label}
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'solid', m: '0 !important' }} />
       

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={ () => { handleClose(); handleLogout(); navigate('/auth/login') }}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
