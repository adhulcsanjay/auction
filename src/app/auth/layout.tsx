
'use client';
import { redirect, usePathname } from 'next/navigation';
import Image from 'next/image'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bg1 from '../../public/img/bg-1.png'
import bg2 from '../../public/img/bg-2.png'
import bg3 from '../../public/img/bg-3.png'
import bg4 from '../../public/img/bg-4.png'
import credentails from '../../public/img/Credential-image.svg'
import '../../public/css/login.css'
import Announcements from '../components/announcements';
import Header from '../components/header';
import Footer from '../components/footer';

const defaultTheme = createTheme({
    components : {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            boxShadow: 'none'
          },
        },
      },
    },
    palette: {
        primary: {
          main: '#1B459C',
        },
      },
});


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  if (typeof window !== 'undefined') {
    const sessionData = sessionStorage.getItem('session');
    const alreadyRedirected = sessionStorage.getItem('alreadyRedirected');
    
    if (sessionData && !alreadyRedirected) {
      sessionStorage.setItem('alreadyRedirected', 'true');
      redirect('/auth/register');
    }
  }
  
 
  const pathname = usePathname();

  const getBackground = () => {
    switch (pathname) {
      case '/auth/register':
        return credentails
        break;
      case '/auth/forgot-password':
        return credentails
        break;
      default:        
        return credentails
        break;
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className='auth-wrapper'>
        <div className='left-section' style={{width:'100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
          {/* <Announcements /> */}
          {/* <div style={{ width: '100%', height: '60vh', position: 'relative' }}> */}
            <Image style={{height:'100vh',width:'100%',objectFit:'cover'}}
              src={getBackground()}
              // layout='fill'
              objectFit='cover'
              objectPosition='top'
              alt="Tarang Techies Cultural Arts Festival"
            />
          {/* </div> */}
        </div>
        <div className='right-section'>
          <Header />
          {children}
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
