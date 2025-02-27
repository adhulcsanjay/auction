import { Box } from '@mui/material';
import { useResponsive } from '../../hooks/use-responsive';
import { HEADER, NAV } from '../config-layout';

export default function Main({ children, sx, ...other }: any) {
    const lgUp = useResponsive('up', 'lg');
    const SPACING = 8;
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                minHeight: '100vh',
                backgroundColor: 'rgb(238, 242, 246)',
                display: 'flex',
                flexDirection: 'column',
                px: 2,
                pt: `${HEADER.H_MOBILE + SPACING}px`,
                pb: '30px',
                ...(lgUp && {
                    px: 2,
                    pt: `${HEADER.H_DESKTOP + SPACING}px`,
                    pb: '30px',
                    width: `calc(100% - ${NAV.WIDTH}px)`,
                }),
                ...sx,
            }}
            {...other}
        >
            {children}
        </Box>
    )
}