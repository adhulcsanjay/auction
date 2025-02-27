"use client";
import * as React from 'react';
import { useState, useEffect } from "react";
import { Controller, useForm } from 'react-hook-form';
import { Box, FormHelperText, TextField, Typography, Select, MenuItem, Grid } from '@mui/material'
import { LoadingButton } from "@mui/lab";
import AlertTitle from '@mui/material/AlertTitle';
import MuiAlert from '@mui/material/Alert';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';
import { userData } from '@/app/hooks/use-responsive';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useSnackbar } from '@/app/hooks/snackbar-service';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Input, CircularProgress, Button } from "@mui/material";

type FormValues = {
    eventName: string;
    eventCategory: number;
    eventType: number;
    eventRules: string;
    eventDate?: string;
    eventTime?: string;
    eventLocation?: string;
    eventFee?: number;
    ImageID?: number
}

interface AddEventFormProps {
    row?: any;
    onClose?: (status: boolean) => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ row, onClose }) => {
    const ReactQuill = React.useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
    const { showMessage } = useSnackbar();
    const userInfo = userData();
    
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [eventDate, setEventDate] = useState<Dayjs | null>();
    
    // Initialize form with existing data if editing
    const form = useForm<FormValues>({
        defaultValues: {
            eventName: row?.eventName || '',
            eventCategory: row?.eventCategory || 0,
            eventType: row?.eventType || 0,
            eventRules: row?.eventRules || '',
            eventDate: row?.eventDate || '',
            eventTime: row?.eventTime || '',
            eventLocation: row?.eventLocation || '',
            eventFee: row?.eventFee || undefined,
            ImageID: row?.number
        }
    });

    // Pre-fill date if editing an existing event
    useEffect(() => {
        if (row) {
            setEventDate(dayjs(row?.eventDate));
        }
    }, [row]);

    const handleDateChange = (val: any) => {
        const date = dayjs(val);
        setEventDate(date);
        setValue("eventDate", dayjs(date).format('YYYY-MM-DD'));
    };

    const { register, handleSubmit, formState, setValue, control, watch } = form;
    const { errors } = formState;

    const eventCategory = watch("eventCategory");
    const eventRules = watch("eventRules");

    const getSoloEventTypes = () => [
        { value: 1, label: "Music" },
        { value: 3, label: "Dance" },
        { value: 5, label: "Acting" },
        { value: 7, label: "Drawing" },
        { value: 8, label: "Writing" },
        { value: 9, label: "Design" },
        { value: 10, label: "Instruments" },
        { value: 11, label: "Others" }
    ];

    const getGroupEventTypes = () => [
        { value: 2, label: "Music" },
        { value: 4, label: "Dance" },
        { value: 6, label: "Acting" },
        { value: 12, label: "Others" }
    ];

    const getEventTypes = () => {
        return eventCategory === 1 ? getSoloEventTypes() : 
               eventCategory === 2 ? getGroupEventTypes() : 
               [];
    };

    const onEditorStateChange = (editorState: any) => {
        setValue("eventRules", editorState);
    };

    useEffect(() => {
        register("eventRules", { required: true });
    }, [register]);

    // Reset event type when category changes
    useEffect(() => {
        setValue("eventType", 0);
    }, [eventCategory, setValue]);

    const onSubmit = async (data: FormValues) => {
        setErrMsg('');
        setLoading(true);

        const payLoad = {
            "ID_Event": row?.iD_Event || 0,
            "EventName": data.eventName,
            "EventCategory": data.eventCategory,
            "FK_EventType": data.eventType,
            "EventRules": data.eventRules,
            "EventDate": dayjs(eventDate).format('YYYY-MM-DD'),
            "CreatedBy": userInfo.iD_Users,
            "ModifiedBy": userInfo.iD_Users,
            ...(data.eventTime && { "EventTime": new Date(data.eventTime).toISOString() }),
            ...(data.eventLocation && { "EventLocation": data.eventLocation }),
            ...(data.eventFee && { "EventFee": data.eventFee })
        }

        try {
            const response = await axiosInterceptorInstance.post(`v1/events`, payLoad);
            if (response?.data) {
                const result = response.data.result;
                if (result.responseStatus) {
                    showMessage("Event successfully created!", "success");
                    onClose?.(true);
                } else {
                    setErrMsg(result.responseMessage);
                }
                setLoading(false);
            }
        } catch (error: any) {
            showMessage(error, 'error');
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        label="Event Name"
                        {...register("eventName", { required: "Event Name is required" })}
                        error={!!errors.eventName}
                        helperText={errors.eventName?.message}
                        disabled={loading}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 'normal' }} variant="h6" component="div">
                        Event Category
                    </Typography>
                    <Controller
                        name="eventCategory"
                        control={control}
                        rules={{ required: "Event Category is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                fullWidth
                                size="small"
                                error={!!errors.eventCategory}
                            >
                                <MenuItem value={0} disabled>Select a Category</MenuItem>
                                <MenuItem value={1}>Solo</MenuItem>
                                <MenuItem value={2}>Group</MenuItem>
                            </Select>
                        )}
                    />
                    <FormHelperText className='Mui-error'>{errors.eventCategory?.message}</FormHelperText>
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 'normal' }} variant="h6" component="div">
                        Event Type
                    </Typography>
                    <Controller
                        name="eventType"
                        control={control}
                        rules={{ required: "Event Type is required" }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                fullWidth
                                size="small"
                                error={!!errors.eventType}
                                disabled={eventCategory === 0}
                            >
                                <MenuItem value={0} disabled>Select an Event Type</MenuItem>
                                {getEventTypes().map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        {type.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    <FormHelperText className='Mui-error'>{errors.eventType?.message}</FormHelperText>
                </Grid>

                <Grid item xs={12}>
                    <Typography sx={{ fontSize: 14, mb: 1, fontWeight: 'normal' }} variant="h6" component="div">
                        Event Rules
                    </Typography>
                    <ReactQuill 
                        theme="snow" 
                        value={eventRules} 
                        onChange={onEditorStateChange} 
                        placeholder="Event Rules" 
                    />
                    <FormHelperText className='Mui-error'>{errors.eventRules && "Event Rules are required"}</FormHelperText>
                </Grid>

                <Grid item xs={12}>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={loading}
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 2, mb: 2 }}
                    >
                        <span>{row?.iD_Event ? 'Update' : 'ADD'}</span>
                    </LoadingButton>

                    {errMsg && (
                        <div className="mt-1 mb-3 text-sm">
                            <MuiAlert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {errMsg}
                            </MuiAlert>
                        </div>
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}

export default AddEventForm;