import { Swiper, SwiperSlide,  } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';
import { useEffect, useRef, useState } from 'react';

export default function Announcements({title = 'Announcement',paddingClasses = 'px-20 py-10', titleClasses = 'text-3xl font-bold text-white mb-2'}: any) {
  const count = useRef(0);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    if (count.current === 0) {
    getAnnouncements();
    }
    count.current++;
  }, []);

  const getAnnouncements = async () => {
    try {
      const response = await axiosInterceptorInstance.get(`v1/announcementglobal?id_Announcement=0&createdBy=1`);
      if (response?.data) {
        const result = response.data.result;
        setAnnouncements(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={paddingClasses}>
        <h4 className={titleClasses}>{title}</h4>
        <div className='relative'>            
          <Swiper
              modules={[Autoplay, Pagination]}
              centeredSlides={true}
              speed= {1000}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                }}
              pagination={{ clickable: true }}
          >
            {announcements.map((item: any) => (
                <SwiperSlide key={item.iD_Announcement}>
                    <div className='text-white text-sm' dangerouslySetInnerHTML={{ __html: item.announcementtext }}></div>
                </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
    </div>
  )
}
