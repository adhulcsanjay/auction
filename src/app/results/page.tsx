'use client'
import '../../public/css/base.css'
import Image from 'next/image'
import Header from '../components/header'
import Footer from '../components/footer'
import { Box, Card, Container, IconButton, Skeleton, Stack, ThemeProvider, Typography, createTheme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import ChampionsIcon from '../../public/img/champions.svg'
import RunnerUp1Icon from '../../public/img/runner-up-1.svg'
import RunnerUp2Icon from '../../public/img/runner-up-2.svg'
import EventResults from './event-results'
import CompanyResults from './company-results'
import axiosInterceptorInstance from '../../../axiosInterceptorInstance'
import { Swiper, SwiperSlide,  } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

const COLORS = ['rgba(215, 186, 224, 0.5)', 'rgba(255, 207, 219, 0.7)', 'rgba(255, 228, 173, 0.73)', 'rgba(173, 217, 255, 0.75)' , '#B2FAE5', 'rgba(137, 157, 254, 0.4)', 'rgba(255, 165, 129, 0.74)', '#A1F4DF', '#BFD6FF', 'rgba(215, 186, 224, 0.5)', 'rgba(255, 207, 219, 0.7)', 'rgba(255, 228, 173, 0.73)', 'rgba(173, 217, 255, 0.75)' , '#B2FAE5', 'rgba(137, 157, 254, 0.4)', 'rgba(255, 165, 129, 0.74)', '#A1F4DF', '#BFD6FF']

export default function Results() {

  const defaultTheme = createTheme({
    components : {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            boxShadow: 'none'
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
            textTransform: 'none'
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontFamily: 'inherit',
            padding: '5px 16px',
            fontSize: '12px'
          },
          head: {
            color: 'rgb(99, 115, 129)',
            backgroundColor: 'rgb(244, 246, 248)',
            fontWeight: 500,
            fontFamily: 'inherit',
            borderBottom: '1px solid rgb(241, 243, 244)',
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

  const count = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    if (count.current === 0) {
      getData();
    }
    count.current++;
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInterceptorInstance.get(`v1/eventresulttopcompany`);
      if (response?.data) {
        const result = response.data.result;
        const awards = result.filter((ele: any) => ele.mode === 'WRD');
        setData(result);
        setAwards(awards);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const getValue = (type: string) => {
    const obj: any = data.find((element: any) => element.type === type);
    return obj;
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <hr />
      <div className="min-h-[calc(100vh-164px)] pt-4 pb-4" style={{ backgroundColor: 'rgb(238, 242, 246)' }}>

        <Container sx={{ maxWidth: 'none !important' }}>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4">
              <Card sx={{ boxShadow: 0, background: '#fff', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ padding: 3, display: 'flex', justifyContent: 'space-between', gap: '20px', position: 'relative', zIndex: 1 }}>
                  <Box sx={{ width: 'calc(100% - 100px)' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: '500' }} color="text.secondary" className='truncate' gutterBottom>  
                      {getValue('Champions') ? getValue('Champions')?.value : <Skeleton height={20} />}    
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: '600' }} className='truncate' gutterBottom>
                      {getValue('Champions') ? getValue('Champions')?.company : <Skeleton height={25} />}
                    </Typography>
                    <Typography sx={{ fontSize: 22, fontWeight: '500' }} className='truncate'>
                      {getValue('Champions') ? getValue('Champions')?.point + ' Points' : <Skeleton height={25} />}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '80px', height: '80px', borderRadius: '10px', background: '#A7A4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      src={ChampionsIcon}
                      width={40}
                      alt="The Champions of Tarang"
                      style={{ margin: '0 auto' }}
                    />
                  </Box>
                </Box>
                <div className='box-1'>
                  <div className='shape-1'></div>
                  <div className='shape-2'></div>
                </div>
              </Card>
            </div>

            <div className="col-span-12 md:col-span-4">
              <Card sx={{ boxShadow: 0, background: '#fff', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ padding: 3, display: 'flex', justifyContent: 'space-between', gap: '20px', position: 'relative', zIndex: 1 }}>
                  <Box sx={{ width: 'calc(100% - 100px)' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: '500' }} color="text.secondary" className='truncate' gutterBottom>
                      {getValue('1-Runner-up') ? getValue('1-Runner-up')?.value : <Skeleton height={20} />}  
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: '600' }} className='truncate' gutterBottom>
                      {getValue('1-Runner-up') ? getValue('1-Runner-up')?.company : <Skeleton height={28} />}
                    </Typography>
                    <Typography sx={{ fontSize: 22, fontWeight: '500' }} className='truncate'>
                      {getValue('1-Runner-up') ? getValue('1-Runner-up')?.point + ' Points' : <Skeleton height={28} />}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '80px', height: '80px', borderRadius: '10px', background: '#8BD3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                      src={RunnerUp1Icon}
                      width={50}
                      alt="1st Runner-up"
                      style={{ margin: '0 auto' }}
                    />
                  </Box>
                </Box>
                <div className='box-2'>
                  <div className='shape-1'></div>
                  <div className='shape-2'></div>
                </div>
              </Card>
            </div>

            <div className="col-span-12 md:col-span-4">
              <Card sx={{ boxShadow: 0, background: '#fff', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ padding: 3, display: 'flex', justifyContent: 'space-between', gap: '20px', position: 'relative', zIndex: 1 }}>
                  <Box sx={{ width: 'calc(100% - 100px)' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: '500' }} color="text.secondary" className='truncate' gutterBottom>
                      {getValue('2-Runner-up') ? getValue('2-Runner-up')?.value : <Skeleton height={20} />}  
                    </Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: '600' }} className='truncate' gutterBottom>
                      {getValue('2-Runner-up') ? getValue('2-Runner-up')?.company : <Skeleton height={28} />}
                    </Typography>
                    <Typography sx={{ fontSize: 22, fontWeight: '500' }} className='truncate'>
                      {getValue('2-Runner-up') ? getValue('2-Runner-up')?.point + ' Points' : <Skeleton height={28} />}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '80px', height: '80px', borderRadius: '10px', background: '#FFBDCB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        src={RunnerUp2Icon}
                        width={50}
                        alt="2nd Runner-up"
                        style={{ margin: '0 auto' }}
                      />
                  </Box>
                </Box>
                <div className='box-3'>
                  <div className='shape-1'></div>
                  <div className='shape-2'></div>
                </div>
              </Card>
            </div>

          </div>

          {
          awards.length !== 0 &&
          <Swiper
              modules={[Autoplay, Navigation]}
              navigation={true}
              slidesPerView={'auto'}
              spaceBetween={15}
              speed= {1000}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                }}
              className='mt-5 award-swiper'
          >
            {awards.map((item: any, index: number) => (
                <SwiperSlide key={index} style={{width: '250px'}}>
                    <Card sx={{ boxShadow: 0, backgroundColor: COLORS[index], height: '100%' }} className='pattern-bg'>
                      <Box sx={{ padding: 3, pr: 4 }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          {item.type}
                        </Typography>
                        {item.value !== '' && 
                        <Typography sx={{ fontSize: 14, fontWeight: '600', mb: 0 }} gutterBottom>
                          {item.value}
                        </Typography>}                      
                        {
                          item.company !== '' &&
                          <Typography sx={{ fontSize: 13, fontWeight: '500' }} gutterBottom>
                          {item.company}
                        </Typography>}
                      </Box>
                    </Card>
                </SwiperSlide>
            ))}
          </Swiper>
          }     

          <div className="grid grid-cols-12 gap-4 mt-5">
            <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6">
              <EventResults/>
            </div>
            <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6">
              <CompanyResults/>
            </div>

          </div>
        </Container>
      </div>
      <Footer/>
    </ThemeProvider>
  )
}
