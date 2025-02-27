'use client';
import Search from "@mui/icons-material/Search";
import { Box, Card, InputAdornment, Typography, TextField, Paper, Skeleton, } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axiosInterceptorInstance from "../../../axiosInterceptorInstance";
import Image from "next/image";
import Winner1Icon from '../../public/img/winner-1.svg'
import Winner2Icon from '../../public/img/winner-2.svg'
import NoData from "../components/no-data";

export default function EventResults({ companyId = 0, scrollHeight = 'calc(100vh - 254px)' }: any) {

    interface Column {
        id: string;
        label: string;
        minWidth?: number;
        align?: 'left';
        format?: (value: number) => string;
    }

    const tableHead: readonly Column[] = [
        { id: 'eventName', label: 'Event', minWidth: 80 },
        { id: 'eventCategory', label: 'Category', minWidth: 80 },
        { id: 'eventPosition', label: 'Position', minWidth: 80 },
        { id: 'participantName', label: 'Participant', minWidth: 140 },
        { id: 'registrationID', label: 'Registration ID', minWidth: 150 },
        { id: 'companyName', label: 'Company', minWidth: 150 },
    ]

    const count = useRef(0);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [resultsTemp, setResultsTemp] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        if (count.current === 0) {
            getResults();
        }
        count.current++;
    }, []);

    const getResults = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInterceptorInstance.get(`v1/eventresultdetails?id_Event=0&fk_Company=${companyId}`);
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
                            ele.eventName.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || 
                            ele.eventCategory.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()));
        setResults(filteredData);
    }

    const renderRowContent = (column: any, row: any) => {
        const value = row[column.id];
        switch (column.id) {
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
                    Event Winners
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
                                <Search style={{ fontSize: "20px" }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box sx={{ padding: 0, pt: 0 , height: scrollHeight, overflow: 'auto' }} className='scroll-bar' >
                {results.map((row: any, index: number) => {
                    return (
                        <Box key={index} sx={{ px: 2, pb: 2, borderBottom: `1px solid ${(results.length - 1 !== index) ? 'rgba(224, 224, 224, 1)' : 'transparent'}`}}>
                            <Box sx={{ pt: 2 }}>
                                <Typography sx={{ fontSize: 14, fontWeight: '500', mb: 0 }} gutterBottom>
                                    {row.eventName}
                                </Typography>
                                <Typography sx={{ fontSize: 12, fontWeight: '500', mb: 0 }} color="text.secondary">
                                    {row.eventCategory}
                                </Typography>
                            </Box>
                            <div className="grid grid-cols-12 gap-3 mt-2">
                                {row.result.map((result: any, resultIndex: number) => {
                                    return (                                        
                                    <div key={resultIndex} className={`col-span-12 ${row.result.length === 1 ? 'sm:col-span-12 md:col-span-12' : 'sm:col-span-6 md:col-span-6'}`}>
                                        <Box sx={{ padding: 2, pl: '60px', borderRadius: '4px', background: '#F3F4FF', position: 'relative', height: '100%'}}>
                                            <Typography sx={{ fontSize: 14, fontWeight: '500', textTransform: 'uppercase', mb: 0 }} gutterBottom>
                                                {result.eventPositionLabel} <span style={{ color: '#647df7', fontSize: '18px', lineHeight: '1', position: 'relative', top: '1px'}}> &#x2022;</span> {result.points} Points
                                            </Typography>
                                            <Typography sx={{ fontSize: 14, fontWeight: '500', mb: 0 }} gutterBottom>
                                                {result.participantName}
                                            </Typography>
                                            <Typography sx={{ fontSize: 12, fontWeight: '500', mb: 0 }} color="text.secondary" >
                                                {result.registrationID}
                                            </Typography>
                                            {companyId === 0 && <Typography sx={{ fontSize: 13, fontWeight: '500', mb: 0 }} gutterBottom>
                                                {result.companyName}
                                            </Typography>}
                                            <Box sx={{ position: 'absolute', left: '16px', top: '18px' }}>
                                                {result.eventPosition === '1' ? <Image
                                                    src={Winner1Icon}
                                                    width={25}
                                                    alt="First Position"
                                                    style={{ margin: '0 auto' }}
                                                /> :
                                                <Image
                                                    src={Winner2Icon}
                                                    width={25}
                                                    alt="Second Position"
                                                    style={{ margin: '0 auto' }}
                                                />
                                                }
                                            </Box>
                                        </Box>
                                        
                                    </div>
                                    );
                                })}
                                
                            </div>
                        </Box>
                    );
                })}
                
                         
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
                    <Box sx={{ px: 2, mb: 2}}>                        
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
                
                {/* <TableContainer className='scroll-bar' sx={{ height: 'calc(100vh - 254px)' }}>
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

                            {(!results.length && !isLoading) && <TableNoData query={searchKeyword} colSpan={6} />}
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
                </TableContainer> */}
            </Box>
        </Card>
    )
}
