'use client'
import { usePathname, useRouter } from 'next/navigation';
import { useResponsive, userData } from '../../hooks/use-responsive';
import { useEffect, useState } from 'react';
import { Box, Drawer, ListItemButton, Stack, Typography, alpha } from '@mui/material';
import navConfig, { NAV } from '../config-layout';
import navUserConfig from '../config-user-layout';
import Link from 'next/link';
import progressiveTechiesLogo from '../../../public/img/progressivetechies.png'
import voleegroLogo from '../../../public/img/voleegro-logo.svg'
import Image from 'next/image';
import * as CryptoJS from 'crypto-js';
import '../../../public/css/login.css'
import Logo from '../../../public/img/Credential-Logoooo.svg';
import LogoutIcon from '@mui/icons-material/Logout';
export default function Nav({ openNav, onCloseNav }: any) {
    const pathname = usePathname();
    const key = CryptoJS.enc.Utf8.parse('DHJKHJKLMNOMGSTRPROKMEGISX345VLG');
    const iv = CryptoJS.enc.Utf8.parse('ZPDHJKHJKLMOPVLG');

    const upLg = useResponsive('up', 'lg');
    const userInfo = userData();
    const [userRole, setUserRole] = useState(0);
    const [isuser, setIsuser] = useState<number>(0)
    const [open, setOpen] = useState(null);
    const router = useRouter()


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
        const isUserExist: any | null = sessionStorage.getItem('session')
        if (isUserExist) {
            const user: any = JSON.parse(isUserExist)
            setIsuser(user.response.isUserExist)
        }
        if (openNav) {
            onCloseNav();
        }
        decryptUsingAES256(userInfo?.fK_UserRoleStr)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    useEffect(() => {
        if (isuser !== undefined) {
            // Perform side effects related to isuser change
            // You might want to refresh or trigger some additional logic based on isuser change
            console.log('isUserExist changed:', isuser);
            // You can update anything you need here
        }
    }, [isuser]);







    const decryptUsingAES256 = async (decString: string) => {
        var decrypted = CryptoJS.AES.decrypt(decString, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        setUserRole(Number(decrypted.toString(CryptoJS.enc.Utf8)))
    }

    const filteredMenuItems = navUserConfig.filter(item => {
        // if (item.title === "Event Registration" && (isuser === 0)) {
        //     return false;
        // }
        return true;
    });

    const renderLogo = (
        <Box
            component="div"
            sx={{
                mt: 3,
                mb: 3,
            }}
        >
            {/* <p className='font-medium'>Tarang</p> */}
            <Link href='/auth/register'  className='eve-logo'>
                <Image  style={{ width: '7rem' }}
                    src={Logo}
                    alt="EventSphere"
                />
            </Link>
        </Box>
    );

    const renderMenu = (
        <Stack component="nav" spacing={0.5} sx={{ px: 2, mb: 2 }}>
            {
                userRole === 1 ?
                    navConfig.map((item: any) => (
                        <NavItem key={item.title} item={item} />
                    )) :
                    filteredMenuItems.map((item: any) => (
                        <NavItem key={item.title} item={item} />
                    ))

            }
        </Stack>
    );

    const renderPowerdBy = (
        <Box
            component="div"
            sx={{
                mt: 0,
                mb: 2,
                ml: 4,
                mr: 4
            }}
        >
            {/* <p className='text-xs mb-2 text-slate-500'>Powered By</p>
            <a href='https://progressivetechies.org/' target='_blank'>
                <Image width={90}
                    src={progressiveTechiesLogo}
                    alt="Progressive Techies"
                />
            </a> */}

        </Box>
    )

    const renderDevelopedBy = (
        <Box
            component="div"
            sx={{
                mt: 1,
                mb: 3,
                ml: 4,
                mr: 4
            }}
        >
            <p className='text-xs mb-2 text-slate-500'>Developed By</p>
            <a href='https://voleergo.com/' target='_blank'>
                <Image width={80}
                    src={voleegroLogo}
                    alt="Voleegro"
                />
            </a>
        </Box>
    )

    const logout = (
        <Box>
            <Stack component="nav" spacing={0.5} sx={{ px: 2, mb: 2 }}>
            <ListItemButton
        
            component="div"
            sx={{
                border:'1px solid var(--primary)',
                minHeight: 44,
                borderRadius: 0.75,
                typography: 'body2',
                // color: 'var(--primary)',
                backgroundColor: 'var(--primary)',
                color: 'white',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightMedium',
               
                '&:hover': {
                    color: 'var(--primary)',
                },
               
               
            }}
          onClick={ () => { handleClose(); handleLogout(); navigate('/auth/login') }}
        >
        <LogoutIcon sx={{mr:1}}/>
          Logout
        </ListItemButton>
        </Stack>
        </Box>
    )

    const renderContent = (
        <>
            {renderLogo}
            {renderMenu}
            <Box sx={{ flexGrow: 1 }} />
            {logout}
            {renderPowerdBy}
            {renderDevelopedBy}
        </>
    );


    return (
        <>
            <Box
                sx={{
                    flexShrink: { lg: 0 },
                    width: { lg: NAV.WIDTH },
                }}
            >
                {upLg ? (
                    <Box
                        sx={{
                            height: 1,
                            position: 'fixed',
                            width: NAV.WIDTH,
                            backgroundColor: '#FFAAAA',
                            // borderRight: (theme) => solid 1px ${theme.palette.divider},
                            overflow: 'auto',
                            zIndex: (theme) => theme.zIndex.appBar + 1
                        }}
                        className='flex flex-col scroll-bar'
                    >
                        {renderContent}
                    </Box>
                ) : (
                    <Drawer
                        open={openNav}
                        onClose={onCloseNav}
                        PaperProps={{
                            sx: {
                                width: NAV.WIDTH,
                                background: '#FFAAAA',
                            },
                        }}
                    >
                        {renderContent}
                    </Drawer>
                )}
            </Box>
        </>
    )
}

function NavItem({ item }: any) {
    const router = useRouter()

    const pathname = usePathname();

    const active = item.path === pathname;

    const handleclick = (path: string) => {
        if (path == 'rally') {
            window.open('https://docs.google.com/forms/d/e/1FAIpQLSfPo_V8Bznia9H_l6k8j3CEnk52uU06v0Fy7TNnjd_0TS6pdA/viewform', '_blank');
        } else {
            router.push(path);
        }
    };
    return (
        <ListItemButton
            onClick={() => handleclick(item.path)}
            sx={{
                minHeight: 44,
                borderRadius: 0.75,
                typography: 'body2',
                color: 'var(--primary)',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightMedium',
                ...(active && {
                    color: 'primary.main',
                    fontWeight: 'fontWeightSemiBold',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                    },
                }),
            }}
        >
            <Box component="span" sx={{ width: 20, height: 20, mr: 1 }} >
                {item.icon}
            </Box>

            <Box component="span">{item.title} </Box>

        </ListItemButton>
    );
}
