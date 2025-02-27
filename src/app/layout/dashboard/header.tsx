import PropTypes from 'prop-types';
import { AppBar, Icon, Stack, Toolbar } from '@mui/material';
import { useResponsive } from '../../hooks/use-responsive';
import IconButton from '@mui/material/IconButton';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { HEADER, NAV } from '../config-layout';
import AccountPopover from './common/account-popover';
import Image from 'next/image';
import eventlogo from '@/public/img/eventlogo.png'
import credentiallogo from '../../../public/img/Credential-Logo.svg'
export default function Header({ onOpenNav }: any) {
    const lgUp = useResponsive('up', 'lg');
    const theme = useTheme();

    const renderContent = (
        <>
            {!lgUp && (
                <>
                    <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'white' }}>
                        <Icon>menu</Icon>
                    </IconButton>
                    {/* <a href='#' target='_blank' >
                        <Image
                            src={credentiallogo}
                            alt="credential-logo"
                        />
                    </a> */}
                </>
            )}
            {/* <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                Tarang
            </Typography> */}
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" alignItems="center" spacing={1}>
                <AccountPopover />
            </Stack>
        </>
    );
    return (
        <>
            <AppBar sx={{
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,
                backgroundColor: 'var(--primary)',
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
                ...(lgUp && {
                    width: `calc(100% - ${NAV.WIDTH}px)`,
                    height: HEADER.H_DESKTOP,
                }),
            }}
            >
                <Toolbar sx={{
                    height: 1,
                    px: { lg: 5 },
                }}>
                    {renderContent}
                </Toolbar>
            </AppBar>
        </>
    )
}
