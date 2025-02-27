import { Box, Card, CardHeader } from '@mui/material'
import Image from 'next/image'
import { format } from "date-fns";
import noImage from '../../../public/img/no-image.jpg';
const myStyle = {
  margin: '0 auto',
};


export default function EventDetail({ event, source }: any) {
  return (
    <div className="grid grid-cols-6 gap-1">
      <div className="col-span-6 md:col-span-6 text-center">
        {source === 'DASHBOARD' ?
          <Card sx={{ boxShadow: 0 }}>
            {event?.eventImageUrl && <img
              src={event?.eventImageUrl}
              alt="Event"
              style={myStyle}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `${noImage.src}`;
              }}
            />}
          </Card> :
          <Card sx={{ boxShadow: 0 }}>
            {event?.evnetImageUrl && <img
              src={event?.evnetImageUrl}
              alt="Event"
              style={myStyle}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = `${noImage.src}`;
              }}
            />}
          </Card>
        }
      </div>
      <div className="col-span-6 md:col-span-6">
        <Card sx={{ boxShadow: 0 }} className='h-full'>
          <CardHeader title='Event Details'
            titleTypographyProps={{
              fontSize: 16,
              fontWeight: 500,
              fontFamily: 'inherit',
              className: 'card-title'
            }} />
          <Box sx={{ p: 2, pt: 0 }} className="text-sm">
            {/* <div className="grid grid-cols-12 gap-3 mb-2">
              <div className="col-span-4 font-medium">
                Reg ID:
              </div>
              <div className="col-span-8">
                {event?.regId}
              </div>
            </div> */}

            <div className="grid grid-cols-12 gap-3 mb-2">
              <div className="col-span-4 font-medium">
                Name:
              </div>
              <div className="col-span-8">
                {event?.eventName}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 mb-2">
              <div className="col-span-4 font-medium">
                Category:
              </div>
              {source === 'DASHBOARD' && <div className="col-span-8">
                {event?.eventCategoryName}
              </div>}
              {source === 'REGISTER_EVENT' && <div className="col-span-8">
                {event?.eventCategory === 1 ? 'Solo' : 'Group'}
              </div>}
            </div>

            <div className="grid grid-cols-12 gap-3 mb-2">
              <div className="col-span-4 font-medium">
                Type:
              </div>
              <div className="col-span-8">
                {event?.eventTypeName}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 mb-2">
              <div className="col-span-4 font-medium">
                Date & Time:
              </div>
              {source === 'REGISTER_EVENT' &&
                <div className="col-span-8">
                  Not scheduled yet
                  {/* {event?.eventDate ? format(new Date(event?.eventDate), 'dd/MM/yyyy') : ''} {event?.eventTime ? format(new Date(event?.eventTime), 'h:mm a') : ''} */}
                </div>
              }
              {source === 'DASHBOARD' &&
                <div className="col-span-8">
                  Not scheduled yet
                  {/* {event?.eventDate ? event.eventDate : ''} {event?.eventTime ? event.eventTime : ''} */}
                </div>
              }
            </div>

            {/* <div className="grid grid-cols-12 gap-3 mb-2">
              <div className="col-span-4 font-medium">
                Approved:
              </div>
              <div className="col-span-8">
                {event?.approved}
              </div>
            </div> */}

            <div className="grid grid-cols-12 gap-3 mb-2">
              <div className="col-span-4 font-medium">
                Location:
              </div>
              <div className="col-span-8">
                {event?.eventLocation}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 mb-2">
              <div className="col-span-4 font-medium">
                Event Fee:
              </div>
              <div className="col-span-8">
                {event?.eventFee}
              </div>
            </div>
            {source === 'DASHBOARD' &&

              <div className="grid grid-cols-12 gap-3 mb-2">
                <div className="col-span-4 font-medium">
                  Status:
                </div>
                <div className="col-span-8">
                  {(event?.eventApproved == 0) ? 'Not Approved' : (event?.eventApproved == 1) ? 'Approved' : 'Rejected'}
                </div>
              </div>
            }
            {source === 'DASHBOARD' &&
              <div className="grid grid-cols-12 gap-3 mb-2">
                <div className="col-span-4 font-medium">
                  Payment:
                </div>
                <div className="col-span-8">
                  {(event?.paymentApproved == 0) ? 'Not Completed' : 'Completed'}
                </div>
              </div>
            }
            {source === 'DASHBOARD' &&
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-4 font-medium">
                  Remarks:
                </div>
                <div className="col-span-8">
                  {event?.remarks}
                </div>
              </div>
            }
          </Box>
        </Card>
      </div>
      {
        event?.eventRules !== '' && <div className="col-span-6 md:col-span-6">
          <Card sx={{ boxShadow: 0 }} className='h-full '>
            <CardHeader title='Event Rules'
              titleTypographyProps={{
                fontSize: 16,
                fontFamily: 'inherit',
                fontWeight: 500,
                className: 'card-title'
              }} />
            <Box sx={{ p: 2, pt: 0 }}>
              <div className='text-sm editor-content scroll-bar' dangerouslySetInnerHTML={{ __html: event?.eventRules }}>
              </div>
            </Box>
          </Card>
        </div>
      }
    </div >
  )
}
