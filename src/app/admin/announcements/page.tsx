'use client'
import { useEffect, useRef, useState } from "react"
import { Box, Button, Card, Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, alpha, Breadcrumbs, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Skeleton, Paper, DialogProps, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import TableNoData from "@/app/components/table-no-data";
import Link from "next/link";
import axiosInterceptorInstance from "../../../../axiosInterceptorInstance";
import CloseIcon from '@mui/icons-material/Close';
import '../../../public/css/base.css'
import Editor from "./editor";
import ConfirmAlert from "@/app/components/confirm-alert";
import { userData } from "@/app/hooks/use-responsive";
import { format } from "date-fns";
import { useSnackbar } from "@/app/hooks/snackbar-service";

export default function Announcements() {      
    const { showMessage } = useSnackbar();  
    const userInfo = userData();
    const [page, setPage] = useState(2);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editorOpen, setEditorOpen] = useState(false);
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const [dataTemp, setDataTemp] = useState<any>([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [openConfirmAlert, setOpenConfirmAlert] = useState(false);

    interface Column {
        id: string;
        label: string;
        minWidth?: number;
        align?: 'left';
        format?: (value: number) => string;
    }

    const tableHead: readonly Column[] = [
        { id: 'announcementtext', label: 'Announcement', minWidth: 80 },
        { id: 'announcementFromDate', label: 'From Date', minWidth: 150 },
        { id: 'announcementToDate', label: 'To Date', minWidth: 150 },
        { id: 'action', label: 'Action', minWidth: 100 },
    ]

    const renderRowContent = (column: any, row: any) => {
        const value = row[column.id];
        switch (column.id) {
            case "action":
                return <Stack direction="row" spacing={1}>
                        <IconButton aria-label="edit" color="primary" size="medium" onClick={handleEditorDialogOpen('paper', row)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="delete" color="error" size="medium" onClick={() => deleteConfirmHandler(row)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Stack>;
            case "announcementtext":
                return <div dangerouslySetInnerHTML={{ __html: row.announcementtext }}></div>
            case "announcementFromDate":
                return format(new Date(row.announcementFromDate), 'dd/MM/yyyy')
            case "announcementToDate":
                return format(new Date(row.announcementToDate), 'dd/MM/yyyy')
            default:
                return <>                                                                
                        {value}
                        </>;
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInterceptorInstance.get(`v1/announcement`);
            if (response?.data) {
                const result = response.data.result;
                // console.log(result)
                setData(result);
                setDataTemp(result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const filterHandler = (keyword: string) => {
        setSearchKeyword(keyword);
        const filteredData = dataTemp.filter((ele: any) => 
                            ele.announcementtext.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
        setData(filteredData);
    }

    const handleConfirmAlertClose = (status: boolean = false) => {
        if(status){
            deleteHandler(selectedRow);
        }
        setOpenConfirmAlert(false);
    }

    const deleteConfirmHandler = (row: any) => {
        setSelectedRow(row);
        setOpenConfirmAlert(true);
    }

    const deleteHandler = async (row: any) => {
        try {
            const response = await axiosInterceptorInstance.delete(`v1/announcement?iD_Announcement=${row.iD_Announcement}&createdBy=${userInfo.iD_Users}&modifiedBy=${userInfo.iD_Users}`);
            const result = response.data.result;
            if(result.responseStatus){
                setData([]);
                getData();
                showMessage(result.responseMessage, 'success');         
              } else{
                showMessage(result.responseMessage, 'error');
              }
        } catch (error) {
            console.error(error);
            showMessage('Something went wrong!', 'error');
        }
    }

    const handleEditorDialogOpen = (scrollType: DialogProps['scroll'], event: any) => () => {
        setEditorOpen(true);
        setScroll(scrollType);
        setSelectedRow(event);
    };

    const handleEditorDialogClose = (status: boolean = false) => {
        setEditorOpen(false);
        if(status){
            setData([]);
            getData();
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
                    <Typography color="text.primary" sx={{ fontSize: '12px' }}>Announcements</Typography>
                </Breadcrumbs>
                <Typography variant="h5" color="text.primary" sx={{ fontSize: '18px', fontWeight: 500 }}>Announcements</Typography>
            </Box>

            <div className="grid grid-cols-12 gap-4">

                <div className="col-span-12">
                    <Card sx={{ boxShadow: 0 }}>         
                        <Box sx={{ overflowX: 'auto' }}>
                                   
                            <Box sx={{ width: '100%', minWidth: 800,  padding: '16px', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>

                                <TextField
                                    size="small"
                                    margin="normal"
                                    id="searchKeyword"
                                    label="Search"
                                    sx={{ margin: 0, height: 'auto'}}
                                    onChange={(e: any) => {filterHandler(e.target.value)}}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 0, mb: 0, height: '35px' }}
                                    startIcon={<AddIcon/>}
                                    onClick={handleEditorDialogOpen('paper', null)}
                                  
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
                                        {data.map((row: any) => {return (
                                                <TableRow key={row.iD_Announcement}>
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
                                           
                                        )})}

                                        {(!data.length && !isLoading) && <TableNoData query={searchKeyword} colSpan={14} />}
                                        { isLoading && <>
                                            <TableRow>
                                                <TableCell colSpan={14}>
                                                    <Paper
                                                        sx={{
                                                            textAlign: 'center',
                                                            boxShadow: 'none',
                                                        }}
                                                    >
                                                        <Skeleton height={60}/>
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
                            {/* <TablePagination
                                component="div"
                                count={100}
                                page={page}
                                onPageChange={() => {}}
                                rowsPerPage={5}
                                rowsPerPageOptions={[5, 10, 25]}
                                onRowsPerPageChange={() => {}}
                                /> */}
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
                open={editorOpen}
                onClose={() => {handleEditorDialogClose()}}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Announcement</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => {handleEditorDialogClose()}}
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
                    <Editor row={selectedRow} onClose={handleEditorDialogClose}/>
                </DialogContent>
                {/* <DialogActions>
                </DialogActions> */}
            </Dialog>

            <ConfirmAlert open={openConfirmAlert} onClose={handleConfirmAlertClose} type={'CONFIRM'} title={'Delete'} message={`Are you sure you want to delete "${selectedRow?.announcementtext}" ?`}></ConfirmAlert>

        </Container>
    )
}
