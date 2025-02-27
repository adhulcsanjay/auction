'use client'
import React, { useEffect, useRef, useState } from "react"
import { Box, Button, Card, Container, Stack, Typography, TextField, FormControl, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem } from "@mui/material"
import axiosInterceptorInstance from "../../../../axiosInterceptorInstance";
import { REPORT_TYPE, REPORTS_NAME } from "../../../../config";
import { useSnackbar } from "@/app/hooks/snackbar-service";

export default function Reports() {
    const count = useRef(0);
    const { showMessage } = useSnackbar();

    const [isLoading, setIsLoading] = useState(false);
    const [credential, setCredential] = useState([]);
    const [filterDateFrom, setFilterDateFrom] = useState<string | null>(null);
    const [filterDateTo, setFilterDateTo] = useState<string | null>(null);
    const [reportType, setReportType] = useState<string>('EXCEL');
    const [reportName, setReportName] = useState<string>('');

    useEffect(() => {
        if (count.current === 0) {
            getCredential();
        }
        count.current++;
    }, []);

    const getCredential = async () => {
        try {
            const response = await axiosInterceptorInstance.get('v1/fillcredentialdropdown');
            if (response.data) {
                const result = response.data.result;
                const credentials = result.map((ele: any) => ({ id: ele.value, label: ele.text }));
                setCredential(credentials);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const showReport = () => {
        if (filterDateFrom && filterDateTo) {
            console.log("Generating report for date range:", filterDateFrom, filterDateTo, "Report Type:", reportType, "Report Name:", reportName);
        } else {
            console.log("No date filter applied.");
        }
    };

    return (
        <Container>
            <Typography variant="h5" sx={{ marginBottom: '16px' }}>Credential Reports</Typography>
            <Card sx={{ padding: '16px' }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <TextField
                        sx={{ width: '300px' }}
                        size="small"
                        label="From Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filterDateFrom || ''}
                        onChange={(e) => setFilterDateFrom(e.target.value)}
                    />
                    <TextField
                        sx={{ width: '300px' }}
                        size="small"
                        label="To Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filterDateTo || ''}
                        onChange={(e) => setFilterDateTo(e.target.value)}
                    />
                    <FormControl sx={{ width: '300px' }}>
                       
                        <RadioGroup value={reportName} onChange={(e) => setReportName(e.target.value)}>
                            {REPORTS_NAME.map((item) => (
                                <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.label} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    <FormControl sx={{ width: '300px' }} fullWidth size="small" margin="normal">
                        <InputLabel id="reporttype-label">Report Format</InputLabel>
                        <Select
                            size="small"
                            id="reportformat"
                            labelId="reporttype-label"
                            value={reportType}
                            onChange={(e) => setReportType(e.target.value)}>
                            {REPORT_TYPE.map((item) => (
                                <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                </Box>
                <Button variant="contained" sx={{ marginTop: '16px',display: 'flex-end', justifyContent: 'space-between' }} onClick={showReport}>Show Report</Button>
            </Card>
          
        </Container>
    );
}
