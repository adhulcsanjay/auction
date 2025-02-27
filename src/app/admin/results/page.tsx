'use client'
import React, { useEffect, useRef, useState } from "react"
import { Box, Button, Card, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, alpha, Breadcrumbs, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Skeleton, Paper, DialogProps, Dialog, DialogTitle, DialogContent, DialogContentText, Autocomplete } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import TableNoData from "@/app/components/table-no-data";
import Link from "next/link";
import axiosInterceptorInstance from "../../../../axiosInterceptorInstance";
import { EVENT_CATEGORY, RESULT_POSITION_ENUMS, STATUS_ENUMS } from "../../../../config";
import CloseIcon from '@mui/icons-material/Close';
import '../../../public/css/base.css'
import '../../../public/css/dashboard.css'
import Editor from "./editor";
import { format } from "date-fns";
import { useSnackbar } from "@/app/hooks/snackbar-service";
import ApproveEditor from "./approve-editor";

export default function EventResults() {
    interface Column {
        id: string;
        label: string;
        minWidth?: number;
        align?: 'left';
        format?: (value: number) => string;
    }

    const tableHead: readonly Column[] = [
        { id: 'registrationID', label: 'Reg ID', minWidth: 160 },
        { id: 'participantName', label: 'Name' },
       // { id: 'email', label: 'Email' },
        { id: 'companyName', label: 'Company Name', minWidth: 150 },
        { id: 'eventName', label: 'Event Name', minWidth: 150 },
        { id: 'mobileNumber', label: 'Mobile', minWidth: 150 },
        { id: 'eventType', label: 'Event Type', minWidth: 120 },
        { id: 'eventCategory', label: 'Event Category', minWidth: 140 },
       // { id: 'eventDate', label: 'Event Date', minWidth: 110 },
        // { id: 'points', label: 'Point', minWidth: 80 },
        { id: 'eventPosition', label: 'Position', minWidth: 100 },  
        { id: 'points', label: 'Points', minWidth: 100 }, 
        { id: 'eventStatus', label: 'Status', minWidth: 120 },     
        { id: 'action', label: 'Action', minWidth: 100 },
    ]

    const count = useRef(0);
    const { showMessage } = useSnackbar();

    const [editorOpen, setEditorOpen] = useState(false);
    const [approveOpen, setapproveOpen] = useState(false);
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
    const [selectedRow, setSelectedRow] = useState<any>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [eventResult, setEventResult] = useState([]);


    useEffect(() => {
        if (count.current === 0) {
            getAllEventsData();
            getEventResult();
        }
        count.current++;
    }, []);

    const getEventResult = async () => {
        try {
            setIsLoading(true);
            setEventResult([]);
            const response = await axiosInterceptorInstance.get('v1/eventresult?id_EventResult=0');
            if (response?.data) {
                setIsLoading(false);
                const result = response.data.result;                
                setEventResult(result);
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    const getAllEventsData = async () => {
        try {
            const response = await axiosInterceptorInstance.get('v1/getevents?fk_EventType=0&createdBy=0');
            if (response?.data) {
                const result = response.data.result;
                setAllEvents(result);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const renderRowContent = (column: any, row: any) => {
        const value = row[column.id];
        switch (column.id) {
            case "action":
                return <Stack direction="row" spacing={1}>
                    <IconButton aria-label="edit" color="primary" size="medium" onClick={handleApproveEditorDialogOpen('paper', row)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    {/* <IconButton aria-label="delete" color="error" size="medium">
                            <DeleteIcon fontSize="small" />
                        </IconButton> */}
                </Stack>;
            case "registrationID":
                return <span style={{ cursor: 'pointer', color: 'var(--primary)' }} onClick={handleApproveEditorDialogOpen('paper', row)}>{value}</span>
            // case "eventCategory":
            //     return <>
            //         {EVENT_CATEGORY.find(ele => ele.id === Number(value))?.name}
            //     </>
            case "eventDate":
                return <>
                    {row.eventDate ? format(new Date(row.eventDate), 'dd/MM/yyyy') : ""}
                </>
             case "eventStatus":
                return <>
                    {
                        <>
                            <span style={{ display: 'inline-block', marginRight: '4px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: STATUS_ENUMS.find((ele: any) => ele.id === value)?.backgroundColor }}></span>
                            {STATUS_ENUMS.find((ele: any) => ele.id === value)?.label}
                        </>
                    }
                </>
            // case "eventPosition":
            //     return <>
            //         {
            //             <>
            //                 {RESULT_POSITION_ENUMS.find((ele: any) => ele.id === value)?.label}
            //             </>
            //         }
            //     </>
            default:
                return <>
                    {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                </>;
        }
    };

    const handleEditorDialogOpen = (scrollType: DialogProps['scroll'], event: any) => () => {
        setEditorOpen(true);
        setScroll(scrollType);
        setSelectedRow(event);
    };

    const handleEventEditorDialogOpen = (scrollType: DialogProps['scroll'], event: any) => () => {
        setEditorOpen(true);
        setScroll(scrollType);
        setSelectedRow(event);
    };

    const handleApproveEditorDialogOpen = (scrollType: DialogProps['scroll'], event: any) => () => {
        setapproveOpen(true);
        setScroll(scrollType);
        setSelectedRow(event);
    };

    const handleEditorDialogClose = (status: boolean = false) => {
        setEditorOpen(false);
        setSelectedRow(null)
        if (status) {
            showMessage('Successfully Updated', 'success');
            getEventResult();
        }
    };

    const handleApproveDialogClose = (status: boolean = false) => {
        setapproveOpen(false);
        setSelectedRow(null)
        if (status) {
            showMessage('Successfully Updated', 'success');
            getEventResult();
        }
    };

    const dialogElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (editorOpen) {
            const { current: descriptionElement } = dialogElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [editorOpen]);

    return (
        <Container sx={{ px: '0 !important', maxWidth: 'none !important' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            </Stack>

            <Box sx={{ marginBottom: '16px', marginTop: '16px' }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '12px', marginBottom: '5px' }}>
                    <Link color="inherit" href="/user/dashboard">
                        Home
                    </Link>
                    <Typography color="text.primary" sx={{ fontSize: '12px' }}>Results</Typography>
                </Breadcrumbs>
                <Typography variant="h5" color="text.primary" sx={{ fontSize: '18px', fontWeight: 500 }}>Results</Typography>
            </Box>

            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-12">
                    <Card sx={{ boxShadow: 0 }}>
                        <Box sx={{ overflowX: 'auto' }}>


                            <Box sx={{ width: '100%',  padding: '16px', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>

                                <h2></h2>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 0, mb: 0 }}
                                    startIcon={<AddIcon/>}
                                    onClick={handleEditorDialogOpen('paper', null)}
                                    disabled={!allEvents.length}
                                >
                                    ADD NEW
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{ width: '100%', overflow: 'hidden' }}>

                            <TableContainer sx={{ maxHeight: 'calc(100vh - 254px)' }}>
                                <Table stickyHeader sx={{ minWidth: 500 }} aria-label="table">
                                    <TableHead>
                                        <TableRow>
                                            {tableHead.map((column) => (
                                                <TableCell key={column.id} align={column?.align} style={{ minWidth: column.minWidth }}
                                                >{column.label}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {eventResult.map((row: any, index: number) => {
                                            return (
                                                <TableRow key={index}>
                                                    {tableHead.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column?.align}>
                                                                {
                                                                    renderRowContent(column, row)
                                                                }
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>

                                            )
                                        })}

                                        {(!eventResult.length && !isLoading) && <TableNoData query={''} colSpan={14} />}
                                        {isLoading && <>
                                            <TableRow>
                                                <TableCell colSpan={14}>
                                                    <Paper
                                                        sx={{
                                                            textAlign: 'center',
                                                            boxShadow: 'none',
                                                        }}
                                                    >
                                                        <Skeleton height={60} />
                                                        <Skeleton height={60} />
                                                        <Skeleton height={60} />
                                                        <Skeleton height={60} />
                                                        <Skeleton height={60} />
                                                    </Paper>
                                                </TableCell>
                                            </TableRow>
                                        </>}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                          
                        </Box>

                    </Card>

                </div>
            </div>

            <Dialog
                open={editorOpen}
                onClose={() => { handleEditorDialogClose() }}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Result</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => { handleEditorDialogClose() }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers={scroll === 'paper'} 
                sx={{maxWidth: '420px'}}>
                    <Editor row={selectedRow} allEvents={allEvents} onClose={handleEditorDialogClose} />
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

            <Dialog
                open={approveOpen}
                onClose={() => { handleApproveDialogClose() }}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{selectedRow && selectedRow?.registrationID ? selectedRow?.registrationID : 'Event'}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => { handleApproveDialogClose() }}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers={scroll === 'paper'}>
                    <ApproveEditor row={selectedRow} onClose={handleApproveDialogClose} />
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

        </Container>
    )
}
