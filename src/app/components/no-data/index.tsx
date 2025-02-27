import { Box, Card, CardHeader, Icon } from '@mui/material'
import Image from 'next/image'

export default function NoData({ data }: any) {
  return (
    <>
      <Card sx={{ boxShadow: 0 }} className='h-full'>
        <Box sx={{ p: 4 }} className="text-sm h-full">
          <div className="flex items-center justify-center h-full py-10">
            <div className="text-center">
              {
                (data.icon && data.icon.type === 'material') && 
                <Icon style={{fontSize: data.icon.size, color: data.icon.color}}>
                  {data.icon.name}
                </Icon>
              }
              <h4 className={data?.titleClasses ? data?.titleClasses : "mt-2 text-xl font-medium"}>{data.title}</h4>
              <p className={data?.descriptionClasses ? data?.descriptionClasses : "text-sm"}>{data.description}</p>
            </div>
          </div>
        </Box>
      </Card>
    </>
  )
}
