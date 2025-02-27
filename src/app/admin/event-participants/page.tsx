'use client'
import React, { useEffect, useRef, useState } from "react"
import { Box, Button, Card, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, alpha, Breadcrumbs, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Skeleton, Paper, DialogProps, Dialog, DialogTitle, DialogContent, DialogContentText, Autocomplete } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import TableNoData from "@/app/components/table-no-data";
import Link from "next/link";
import axiosInterceptorInstance from "../../../../axiosInterceptorInstance";
import { EVENT_CATEGORY } from "../../../../config";
import CloseIcon from '@mui/icons-material/Close';
import '../../../public/css/base.css'
import '../../../public/css/dashboard.css'
import EventEditor from "./event-editor";
import { format } from "date-fns";
import { useSnackbar } from "@/app/hooks/snackbar-service";
const STATUS_ENUMS = [
    {id: 99,label: 'All', backgroundColor: ''},
    {id: 0, label: 'Pending', backgroundColor: 'rgb(250, 173, 20)'},
    {id: 1, label: 'Approved', backgroundColor: 'rgb(82, 196, 26)'},
    {id: 2, label: 'Rejected', backgroundColor: 'rgb(255, 77, 79)'}
  ]

export default function EventParticipants() {
    interface Column {
        id: string;
        label: string;
        minWidth?: number;
        align?: 'left';
        format?: (value: number) => string;
    }

    const tableHead: readonly Column[] = [
        { id: 'registrationID', label: 'Reg ID', minWidth: 80 },
        { id: 'firstName', label: 'Name' },
        { id: 'companyName', label: 'Company Name', minWidth: 150 },
        { id: 'eventName', label: 'Event Name', minWidth: 150 },
        { id: 'eventTypeName', label: 'Event Type', minWidth: 120 },
        { id: 'eventCategory', label: 'Event Category', minWidth: 140 },
        { id: 'eventDate', label: 'Event Date', minWidth: 110 },
        // { id: 'eventTime', label: 'Event Time', minWidth: 110 },
        // { id: 'eventLocation', label: 'Location' },
       //  { id: 'eventFee', label: 'Fee' },
        { id: 'eventApproved', label: 'Event Status', minWidth: 120 },
        { id: 'paymentApproved', label: 'Payment Status', minWidth: 140 },
        // 
        // { id: 'userName', label: 'User Name', minWidth: 120 },
        // { id: 'email', label: 'Email' },
        
        { id: 'action', label: 'Action', minWidth: 100 },
    ]

    const count = useRef(0);
    const { showMessage } = useSnackbar();

    const [eventEditorOpen, setEventEditorOpen] = useState(false);
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
    const [selectedRow, setSelectedRow] = useState<any>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [allEvents, setAllEvents] = useState([]);
    const [autoCompleteEvents, setAutoCompleteEvents] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [events, setEvents] = useState([]);
    const [companyList, setCompanyList] = useState([]);

    const [participants, setParticipants] = useState([]);

    const [isFilterActive, setIsFilterActive] = useState(false);
    const [filterCategory, setFilterCategory] = useState('');
    const [filterEventType, setFilterEventType] = useState('');
    const [filterEvent, setFilterEvent] = useState<any>(null);
    const [filterRegistrationID, setFilterRegistrationID] = useState('');
    const [filterEventApproved, setFilterEventApproved] = useState(99);
    const [filterPaymentApproved, setFilterPaymentApproved] = useState(99);
    const [filterCompany, setFilterCompany] = useState<any>(null);
    const [filterCount, setFilterCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [pagesize, setPagesize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [pageIteration, setPageIteration] = useState(0);


    useEffect(() => {
        if (count.current === 0) {
            getEventParticipants();
            getAllEventsData();
            getCompanyList();
        }
        count.current++;
    }, []);

    const getCompanyList = async () => {
        try {
            const response = await axiosInterceptorInstance.get('v1/fillcompanydropdown');
            if (response.data) {
                const result = response.data.result;
                const companies = result.map((ele: any) => ({ id: ele.value, label: ele.text }))
                setCompanyList(companies);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getEventParticipants = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInterceptorInstance.get(
                `v1/participants?fk_EventCategory=${filterCategory || 0}&fk_EventType=${filterEventType || 0}
            &id_Event=${filterEvent?.id || 0}&registrationID=${filterRegistrationID || ''}
            &EventApproved=${filterEventApproved}&PaymentApproved=${filterPaymentApproved}&id_Company=${filterCompany?.id || 0}&Offset=${offset}&Pagesize=${pagesize}`);
            if (response?.data) {
                const result = response.data.result;
                // console.log(result)
                setParticipants(result.participants);
                setTotalCount(result.totalRecords);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     findEvents(0);
    // }, [allEvents]);

    const getAllEventsData = async () => {
        try {
            const response = await axiosInterceptorInstance.get('v1/getevents?fk_EventType=0&createdBy=0');
            if (response?.data) {
                const result = response.data.result;
                setAllEvents(result);
                // console.log(allEvents);
                //findEvents(0);

            }
        } catch (error) {
            console.error(error);
        }
    };

    const filterCategoryChange = (id: number) => {
        if (Number(filterCategory) !== id) {
            setFilterEventType('');
            setFilterEvent(null);
            setAutoCompleteEvents([]);
        }
        findEventTypes(Number(id));
    }

    const findEventTypes = (id: number) => {
        const events: any = allEvents.filter((type: any) => type.eventCategory === Number(id));;
        const uniqueEvent = new Set();
        const uniqueEventTypes: any = [];
        events.forEach((obj: any) => {
            if (!uniqueEvent.has(obj.fK_EventType)) {
                uniqueEvent.add(obj.fK_EventType);
                uniqueEventTypes.push(obj);
            }
        });
        setEventTypes(uniqueEventTypes);
    }

    const filterEventTypeChange = (id: number) => {
        if (Number(filterEventType) !== id) {
            setFilterEvent(null);
        }
        findEvents(Number(id));
    }

    const findEvents = (id: number) => {
        const events: any = allEvents.filter((event: any) => event.fK_EventType === Number(id));
        setEvents(events);
        const autoCompleteEvents = events.map((ele: any) => ({ id: ele.iD_Event, label: ele.eventName }))
        setAutoCompleteEvents(autoCompleteEvents);
    }

    const filterHandler = () => {
        setFilterCount(filterCount + 1);
        setIsFilterActive(true);
        // setParticipants([]);
        // getEventParticipants();
    }

    const resetHandler = () => {
        setFilterCompany(null);
        setFilterEvent(null);
        setFilterCategory('');
        setFilterEventType('');
        setFilterRegistrationID('');
        setFilterEventApproved(99);
        setFilterPaymentApproved(99);

        setEventTypes([]);
        setEvents([]);
        setAutoCompleteEvents([]);

        setIsFilterActive(false);

        setFilterCount(filterCount + 1);
        // setParticipants([]);
        // getEventParticipants();
    }

    useEffect(() => {
        if (filterCount !== 0) {
            setOffset(0)
            setParticipants([]);
            getEventParticipants();
        }
    }, [filterCount]);



    const renderRowContent = (column: any, row: any) => {
        const value = row[column.id];
        switch (column.id) {
            case "action":
                return <Stack direction="row" spacing={1}>
                    <IconButton aria-label="edit" color="primary" size="medium" onClick={handleEventEditorDialogOpen('paper', row)}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    {/* <IconButton aria-label="delete" color="error" size="medium">
                            <DeleteIcon fontSize="small" />
                        </IconButton> */}
                </Stack>;
            case "registrationID":
                return <span style={{ cursor: 'pointer', color: 'var(--primary)' }} onClick={handleEventEditorDialogOpen('paper', row)}>{value}</span>
            case "eventCategory":
                return <>
                    {EVENT_CATEGORY.find(ele => ele.id === value)?.name}
                </>
            case "eventDate":
                return <>
                    {format(new Date(row.eventDate), 'dd/MM/yyyy')}
                </>
            // case "eventTime":
            //     return <>
            //         {format(new Date(row.eventDate), 'h:mm a')}
            //     </>
            case "eventApproved":
                return <>
                    {
                        <>
                            <span style={{ display: 'inline-block', marginRight: '4px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: STATUS_ENUMS.find((ele: any) => ele.id === value)?.backgroundColor }}></span>
                            {STATUS_ENUMS.find((ele: any) => ele.id === value)?.label}
                        </>
                    }
                </>
            case "paymentApproved":
                return <>
                    {
                        <>
                            <span style={{ display: 'inline-block', marginRight: '4px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: STATUS_ENUMS.find((ele: any) => ele.id === value)?.backgroundColor }}></span>
                            {STATUS_ENUMS.find((ele: any) => ele.id === value)?.label}
                        </>
                    }
                </>
            default:
                return <>
                    {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                </>;
        }
    };

    const handleEventEditorDialogOpen = (scrollType: DialogProps['scroll'], event: any) => () => {
        setEventEditorOpen(true);
        setScroll(scrollType);
        setSelectedRow(event);
    };

    const handleEventDialogClose = (status: boolean = false) => {
        setEventEditorOpen(false);
        // setSelectedRow(null)
        if (status) {
            setParticipants([]);
            getEventParticipants();
            showMessage('Successfully Updated', 'success');
        }
    };

    const dialogElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (eventEditorOpen) {
            const { current: descriptionElement } = dialogElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [eventEditorOpen]);

    useEffect(() => {
        if(isLoading){
            offsetChange();
        }

    }, [offset]);

    useEffect(() => {
        if(isLoading){
            pageOffsetChange();
        }
    }, [pagesize]);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => {
        setIsLoading(true);
        setOffset(newPage)
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsLoading(true);
        setPagesize(parseInt(event.target.value, 10))
        setOffset(0);
    };

    const offsetChange = async () => {
        setParticipants([]);
        getEventParticipants();
    };
    const pageOffsetChange = async () => {
        setParticipants([]);
        getEventParticipants();
    };

    return (
        <Container sx={{ px: '0 !important', maxWidth: 'none !important' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            </Stack>

            <Box sx={{ marginBottom: '16px', marginTop: '16px' }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '12px', marginBottom: '5px' }}>
                    <Link color="inherit" href="/user/dashboard">
                        Home
                    </Link>
                    <Typography color="text.primary" sx={{ fontSize: '12px' }}>Event Participants</Typography>
                </Breadcrumbs>
                <Typography variant="h5" color="text.primary" sx={{ fontSize: '18px', fontWeight: 500 }}>Event Participants</Typography>
            </Box>

            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-12">
                    <Card sx={{ boxShadow: 0 }}>
                        <Box sx={{ overflowX: 'auto' }}>


                            <Box sx={{ width: '100%', minWidth: 800, padding: '16px', display: 'flex', gap: '10px' }}>

                                <TextField
                                    size="small"
                                    margin="normal"
                                    id="regId"
                                    label="Reg ID"
                                    sx={{ margin: 0 }}
                                    value={filterRegistrationID}
                                    onChange={(e: any) => setFilterRegistrationID(e.target.value)}
                                />

                                <FormControl sx={{ width: '300px' }}>
                                    <Autocomplete
                                        id="company"
                                        options={companyList}
                                        sx={{ width: '100%' }}
                                        value={filterCompany}
                                        onChange={(event: any, newValue: any | null) => { setFilterCompany(newValue) }}
                                        renderInput={(params) => <TextField {...params} label="Company" sx={{ margin: 0 }} size="small" />}
                                    />
                                </FormControl>

                                <FormControl sx={{ width: '200px' }}>
                                    <InputLabel id="category-label" size="small">Category</InputLabel>
                                    <Select
                                        size="small"
                                        id="category"
                                        label="Category"
                                        value={filterCategory}
                                        onChange={(e: any) => { setFilterCategory(e.target.value); filterCategoryChange(e.target.value) }}>
                                        {EVENT_CATEGORY.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ width: '200px' }}>
                                {filterCategory ?
                                    <InputLabel id="eventType-label" size="small">Event Type</InputLabel>:
                                    <></>
                                }
                                    {filterCategory ?
                                        <Select
                                        size="small"
                                        id="eventType"
                                        label="eventType"
                                        value={filterEventType}
                                        onChange={(e: any) => { setFilterEventType(e.target.value); filterEventTypeChange(e.target.value) }}>
                                        {eventTypes.map((item: any) => (
                                            <MenuItem key={item.fK_EventType} value={item.fK_EventType}>{item.eventTypeName}</MenuItem>
                                        ))}
                                        </Select> :
                                            <Autocomplete
                                            id="events"
                                            options={autoCompleteEvents}
                                            sx={{ width: '100%' }}
                                            value={filterEvent}
                                            onChange={(event: any, newValue: any | null) => { setFilterEvent(newValue) }}
                                            renderInput={(params) => <TextField {...params} label="Event Type" sx={{ margin: 0 }} size="small" />}
                                        />
                                    }
                                    
                                </FormControl>

                                <FormControl sx={{ width: '300px' }}>
                                    <Autocomplete
                                        id="events"
                                        options={autoCompleteEvents}
                                        sx={{ width: '100%' }}
                                        value={filterEvent}
                                        onChange={(event: any, newValue: any | null) => { setFilterEvent(newValue) }}
                                        renderInput={(params) => <TextField {...params} label="Events" sx={{ margin: 0 }} size="small" />}
                                    />
                                </FormControl>

                                {/* <FormControl sx={{ width: '200px' }}>
                                    <InputLabel id="events-label" size="small">Events</InputLabel>
                                    <Select
                                        size="small"
                                        id="events"
                                        label="events"
                                        value={filterEvent}
                                        onChange={(e: any) => setFilterEvent(e.target.value)}>
                                        {events.map((item: any) => (
                                            <MenuItem key={item.iD_Event} value={item.iD_Event}>{item.eventName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl> */}

                                <FormControl sx={{ width: '200px' }}>
                                    <InputLabel id="eventApproved-label" size="small">Event Status</InputLabel>
                                    <Select
                                        size="small"
                                        id="eventApproved"
                                        label="eventApproved"
                                        value={filterEventApproved}
                                        onChange={(e: any) => setFilterEventApproved(e.target.value)}>
                                        {STATUS_ENUMS.map((item: any) => (
                                            <MenuItem key={item.id} value={item.id}><span style={{ display: 'inline-block', marginRight: '5px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.backgroundColor }}></span> {item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ width: '200px' }}>
                                    <InputLabel id="eventApproved-label" size="small">Payment Status</InputLabel>
                                    <Select
                                        size="small"
                                        id="paymentApproved"
                                        label="paymentApproved"
                                        value={filterPaymentApproved}
                                        onChange={(e: any) => setFilterPaymentApproved(e.target.value)}>
                                        {STATUS_ENUMS.map((item: any) => (
                                            <MenuItem key={item.id} value={item.id}><span style={{ display: 'inline-block', marginRight: '5px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.backgroundColor }}></span> {item.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 0, mb: 0 }}
                                    onClick={() => { filterHandler() }}
                                >
                                    Filter
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 0, mb: 0 }}
                                    onClick={() => { resetHandler() }}
                                    disabled={!isFilterActive}
                                >
                                    Reset
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
                                        {participants.map((row: any) => {
                                            return (
                                                <TableRow key={row.iD_EventRegisterDetails}>
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

                                        {(!participants.length && !isLoading) && <TableNoData query={''} colSpan={14} />}
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
                            <TablePagination
                                component="div"
                                count={totalCount}
                                page={offset}
                                onPageChange={handleChangePage}
                                rowsPerPage={pagesize}
                                rowsPerPageOptions={[10, 20, 50, 100]}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Box>

                        {/* <CardActions sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "flex-start",
                                        }}>
                            
                            </CardActions> */}

                    </Card>

                </div>
            </div>

            <Dialog
                open={eventEditorOpen}
                onClose={() => { handleEventDialogClose() }}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{selectedRow && selectedRow?.registrationID ? selectedRow?.registrationID : 'Event'}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => { handleEventDialogClose() }}
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
                    <EventEditor row={selectedRow} onClose={handleEventDialogClose} />
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

        </Container>
    )
}
