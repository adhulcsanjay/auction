'use client';
import Search from "@mui/icons-material/Search";
import { Box, Card, InputAdornment, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Stack, IconButton, Paper, Skeleton, DialogProps, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axiosInterceptorInstance from "../../../axiosInterceptorInstance";
import TableNoData from "../components/table-no-data";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import EventResults from "./event-results";
import Image from "next/image";
import ChampionsIcon from '../../public/img/champions.svg'
import NoData from "../components/no-data";

export default function CompanyResults() {

    interface Column {
        id: string;
        label: string;
        minWidth?: number;
        align?: 'left';
        format?: (value: number) => string;
    }

    const tableHead: readonly Column[] = [
        { id: 'companyName', label: 'Name', minWidth: 200 },
        { id: 'totalPoints', label: 'Points', minWidth: 80 },
        { id: 'action', label: '', minWidth: 0 },
    ]

    const count = useRef(0);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [resultsTemp, setResultsTemp] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
    const [selectedRow, setSelectedRow] = useState<any>(null);
  
    useEffect(() => {
      if (count.current === 0) {
        getResults();
      }
      count.current++;
    }, []);
  
    const getResults = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInterceptorInstance.get(`v1/eventresultgoroupbycompany?id_Event=0`);
        if (response?.data) {
          const result = response.data.result;
          setResults(result);
          setResultsTemp(result);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    const filterHandler = (keyword: string) => {
        setSearchKeyword(keyword);
        const filteredData = resultsTemp.filter((ele: any) => 
                            ele.companyName.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
        setResults(filteredData);
    }

    const handleDialogOpen = (scrollType: DialogProps['scroll'], row: any) => {
        setOpen(true);
        setScroll(scrollType);
        setSelectedRow(row);
    }

    const handleDialogClose = () => {
        setOpen(false);
        setSelectedRow(null);
      };

    const renderRowContent = (column: any, row: any) => {
        const value = row[column.id];
        switch (column.id) {
            case "action":
                return <Stack direction="row" spacing={1}>
                        <IconButton aria-label="edit" color="primary" size="medium" onClick={() => handleDialogOpen('paper', row)}>
                            <VisibilityIcon fontSize="small" />
                        </IconButton>
                    </Stack>;
            default:
                return <>
                    {value}
                </>;
        }
    };
    
    return (
        <Card sx={{ boxShadow: 0, background: '#fff', height: '100%' }}>
            <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(224, 224, 224, 1)' }}>
                <Typography sx={{ fontSize: 16, fontWeight: '500', mb: 0 }} gutterBottom>
                    Top Companies
                </Typography>
                <TextField
                    className="search-field"
                    size="small"
                    margin="normal"
                    id="searchKeyword"
                    // label="Search"
                    placeholder='Search'
                    sx={{ margin: 0, fontSize: '10px' }}
                    onChange={(e: any) => {filterHandler(e.target.value)}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search style={{fontSize: "20px"}}/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box sx={{ padding: 0, pt: 0 }}>
                <TableContainer className='scroll-bar' sx={{ height: 'calc(100vh - 254px)' }}>
                    {results.length !== 0 &&
                    <Table stickyHeader sx={{ minWidth: '100%' }} aria-label="table">
                        <TableHead>
                            <TableRow>
                                {tableHead.map((column) => (
                                    <TableCell key={column.id} align={column?.align} style={{ minWidth: column.minWidth }}
                                    >{column.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((row: any, index: number) => {
                                return (
                                    <TableRow key={index} style ={ index % 2? { background : "rgb(240, 242, 255, 0.7)" }:{ background : "white" }}>
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

                            {/* {(!results.length && !isLoading) && <TableNoData query={searchKeyword} colSpan={3} />}
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
                            </>} */}
                        </TableBody>
                    </Table>
                    }
                                   
                    {(!results.length && !isLoading) && <NoData data={{
                        title: "No data found!",
                        description: "",
                        icon: {
                            type: 'material',
                            name: 'feed_outlined',
                            size: '30px',
                            color: 'var(--primary)',
                        }
                    }} />}
                    {isLoading && <>      
                        <Box sx={{ px: 2, mb: 2, borderTop: '1px solid rgba(224, 224, 224, 1)'}}>                   
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
                                <Skeleton height={60} />
                                <Skeleton height={60} />
                            </Paper>
                        </Box>
                    </>}
                </TableContainer>
            </Box>

            <Dialog
                open={open}
                onClose={handleDialogClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Overview</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers={scroll === 'paper'} sx={{p: 0, width: '800px', maxWidth: '100%'}}>
                    <Card sx={{ boxShadow: 0, background: '#fff', height: '100%', position: 'relative', overflow: 'hidden' }}>
                        <Box sx={{ padding: 3, display: 'flex', justifyContent: 'space-between', gap: '20px', position: 'relative', zIndex: 1 }}>
                            <Box sx={{ width: 'calc(100% - 100px)' }}>
                                {/* <Typography sx={{ fontSize: 14, fontWeight: '500' }} color="text.secondary" className='truncate' gutterBottom>
                                    Overview
                                </Typography> */}
                                <Typography sx={{ fontSize: 18, fontWeight: '500' }} className='truncate'>
                                    {selectedRow?.companyName}
                                </Typography>
                                <Typography sx={{ fontSize: 22, fontWeight: '500' }} className='truncate'>
                                    {selectedRow?.totalPoints} Points
                                </Typography>

                                <div className="grid grid-cols-12 gap-3 mt-2">
                                    <div className="col-span-6">
                                        <Box>
                                            <Typography sx={{ fontSize: 14, fontWeight: '500', mb: 0 }} color="text.secondary" gutterBottom>
                                                Rally Points
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, fontWeight: '500', mb: 0 }} >
                                                {selectedRow?.rallyPoints}
                                            </Typography>
                                        </Box>
                                    </div>
                                    <div className="col-span-6">
                                        <Box>
                                            <Typography sx={{ fontSize: 14, fontWeight: '500', mb: 0 }} color="text.secondary" gutterBottom>
                                                Event Points
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, fontWeight: '500', mb: 0 }}>
                                                {selectedRow?.points}
                                            </Typography>
                                        </Box>
                                    </div>
                                </div>
                            </Box>
                            <Box sx={{ width: '80px', height: '80px', borderRadius: '10px', background: '#A7A4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    src={ChampionsIcon}
                                    width={40}
                                    alt="The Champions of Tarang"
                                    style={{ margin: '0 auto' }}
                                />
                            </Box>
                        </Box>
                        <div className='box-1'>
                            <div className='shape-1'></div>
                            <div className='shape-2'></div>
                        </div>
                    </Card>
                    <EventResults companyId={selectedRow?.fK_Company || 0} scrollHeight={'calc(100vh - 340px)'}/>
                </DialogContent>
            </Dialog>
        </Card>
    )
}
