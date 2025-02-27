"use client";
import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    Container,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    TextField,
    Breadcrumbs,
    IconButton,
    DialogProps,
    Skeleton,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axiosInterceptorInstance from "../../../../axiosInterceptorInstance";
import Link from "next/link";
import { useSnackbar } from "@/app/hooks/snackbar-service";
import ImageUploadPage from "./imageupload";
import ConfirmAlert from "@/app/components/confirm-alert";
import TableNoData from "@/app/components/table-no-data";

export default function Events() {
    const { showMessage } = useSnackbar();
    const [data, setData] = useState<any[]>([]);
    const [dataTemp, setDataTemp] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [selectedImageRow, setSelectedImageRow] = useState<any>(null);
    const [editorOpen, setEditorOpen] = useState(false);
    const [openImageUpload, setOpenImageUpload] = useState(false);
    const [openConfirmAlert, setOpenConfirmAlert] = useState(false);
    const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
    const [isLoading, setIsLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    const categoryname: { [key: number]: string } = {
        1: "Solo",
        2: "Group",
    };

    const eventTypeMapping: { [key: number]: string } = {
        1: "Music (Solo)",
        2: "Music (Group)",
        3: "Dance (Solo)",
        4: "Dance (Group)",
        5: "Acting (Solo)",
        6: "Acting (Group)",
        7: "Drawing (Solo)",
        8: "Writing (Solo)",
        9: "Design (Solo)",
        10: "Instruments (Solo)",
        11: "Others (Solo)",
        12: "Others (Group)"
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInterceptorInstance.get(`/v1/events`);
            if (response?.data) {
                const result = response.data.result;
                const transformedEvents = result.map((event: any) => ({
                    ...event,
                    eventCategory: categoryname[event.eventCategory] || event.eventCategory,
                    eventTypeName: eventTypeMapping[event.eventTypeName] || event.eventTypeName,
                }));
                setData(transformedEvents);
                setDataTemp(transformedEvents);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditorDialogOpen = (scrollType: DialogProps["scroll"], event: any) => () => {
        setEditorOpen(true);
        setScroll(scrollType);
        setSelectedRow(event);
    };

    const handleEditorDialogClose = (status: boolean = false, updatedEvent?: any) => {
        setEditorOpen(false);
        if (status && updatedEvent) {
            const updatedData = data.map((item) =>
                item.iD_Event === updatedEvent.iD_Event
                    ? {
                        ...updatedEvent,
                        eventCategory: categoryname[updatedEvent.eventCategory],
                        eventTypeName: eventTypeMapping[updatedEvent.eventTypeName],
                    }
                    : item
            );
            setData(updatedData);
        }
    };

    const deleteHandler = async (row: any) => {
        try {
            const response = await axiosInterceptorInstance.delete(
                `v1/events?iD_Event=${row.iD_Event}`
            );
            if (response.data.result.responseStatus) {
                setData(data.filter((item) => item.iD_Event !== row.iD_Event));
                showMessage("Event deleted successfully!", "success");
            } else {
                showMessage("Failed to delete event.", "error");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            showMessage("Something went wrong!", "error");
        }
    };

    const handleConfirmAlertClose = (status: boolean = false) => {
        if (status) deleteHandler(selectedRow);
        setOpenConfirmAlert(false);
    };

    const filterHandler = (keyword: string) => {
        setSearchKeyword(keyword);
        setData(
            dataTemp.filter((item) =>
                item.eventName.toLowerCase().includes(keyword.toLowerCase())
            )
        );
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
                <Typography variant="h5" sx={{ fontWeight: 500 }}>
                    Events
                </Typography>
            </Box>

            <Card>
                <Box sx={{ display: "flex", justifyContent: "space-between", padding: "16px" }}>
                    <TextField
                        label="Search"
                        size="small"
                        value={searchKeyword}
                        onChange={(e) => filterHandler(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleEditorDialogOpen("paper", null)}
                    >
                        ADD NEW
                    </Button>
                </Box>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Event Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Event Type</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell colSpan={4}>
                                            <Skeleton />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : data.length > 0 ? (
                                data.map((row) => (
                                    <TableRow key={row.iD_Event}>
                                        <TableCell>{row.eventName}</TableCell>
                                        <TableCell>{row.eventCategory}</TableCell>
                                        <TableCell>{row.eventTypeName}</TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1}>
                                                <IconButton
                                                    color="primary"
                                                    onClick={handleEditorDialogOpen("paper", row)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => {
                                                        setSelectedRow(row);
                                                        setOpenConfirmAlert(true);
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => {
                                                        setSelectedImageRow(row);
                                                        setOpenImageUpload(true);
                                                    }}
                                                >
                                                    <AddAPhotoIcon />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableNoData query={searchKeyword} colSpan={4} />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Dialog open={editorOpen} onClose={() => handleEditorDialogClose()}>
                <DialogTitle>{selectedRow ? "Edit Event" : "Add Event"}</DialogTitle>
                <DialogContent>
                </DialogContent>
            </Dialog>

            <Dialog open={openImageUpload} onClose={() => setOpenImageUpload(false)}>
                <DialogTitle>
                    Upload Image for {selectedImageRow?.eventName}
                    <IconButton
                        sx={{ position: "absolute", right: 8, top: 8 }}
                        onClick={() => setOpenImageUpload(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                <ImageUploadPage
                   iD_Events={selectedImageRow?.iD_Event}
                   onClose={() => setOpenImageUpload(false)}
                 />
                </DialogContent>
            </Dialog>

            <ConfirmAlert
                open={openConfirmAlert}
                onClose={handleConfirmAlertClose}
                type="CONFIRM"
                title="Delete Event"
                message={`Are you sure you want to delete "${selectedRow?.eventName}"?`}
            />
        </Container>
    );
}
