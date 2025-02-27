'use client'

import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';
import { useRouter } from 'next/navigation';
import * as XLSX from 'xlsx';

import React, { useState, useEffect } from 'react';
;
import {
  Modal, 
  Button,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Typography,
  TablePagination,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Link,
  Stack,
  Container,
  Breadcrumbs,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Edit, Search, Visibility } from '@mui/icons-material';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';
import { register } from 'module';

interface Member {
  dateOfBirth: string;
  createdDate: string;
  occupation: string;
  iD_PartyMember: number;
  name: string;
  stateSerial: string;
  age: number;
  sex: string;
  maritalStatus: string;
  education: string;
  currentOccupation: string;
  yearInWhichJoinedParty: number;
  statusInPartyOrganisation: string;
  fK_DISTRICT: number;
  fK_State: number;
  districtName?: string; 
  stateName?: string;
}


const MobileCard = ({ member, onView, onEdit }: { 
  member: Member; 
  onView: (id: number) => void;
  onEdit: (id: number) => void;
}) => (
  <Card sx={{ mb: 2, boxShadow: 2 }}>
    <CardContent>
      <Grid container spacing={2} sx={{ width: "calc(100% + 32px)" }}>
       
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: '#e5e7eb',
          }}
        >
          <Typography variant="h6" component="div">
            {member.name}
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              onClick={() => onView(member.iD_PartyMember)}
              title="View Details"
            >
              <Visibility />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onEdit(member.iD_PartyMember)}
              title="Edit Member"
            >
              <Edit />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={1}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Typography color="textSecondary">State:</Typography>
            <Typography>{member.stateName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Typography color="textSecondary">Age:</Typography>
            <Typography>{member.age}</Typography>
          </Box>
        </Grid>
       
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', padding: '10px 0' }}>
            <Typography color="textSecondary">Occupation:</Typography>
            <Typography>{member.occupation}</Typography>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);


export default function CredentialList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const router = useRouter();
  const [searchName, setSearchName] = useState('');
