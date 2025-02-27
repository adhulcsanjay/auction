"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Card,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import Link from "next/link";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TableNoData from "@/app/components/table-no-data";
import axiosInterceptorInstance from "../../../../axiosInterceptorInstance";
import { useSnackbar } from "@/app/hooks/snackbar-service";

interface Event {
  iD_Event: number | string;
  eventName: string;
  eventCategory: string;
  eventFee: number;
}

export default function EventFee() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showMessage } = useSnackbar();
  const [data, setData] = useState<Event[]>([]);
  const [filteredData, setFilteredData] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(1); // Default to "All Events"
  const [searchKeyword, setSearchKeyword] = useState("");

  const categoryname: { [key: number]: string } = {
    1: "Solo",
    2: "Group",
  };

  useEffect(() => {
    getevent();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [selectedCategory, data]);

  const getevent = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInterceptorInstance.get(`/v1/events`);
      if (response?.data) {
        const result = response.data.result;
        console.log("fetched data", result)
        const transformedEvents = result.map((event: any) => ({
          ...event,
          eventCategory: categoryname[event.eventCategory] || event.eventCategory,
          eventFee: event.eventFee,
        }));
        setData(transformedEvents);
        setFilteredData(transformedEvents);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterEvents = () => {
    if (selectedCategory === 1) {
      setFilteredData(data);
    } else if (selectedCategory === 2) {
      setFilteredData(data.filter((event) => event.eventCategory === "Solo"));
    } else if (selectedCategory === 3) {
      setFilteredData(data.filter((event) => event.eventCategory === "Group"));
    }
  };

  const FeeChange = (index: number, value: string) => {
    const updatedData = [...filteredData];
    updatedData[index].eventFee = Number(value)||0;
    setFilteredData(updatedData);
  };

  const SaveFees = async () => {
    if (!selectedDate) {
      showMessage("Please select a date before saving fees.", "error");
      return;
    }

    try {
      setIsLoading(true);

      const adjustedDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        0,
        0,
        0
      );

      const payload = filteredData.map((event) => ({
        iD_Event: event.iD_Event,
        eventFee: event.eventFee,
        eventDate: adjustedDate.toISOString(),
      }));

      const requestBody = {
        Data: JSON.stringify(payload),
      };
  
      console.log("Request Payload:", requestBody);
      

      const response = await axiosInterceptorInstance.post("/v1/eventFee",  requestBody);
      console.log("responsedata",response.data)

      if (response.status === 200) {
        showMessage("Event fees and date saved successfully!", "success");
      } else {
        showMessage("Failed to save event fees and date. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error saving event fees and date:", error);
      showMessage("Error saving event fees and date. Please check the console for details.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ marginBottom: "16px", marginTop: "16px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/user/dashboard">
            Home
          </Link>
          <Typography color="text.primary">Events</Typography>
        </Breadcrumbs>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Event Fee
        </Typography>
      </Box>

      <Card className="p-4" >
       <Grid container spacing={2} alignItems="center" className="p-3">
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue: Date | null) => setSelectedDate(newValue)}
                minDate={new Date()}
                format="dd/MM/yyyy"
              >
              
              </DatePicker>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ width: "250px" }}>
              <InputLabel id="event-category-select-label">Event Category</InputLabel>
              <Select
                labelId="event-category-select-label"
                id="event-category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as number)}
                label="Event Category"
              >
                <MenuItem value={1}>All Events</MenuItem>
                <MenuItem value={2}>Solo Events</MenuItem>
                <MenuItem value={3}>Group Events</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer className="pt-6" sx={{maxHeight: "350px", overflowY: "auto", }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Event Name</TableCell>
                <TableCell>Event Fee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={2}>
                      <Skeleton />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <TableRow key={row.iD_Event}>
                    <TableCell>{row.eventName}</TableCell>
                    <TableCell>
                      <TextField
                        value={row.eventFee}
                        onChange={(e) => FeeChange(index, e.target.value)}
                        placeholder="Enter fee"
                        type="number"
                        
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableNoData query={searchKeyword} colSpan={2} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" marginTop={2}>
          <Button variant="contained" color="primary" onClick={SaveFees}>
            Save Fees
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
