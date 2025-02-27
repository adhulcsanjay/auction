'use client';
import * as React from 'react';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Autocomplete } from '@mui/material'
import { LoadingButton } from "@mui/lab";
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';
import '../../../public/css/base.css'
import { EVENT_CATEGORY, RESULT_POSITION_ENUMS, RESULT_STATUS_ENUMS } from '../../../../config';
import { userData } from '@/app/hooks/use-responsive';
import { format } from "date-fns";
import ConfirmAlert from '@/app/components/confirm-alert';
import { useSnackbar } from '@/app/hooks/snackbar-service';
import CircularProgress from '@mui/material/CircularProgress';

type formValues = {
    eventCategoryID: number;
    eventTypeID: number;
    eventID: number;
    eventRegisterID: string;
    eventPosition: number;
    resultApproved: number;
}

interface CustomModalProps {
    row: any;
    allEvents: any,
    onClose: (status: boolean) => void;
}

const Editor: React.FC<CustomModalProps> = ({ row, allEvents, onClose }) => {
    const count = React.useRef(0);
    const { showMessage } = useSnackbar();
    const userInfo = userData();
    const [loading, setLoading] = useState(false);
    const [participantsLoading, setParticipantsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [openConfirmAlert, setOpenConfirmAlert] = useState(false);

    // const [allEvents, setAllEvents] = useState([]);
    const [autoCompleteEvents, setAutoCompleteEvents] = useState([]);
    const [eventTypes, setEventTypes] = useState([]);
    const [events, setEvents] = useState([]);

    const [eventCategory, setEventCategory] = useState('');
    const [eventType, setEventType] = useState('');
    const [event, setEvent] = useState<any>(null);

    const [resultParticipants, setResultParticipants] = useState([]);
    const [autoCompleteParticipants, setAutoCompleteParticipants] = useState([]);
    const [eventRegisterID, setEventRegisterID] = useState<any>(null);

    const getResultParticipants = async (event: any) => {
        setAutoCompleteParticipants([]);
        setEventRegisterID(null);
        if(event){
            try {
                setParticipantsLoading(true);
                const response = await axiosInterceptorInstance.get(`v1/resultparticipants?fk_EventCategory=${eventCategory || 0}&fk_EventType=${eventType || 0}&id_Event=${event?.id || 0}&registrationID=&id_Company=0`);
                if (response?.data) {
                    const result = response.data.result;
                    setResultParticipants(result);
                    const autoCompleteParticipants: any = result.map((ele: any) => ({ id: ele.iD_EventRegisterDetails, label: `${ele.registrationID} (${ele.firstName}, ${ele.companyName})` }))
                    setAutoCompleteParticipants(autoCompleteParticipants);
                    setParticipantsLoading(false);
                }
            } catch (error) {
                setParticipantsLoading(false);
                console.error(error);
            }

        }
    };

    const eventCategoryChange = (id: number) => {
        if (Number(eventCategory) !== id) {
            setEventType('');
            setEvent(null);
            setAutoCompleteEvents([]);
            setEventRegisterID(null);
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

    const eventTypeChange = (id: number) => {
        if (Number(eventType) !== id) {
            setEvent(null);
            setEventRegisterID(null);
            setAutoCompleteEvents([]);
        }
        findEvents(Number(id));
    }

    const findEvents = (id: number) => {
        const events: any = allEvents.filter((event: any) => event.fK_EventType === Number(id));
        setEvents(events);
        const autoCompleteEvents = events.map((ele: any) => ({ id: ele.iD_Event, label: ele.eventName }))
        setAutoCompleteEvents(autoCompleteEvents);
    }

    const { setValue } = useForm();
    const form = useForm<formValues>({
        defaultValues: {
            eventCategoryID: row?.eventCategoryID || null,
            eventTypeID: row?.eventTypeID || null,
            eventID: row?.eventID || null,
            eventRegisterID: row?.eventRegisterID || null,
            eventPosition: row?.eventPosition || "",
            resultApproved: row?.resultApproved || null
        }
    });

    const { register, handleSubmit, formState, getValues } = form;
    const { errors } = formState;
    const onSubmit = async (data: formValues) => {
        setOpenConfirmAlert(true);

    }

    const handleConfirmAlertClose = (status: boolean = false) => {
        if (status) {
            updateResult(getValues())
        }
        setOpenConfirmAlert(false);
    }

    const updateResult = async (data: any) => {
        setErrMsg('');
        setLoading(true);
        const payLoad =  {
            // "ID_EventResult": row?.ID_EventResult || 0,
            "FK_EventRegisterDetail": eventRegisterID?.id,
            "EventPosition": data.eventPosition,
            "IsApproved": 0, //data.resultApproved,
            // "@IsDeleted": false,    
            "CreatedBy": userInfo.iD_Users,
            "ModifiedBy": userInfo.iD_Users
        }
        
        try {
            const response = await axiosInterceptorInstance.post(`v1/eventresult`, payLoad);
            if (response?.data) {
                const result = response.data.result;
                // console.log(result)
                if (result.responseStatus) {
                    onClose(true);
                } else {
                    setErrMsg(result.responseMessage);
                }
                setLoading(false);
            }
        } catch (error: any) {
            showMessage(error, 'error');
            console.error(error);
        }
    };
    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>


                <FormControl sx={{ width: '100%', maxWidth: '100%', mb: 3 }}>
                    <InputLabel id="eventCategoryID-label" size="small">Category</InputLabel>
                    <Select
                        size="small"
                        id="eventCategoryID"
                        label="eventCategoryID"
                        {...register("eventCategoryID", { required: "Event category is required" })}
                        error={!!errors.eventCategoryID}
                        defaultValue={row?.eventCategoryID}
                        disabled={loading}
                        value={eventCategory}
                        onChange={(e: any) => { setEventCategory(e.target.value); eventCategoryChange(e.target.value) }}>
                        {EVENT_CATEGORY.map((item, index: number) => (
                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: '100%', maxWidth: '100%', mb: 3 }}>
                    <InputLabel id="eventType-label" size="small">Event Type</InputLabel>
                    <Select
                        size="small"
                        id="eventTypeID"
                        label="eventTypeID"
                        {...register("eventTypeID", { required: "Event type is required" })}
                        error={!!errors.eventTypeID}
                        defaultValue={row?.eventTypeID}
                        disabled={loading}
                        value={eventType}
                        onChange={(e: any) => { setEventType(e.target.value); eventTypeChange(e.target.value) }}>
                        {eventTypes.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.fK_EventType}>{item.eventTypeName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ width: '100%', maxWidth: '100%', mb: 3 }}>

                    <Autocomplete
                        id="events"
                        options={autoCompleteEvents}
                        sx={{ width: '100%' }}                   
                        disabled={loading}
                        value={event}
                        onChange={(event: any, newValue: any | null) => { setEvent(newValue); getResultParticipants(newValue) }}
                        renderInput={(params) => <TextField {...params} label="Event" {...register("eventID", { required: "Event is required" })}
                        error={!!errors.eventID}
                        // helperText={errors.eventID?.message} 
                        sx={{ margin: 0 }} size="small" />}
                    />

                </FormControl>

                <FormControl sx={{ width: '100%', maxWidth: '100%', mb: 3 }}>

                    <Autocomplete
                        id="eventRegisterID"
                        options={autoCompleteParticipants}
                        sx={{ width: '100%' }}
                        disabled={loading || participantsLoading}
                        loading={participantsLoading}     
                        value={eventRegisterID}
                        onChange={(event: any, newValue: any | null) => { setEventRegisterID(newValue); }}
                        renderInput={(params) => 
                                <TextField {...params} label="Participants" 
                                {...register("eventRegisterID", { required: "Participants is required" })}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                      <React.Fragment>
                                        {participantsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                      </React.Fragment>
                                    ),
                                  }}
                                error={!!errors.eventRegisterID}
                                // helperText={errors.eventID?.message} 
                                sx={{ margin: 0 }} size="small" />}
                    />

                </FormControl>

                <FormControl sx={{ width: '100%', maxWidth: '100%', mb: 3}}>
                    <InputLabel id="eventposition-label" size="small">Position</InputLabel>
                    <Select
                        size="small"
                        fullWidth
                        id="eventPosition"
                        label="eventPosition"
                        {...register("eventPosition", { required: "Position is required" })}
                        error={!!errors.eventPosition}
                        defaultValue={row?.eventPosition ? row.eventPosition : ''}
                        disabled={loading}>
                        {RESULT_POSITION_ENUMS.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.id}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* <FormControl sx={{ width: '100%', mb: 3 }}>
                    <InputLabel id="resultApproved-label" size="small">Result Status</InputLabel>
                    <Select
                        size="small"
                        fullWidth
                        id="resultApproved"
                        label="resultApproved"
                        {...register("resultApproved", { required: "Result status is required" })}
                        error={!!errors.resultApproved}
                        defaultValue={row?.resultApproved}
                        disabled={loading}>
                        {RESULT_STATUS_ENUMS.map((item: any, index: number) => (
                            <MenuItem key={index} value={item.id}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl> */}

                <LoadingButton
                    type="submit"
                    fullWidth
                    loading={loading}
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 2, mb: 2, maxWidth: '100%', }}
                >
                    <span>Submit</span>
                </LoadingButton>

                {
                    errMsg ?
                        <div className="mt-1 mb-3 text-sm">
                            <MuiAlert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {errMsg}
                            </MuiAlert>
                        </div>
                        : <></>
                }

            </Box>

            <ConfirmAlert open={openConfirmAlert} onClose={handleConfirmAlertClose} type={'CONFIRM'} title={'Confirm'} message={`Are you sure you want to update result ?`}></ConfirmAlert>

        </>
    )
}

export default Editor;