const [searchState, setSearchState] = useState('');
const [searchAge, setSearchAge] = useState('');
const [searchOccupation, setSearchOccupation] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
   const [offset, setOffset] = useState(0);
  const [pagesize, setPagesize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);   
   const [selectedUser, setSelectedUser] = useState<any>(null); 
   const [viewType, setViewType] = useState('list');
   const [searchKeyword,setSearchKeyword] = useState('')

  const [openModal, setOpenModal] = useState(false); 
  
  useEffect(() => {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      setPage(parseInt(savedPage, 10));
    }
    fetchMembers();
  }, []);

  
  useEffect(() => {
    
    localStorage.setItem('currentPage', page.toString());
  }, [page]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getGridCols = () => {
    if (theme.breakpoints.values.xl <= window.innerWidth) return 4;
    if (theme.breakpoints.values.lg <= window.innerWidth) return 3;
    if (theme.breakpoints.values.md <= window.innerWidth) return 2;
    return 1;
  };
  const exportToExcel = () => {
    const dataToExport = searchName || searchAge || searchOccupation 
      ? members  
      : filteredMembers; 
  
    if (dataToExport.length === 0) {
      alert("No data available to export.");
      return;
    }
  
    const filteredData = dataToExport.map(member => ({
      Name: member.name,
      State:member.stateName,
      DOB:member.dateOfBirth,
      Age: member.age,
      Occupation: member.occupation
  }));

  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Members");

    
    XLSX.writeFile(workbook, `members_list.xlsx`);
  };
  const fetchMembers = async () => {
    try {
      setLoading(true);
    
      const response = await axiosInterceptorInstance.get(`/v1/partySelect?offset=${offset}&limit=1000`);
      
      
      console.log(response); 
  
     
      const { result} = response.data; 
  
      console.log("Response Data:", result);
      console.log("Total Count:", result.length);
      setTotalCount(result.length);
      
      setMembers(result);
      setFilteredMembers(result);
     
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };
 


  const filterHandler = () => {
    let filtered = [...filteredMembers]; // Start with the full list
  
    if (searchName.trim()) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
  
    if (searchAge.trim()) {
      filtered = filtered.filter((item) =>
        item.age.toString().includes(searchAge)
      );
    }
  
    if (searchOccupation.trim()) {
      filtered = filtered.filter((item) =>
        item.occupation.toLowerCase().includes(searchOccupation.toLowerCase())
      );
    }
  
    setMembers(filtered);
  };
  
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setOffset(newPage * rowsPerPage);
    fetchMembers();
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10) || 10);
    setPagesize(parseInt(event.target.value, 10))
    setOffset(0);
    setPage(0);
    fetchMembers();
  };

  const handleEdit = (iD_PartyMember: number) => {
    sessionStorage.setItem('iD_PartyMember', iD_PartyMember.toString());
    router.push(`/admin/cred-register`);
  };
  
  
  
  
  const handleView = async (iD_PartyMember: number) => {
    try {
       
        const response = await axiosInterceptorInstance.get(
            `/v1/partySelect?id_PartyMember=${iD_PartyMember}`
        );
   if (response.data.result && response.data.result.length > 0) {
            setSelectedUser(response.data.result[0]); 
            setOpenModal(true); 
        } else {
            console.error("No data found for this ID");
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
};



const handleClose = () => {
    setOpenModal(false);
    setSelectedUser(null); 
};
console.log("members",members)
  return (
    <Container sx={{ px: '0 !important', maxWidth: 'none !important' }}>
            <Modal open={openModal} onClose={handleClose}>
             <Box
           sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: {
                  xs: "90vw !important",
                  sm: "95vw !important",
                  md: "90vw !important",
                }, 
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                overflowY: 'auto', 
                maxHeight: '90vh',
                }}
              >
                <Typography variant="h6" component="h1"   sx={{
                textAlign: "center",
                mb: 3,
                fontWeight: "bold",
            }}>
                {selectedUser ? ` ${selectedUser.name}` : "No User Selected"}'S Details
                </Typography>

                {selectedUser  ? (
                    
               
                <Grid container spacing={10}>
                 
                  <Grid item xs={12} sm={6}>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Age</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.age}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Gender</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.gender}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">State</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.stateName}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Marital Status</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.maritialStatus}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Education</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.education}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Date of Birth</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{new Date(selectedUser.dateOfBirth).toLocaleDateString('en-GB')}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Current Occupation</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.occupation}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Disabled Person</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.disability}</div>
                    </div>
                 
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Year Joined Party</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.yearInWhichJoinedParty}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Party Status</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.statusInPartyOrganisation}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Attending Congress As</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{new Date(selectedUser.attendingCongressAs).toLocaleDateString('en-GB')}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Social Background</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.socialBackground}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Monthly Income</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.monthlyIncome}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Class Origin</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.classOrigin}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Entry Into Party Through</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.entryIntoPartyThrough}</div>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">If a Whole Timer</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.ifaWholeTimer}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Position in Mass Organisation</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.positioninmassOrganisation}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                    <div className="col-span-4 font-medium">Created Date</div>
                    <div className="col-span-1 font-medium">:</div>
                    <div className="col-span-7">{new Date(selectedUser .createdDate).toLocaleDateString('en-GB')}</div>
                  </div>
                   
                  </Grid>

                 
                  <Grid item xs={12} sm={6}>
                    
                   
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Front Currently Working In</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.frontCurrentlyWorkingIn}</div>
                    </div>
                  
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Number of Party Congresses Attended</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.numberOfPartyCongressesAttended}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Years Spent in Jail</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.yearsInJail}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Months Spent in Jail</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.monthsInJail}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Days Spent in Jail</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.daysInJail}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">No of Times Imprisoned</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.timesImprisioned}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Underground Life Years</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.yearsInUnderground}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Underground Life Months</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.monthsInUnderground}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Underground Life Days</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.daysInUnderground}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Underground Life No of Times</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.timesUnderground}</div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Elected Position Held Currently</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.electedPositionHeldCurrently}</div>
                    </div>
                   
                    <div className="grid grid-cols-12 gap-3 mb-2">
                      <div className="col-span-4 font-medium">Comments</div>
                      <div className="col-span-1 font-medium">:</div>
                      <div className="col-span-7">{selectedUser.comments}</div>
                    </div>
                  </Grid>
                </Grid>

                ) : (
                    <Typography>Loading...</Typography>
                )}

               <div className='flex justify-center'>
               <Button
                    variant="contained"
                    onClick={handleClose}
                    sx={{ mt: 3 }}
                >
                    Close
                </Button>
               </div>
            </Box>
        </Modal>
    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
    </Stack>

    <Box sx={{ marginBottom: '16px', marginTop: '16px' }}>
   
    <Typography variant="h5" color="text.primary" sx={{ fontSize: '18px', fontWeight: 500 }}>Communist Party of India (Marxist): 24th Congress - Registered Members</Typography>
   </Box>

    <Box >
      <Card>
        <CardContent>
          

        <Card>
  <CardContent>
    <Grid container spacing={2} sx={{ mb: 3 }}>
     
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Search by Name"
          variant="outlined"
          size="small"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </Grid>

   

     
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Search by Age"
          variant="outlined"
          size="small"
          type="number"
          value={searchAge}
          onChange={(e) => setSearchAge(e.target.value)}
        />
      </Grid>

      {/* Occupation Filter */}
      <Grid item xs={12} md={3}>
        <TextField
          fullWidth
          label="Search by Occupation"
          variant="outlined"
          size="small"
          value={searchOccupation}
          onChange={(e) => setSearchOccupation(e.target.value)}
        />
      </Grid>

  
      <Grid item xs={12} md={3} gap={5}>
        <Button
         
          variant="contained"
          color="primary"
          onClick={filterHandler}
        >
          Apply Filters
        </Button >
        <Button 
        className='ms-4'
        variant="contained" 
        color="primary" 
        onClick={exportToExcel}
      >
        Download Report
      </Button>


            </Grid>
          </Grid>
        </CardContent>
      </Card>

          {isMobile ? (
            <Box>
              {loading ? (
                <Typography align="center">Loading...</Typography>
              ) : members.length === 0 ? (
                <Typography align="center">No members found</Typography>
              ) : (
                members
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((member) => (
                    <MobileCard
                      key={member.iD_PartyMember}
                      member={member}
                      onView={handleView}
                      onEdit={handleEdit}
                    />
                  ))
              )}
            </Box>
          ) : viewType === 'grid' ? (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                {loading ? (
                  <Grid item xs={12}>
                    <Typography align="center">Loading...</Typography>
                  </Grid>
                ) : members.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography align="center">No members found</Typography>
                  </Grid>
                ) : (
                  members
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((member) => (
                      <Grid item xs={12} sm={6} md={6} lg={4} xl={3} key={member.iD_PartyMember}>
                        <MobileCard
                          member={member}
                          onView={handleView}
                          onEdit={handleEdit}
                        />
                      </Grid>
                    ))
                )}
              </Grid>
            </Box>
          ) : (
        
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="members table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>State </TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Occupation</TableCell>
                
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">Loading...</TableCell>
                  </TableRow>
                ) : members.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">No members found</TableCell>
                  </TableRow>
                ) : (
                  members
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((member) => {{console.log(member)} return (
                      
                      <TableRow key={member.iD_PartyMember}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.stateName}</TableCell>
                        <TableCell>{member.age}</TableCell>
                        <TableCell>{new Date(member.createdDate).toLocaleDateString('en-GB')}</TableCell>
                        <TableCell>{member.occupation}</TableCell>
                       
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleView(member.iD_PartyMember)}
                            title="View Details"
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(member.iD_PartyMember)}
                            title="Edit Member"
                          >
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )})
                )}
              </TableBody>
            </Table>
          </TableContainer>
          )}

          <TablePagination
        component="div"
        count={totalCount || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </CardContent>
      </Card>
    </Box>
     </Container>
  );
}