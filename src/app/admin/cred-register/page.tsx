'use client'

import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Grid, Card, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, SelectChangeEvent, Breadcrumbs, Link, Container, FormHelperText,Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,  
  Modal,
Radio,
RadioGroup} from '@mui/material';
import axiosInterceptorInstance from '../../../../axiosInterceptorInstance';
import { useSnackbar } from '@/app/hooks/snackbar-service';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import '../../../public/css/cred.css'
import { cursorTo } from 'readline';


interface FormData {


  ID_PartyMember: number;
  Name: string;
  Sex: string;
  Age: number | '';
  DateOfBirth: string| '';
  MonthlyIncome: number;
  CurrentOccupationOtherDescription: string;
  YearInWhichJoinedParty: number;
  EntryIntoPartyThroughDescription: string;
  PositionInMassOrganisationDescription: string;
  FrontCurrentlyWorkingInDescription: string;
  ElectedPositionDescription: string;
  Comments: string;
  FK_State: number;
  stateName: string;
  FK_MaritalStatus: number;
  FK_AttendingCongressAs: number;
  FK_Education: number;
  FK_CurrentOccupation: number;
  FK_Gender: number;
  FK_SocialBackground: number;
  FK_ClassOrigin: number;
  FK_EntryIntoPartythrough: number;
  FK_IfaWholetimer: number;
  FK_StatusinParty: number;
  FK_PositionInMassOrganisation: number;
  FK_FrontCurrentlyWorkingIn: number;
  FK_TimesImprisoned: number;
  FK_YearsInJail: number;
  FK_MonthsInJail: number;
  FK_DaysInJail: number;
  FK_YearsInUnderground: number;
  FK_MonthsInUnderground: number;
  FK_DaysInUnderground: number;
  FK_NumberOfPartyCongressesAttended: number;
  FK_TimesUnderground: number;
  FK_ElectedPositionHeldCurrently: number;
  user?: number;
  isDisabled: string;
  
}

interface datatype {
  ID: number;
  NAME: string;
}
interface StateType {
  State: datatype[]
};

interface GenderType {
  Gender: datatype[]
}
interface MaritalType {
  MaritalStatus: datatype[]
}
interface AttendingCongressType {
  AttendingCongress: datatype[]
}
interface EducationType {
  Education: datatype[]
}
interface NumberOfPartyCongressesAttendedType {
  NumberOfPartyCongressesAttended: datatype[]
}
interface OccupationType {
  CurrentOccupation: datatype[]
}
interface SocialType {
  SocialBackground: datatype[]
}
interface ClassType {
  ClassOrigin: datatype[]
}
interface EntryIntoPartyThroughType {
  EntryIntoPartythrough: datatype[]
}
interface IfaWholetimeType {
  IfaWholetimer: datatype[]
}

interface StatusinPartyType {
  StatusinParty: datatype[]
}
interface PositionInMassOrganisationType {
  PositionInMassOrganisation: datatype[]
}
interface FrontCurrentlyWorkingInType {
  FrontCurrentlyWorkingIn: datatype[]
}
interface NoOfTimesImprisonedType {
  NoOfTimesImprisoned: datatype[]
}
interface YearsSpentInJailType {
  YearsSpentInJail: datatype[]
}
interface MonthsSpentInJailType {
  MonthsSpentInJail: datatype[]
}

interface DaysSpentInJailType {
  DaysSpentInJail: datatype[]
}
interface UndergroundLifeNoOfTimes {
  UndergroundLifeNoOfTimes: datatype[]
}

interface UndergroundLifeYearsType {
  UndergroundLifeYears: datatype[]
}

interface UndergroundLifeMonthsType {
  UndergroundLifeMonths: datatype[]
}

interface UndergroundLifeDaysType {
  UndergroundLifeDays: datatype[]
}
interface ElectedPositionHeldCurrentlyType {
  ElectedPositionHeldCurrently: datatype[]
}
interface SessionData {
  response: {
    fK_State: any;
    fk_State: number;
    stateName: string;
    userName: string;
    iD_Users: number;
    fK_UserRole: number;

  };
  responseMessage: string;
}


export default function CredRegister() {


  const { showMessage } = useSnackbar();


  const steps = 3;
  const searchParams = useSearchParams();
  const [memberId, setMemberId] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentSection, setCurrentSection] = useState(1);
  const [userId, setUserId] = useState<number>(0);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDisabled, setIsDisabled] = useState<string>("No");
  const [formData, setFormData] = useState<FormData>({
    ID_PartyMember: 0,
     Name: '',
    Sex: '',
    Age: '',
    DateOfBirth: '',
    MonthlyIncome: 0,
    CurrentOccupationOtherDescription: '',
    YearInWhichJoinedParty: 0,
    EntryIntoPartyThroughDescription: '',
    PositionInMassOrganisationDescription: '',
    FrontCurrentlyWorkingInDescription: '',
    ElectedPositionDescription: '',
    Comments: '',
    FK_State: 0,
    stateName:'',
    FK_MaritalStatus: 0,
    FK_AttendingCongressAs: 0,
    FK_Education: 0,
    FK_CurrentOccupation: 0,
    FK_Gender:0,
    FK_SocialBackground: 0,
    FK_ClassOrigin: 0,
    FK_EntryIntoPartythrough: 0,
    FK_IfaWholetimer: 0,
    FK_StatusinParty: 0,
    FK_PositionInMassOrganisation: 0,
    FK_FrontCurrentlyWorkingIn: 0,
    FK_TimesImprisoned: 0,
    FK_YearsInJail: 0,
    FK_MonthsInJail: 0,
    FK_DaysInJail: 0,
    FK_YearsInUnderground: 0,
    FK_MonthsInUnderground: 0,
    FK_DaysInUnderground: 0,
    FK_TimesUnderground: 0,
    FK_ElectedPositionHeldCurrently: 0,
    FK_NumberOfPartyCongressesAttended:0,
    user: 0,
    isDisabled: ' '
   
  });
  
 
  useEffect(() => {
    const savedMemberId = sessionStorage.getItem('iD_PartyMember'); 
    if (savedMemberId) {
      setMemberId(Number(savedMemberId));
    } else if (typeof window !== "undefined") {
      const sessionMemberId = sessionStorage.getItem("userid");
      setMemberId(Number(sessionMemberId));
    }
  }, []);

  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    resetErrors(); // Reset errors when form data is loaded
  }, []);

  useEffect(() => {

    if (memberId > 0) {
      fetchMemberDetails(memberId.toString());
    }
  }, []);
  




  const [state, setStatess] = useState<StateType>({
    State: []
  })

  const [Gender, setGender] = useState<GenderType>({
    Gender: []
  })
  const [MaritalStatus, setMaritalStatus] = useState<MaritalType>({
    MaritalStatus: []
  })
  const [AttendingCongress, setAttendingCongress] = useState<AttendingCongressType>({
    AttendingCongress: []
  })
  const [Education, setEducation] = useState<EducationType>({
    Education: []
  })
  const [CurrentOccupation, setCurrentOccupation] = useState<datatype[]>([])
  const [SocialBackground, setSocialBackground] = useState<SocialType>({
    SocialBackground: []
  })
  const [ClassOrigin, setClassOrigin] = useState<ClassType>({
    ClassOrigin: []
  })
  const [EntryIntoPartythrough, setEntryIntoPartythrough] = useState<EntryIntoPartyThroughType>({
    EntryIntoPartythrough: []
  })
 
  const [IfaWholetimer, setIfaWholetimer] = useState<IfaWholetimeType>({
    IfaWholetimer: []
  })
  const [NumberOfPartyCongressesAttended, setNumberOfPartyCongressesAttended] = useState<NumberOfPartyCongressesAttendedType>({
    NumberOfPartyCongressesAttended: []
  })
  const [StatusinParty, setStatusinParty] = useState<StatusinPartyType>({
    StatusinParty: []
  })
  const [PositionInMassOrganisation, setPositionInMassOrganisation] = useState<PositionInMassOrganisationType>({
    PositionInMassOrganisation: []
  })
  const [FrontCurrentlyWorkingIn, setFrontCurrentlyWorkingIn] = useState<FrontCurrentlyWorkingInType>({
    FrontCurrentlyWorkingIn: []
  })
  const [NoOfTimesImprisoned, setNoOfTimesImprisoned] = useState<NoOfTimesImprisonedType>({
    NoOfTimesImprisoned: []
  })
  const [YearsSpentInJail, setYearsSpentInJail] = useState<YearsSpentInJailType>({
    YearsSpentInJail: []
  })
  const [MonthsSpentInJail, setMonthsSpentInJail] = useState<MonthsSpentInJailType>({
    MonthsSpentInJail: []
  })
  const [DaysSpentInJail, setDaysSpentInJail] = useState<DaysSpentInJailType>({
    DaysSpentInJail: []
  })
  const [UndergroundLifeNoOfTimes, setUndergroundLifeNoOfTimes] = useState<UndergroundLifeNoOfTimes>({
    UndergroundLifeNoOfTimes: []
  })
  const [UndergroundLifeYears, setUndergroundLifeYears] = useState<UndergroundLifeYearsType>({
    UndergroundLifeYears: []
  })
  const [UndergroundLifeMonths, setUndergroundLifeMonths] = useState<UndergroundLifeMonthsType>({
    UndergroundLifeMonths: []
  })
  const [UndergroundLifeDays, setUndergroundLifeDays] = useState<UndergroundLifeDaysType>({
    UndergroundLifeDays: []
  })
  const [ElectedPositionHeldCurrently, setElectedPositionHeldCurrently] = useState<ElectedPositionHeldCurrentlyType>({
    ElectedPositionHeldCurrently: []
  })




  const getDropDownData = async () => {
    try {
      const response = await axiosInterceptorInstance.get(`/v1/DropDownData`);
      if (response.data) {

        const data = JSON.parse(response.data.result)
       setStatess({
          State: data.State
        })

        setGender({
          Gender: data.Gender

        })
        setMaritalStatus({
          MaritalStatus: data.MaritialStatus
        })
        setAttendingCongress({
          AttendingCongress: data.AttendingCongress
        })
        setEducation({
          Education: data.Education
        })
        setCurrentOccupation(data.Occupation)


        setSocialBackground({
          SocialBackground: data.SocialBackground
        })
        setClassOrigin({
          ClassOrigin: data.ClassOrigin
        })
        setEntryIntoPartythrough({
          EntryIntoPartythrough: data.EntryIntopartyThrough
        })
        setIfaWholetimer({
          IfaWholetimer: data.IFAWholeTimer
        })
        setStatusinParty({
          StatusinParty: data.StatusInPartyOrganisation
        })
        setFrontCurrentlyWorkingIn({
          FrontCurrentlyWorkingIn: data.FrontCurrentlyWorkingIn
        })
        setPositionInMassOrganisation({
          PositionInMassOrganisation: data.PositioninmassOrganisation
        })
        setNoOfTimesImprisoned({
          NoOfTimesImprisoned: data.TimesImprisioned
        })
        setYearsSpentInJail({
          YearsSpentInJail: data.YEARS
        })
        setMonthsSpentInJail({
          MonthsSpentInJail: data.MONTHS
        })
        setDaysSpentInJail({
          DaysSpentInJail: data.DAYS
        })
        setUndergroundLifeNoOfTimes({
          UndergroundLifeNoOfTimes: data.TimesUnderground
        })
        setUndergroundLifeYears({
          UndergroundLifeYears: data.YEARS
        })
        setUndergroundLifeMonths({
          UndergroundLifeMonths: data.MONTHS
        })
        setUndergroundLifeDays({
          UndergroundLifeDays: data.DAYS
        })
        setNumberOfPartyCongressesAttended({
          NumberOfPartyCongressesAttended: data.NumberOfPartyCongressesAttended
        })
        setElectedPositionHeldCurrently({
          ElectedPositionHeldCurrently: data.ElectedPositionHeldCurrently
        })


      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    router.push('/admin/cred-register');
  };


  const fetchMemberDetails = async (id: string) => {
    try {
      const response = await axiosInterceptorInstance.get(`/v1/partySelect?id_PartyMember=${memberId}`);
      if (response.data.result && response.data.result.length > 0) {
        const apiData = response.data.result[0];
        setFormData({
          ID_PartyMember: apiData.iD_PartyMember || 0,
          Name: apiData.name || "",
          Sex: apiData.fK_Gender !== 0 ? apiData.fK_Gender : "",
          Age: apiData.age !== "N/A" ? apiData.age : "",
          DateOfBirth: apiData.dateOfBirth || "",
          MonthlyIncome: apiData.monthlyIncome !== "N/A" ? apiData.monthlyIncome : 0,
          CurrentOccupationOtherDescription: apiData.currentOccupationOtherDescription !== "N/A" ? apiData.currentOccupationOtherDescription : "",
          YearInWhichJoinedParty: apiData.yearInWhichJoinedParty !== "N/A" ? apiData.yearInWhichJoinedParty : 0,
          EntryIntoPartyThroughDescription: apiData.entryIntoPartyThroughDescription !== "N/A" ? apiData.entryIntoPartyThroughDescription : "",
          PositionInMassOrganisationDescription: apiData.positionInMassOrganisationDescription !== "N/A" ? apiData.positionInMassOrganisationDescription : "",
          FrontCurrentlyWorkingInDescription: apiData.frontCurrentlyWorkingInDescription !== "N/A" ? apiData.frontCurrentlyWorkingInDescription : "",
          ElectedPositionDescription: apiData.electedPositionDescription !== "N/A" ? apiData.electedPositionDescription : "",
          Comments: apiData.comments !== "N/A" ? apiData.comments : "",
          isDisabled: apiData.disability ?? "no",
          stateName:apiData.stateName||'',
          FK_State: apiData.fK_State || 0,
          FK_MaritalStatus: apiData.fK_MaritalStatus || 0,
          FK_AttendingCongressAs: apiData.fK_AttendingCongress || 0,
          FK_Education: apiData.fK_Education || 0,
          FK_CurrentOccupation: apiData.fK_CurrentOccupation || 0,
          FK_Gender: apiData.fK_Gender || 0,
          FK_SocialBackground: apiData.fK_SocialBackground || 0,
          FK_ClassOrigin: apiData.fK_ClassOrigin || 0,
          FK_EntryIntoPartythrough: apiData.fK_EntryIntoPartythrough || 0,
          FK_IfaWholetimer: apiData.fK_IfAWholetimer || 0,
          FK_StatusinParty: apiData.fK_StatusInPartyOrganisation || 0,
          FK_PositionInMassOrganisation: apiData.fK_PositionInMassOrganisation || 0,
          FK_FrontCurrentlyWorkingIn: apiData.fK_FrontCurrentlyWorkingIn || 0,
          FK_TimesImprisoned: apiData.timesImprisioned !== "N/A" ? Number(apiData.timesImprisioned) : 0,
          FK_YearsInJail: apiData.yearsInJail !== "N/A" ? Number(apiData.yearsInJail) : 0,
          FK_MonthsInJail: apiData.monthsInJail !== "N/A" ? Number(apiData.monthsInJail) : 0,
          FK_DaysInJail: apiData.daysInJail !== "N/A" ? Number(apiData.daysInJail) : 0,
          FK_YearsInUnderground: apiData.yearsInUnderground !== "N/A" ? Number(apiData.yearsInUnderground) : 0,
          FK_MonthsInUnderground: apiData.monthsInUnderground !== "N/A" ? Number(apiData.monthsInUnderground) : 0,
          FK_DaysInUnderground: apiData.daysInUnderground !== "N/A" ? Number(apiData.daysInUnderground) : 0,
          FK_TimesUnderground: apiData.timesUnderground !== "N/A" ? Number(apiData.timesUnderground) : 0,
          FK_NumberOfPartyCongressesAttended: apiData.fK_NumberOfPartyCongressesAttended || 0,
          FK_ElectedPositionHeldCurrently: apiData.fK_ElectedPositionHeldCurrently || 0,
         
          user: apiData.user || 0,
        });
        setIsDisabled(apiData.disability ?? "No");
        console.log("apidata",apiData)
      } else {
        showMessage("No member found with the provided ID", "error");
      }
    } catch (error) {
      console.error("Error fetching member details:", error);
      showMessage("Error fetching member details", "error");
    }
  };
  
  
  useEffect(() => {
    const getUserData = () => {
      try {
        const sessionData = sessionStorage.getItem('session');
        console.log("session",sessionData)
      
        if (sessionData) {
          const parsedSessionData: SessionData = JSON.parse(sessionData);
          setUserDetails(parsedSessionData); // Ensure this is set

          const currentUserId = parsedSessionData.response.iD_Users;
          const fkState = parsedSessionData.response.fK_State;
          const savedFormData = localStorage.getItem('formData');
          const savedMemberId = localStorage.getItem('memberId');
          localStorage.removeItem('formData');
          localStorage.removeItem('memberId');
          setUserId(currentUserId);

          setFormData(prev => ({
            ...prev,
            user: currentUserId,
            Name: parsedSessionData.response.userName || '',
            FK_State: fkState !== undefined ? Number(fkState) : 0,
           
            
          }));
          
        } else {

          router.push('/admin/cred-register');        }
      } catch (error) {
        console.error('Error getting session data:', error);
        showMessage('Error getting user data', 'error');
      }
    };

    getUserData();
    getDropDownData();
    if (memberId > 0) {
      fetchMemberDetails(memberId.toString());
    }
  }, [memberId]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let updatedValue = type === 'number' ? Number(value) : value;
    let errorMessage = '';

 
    if (value.trim() === '') {
        errorMessage = `${name.replace(/([A-Z])/g, ' $1')} is required`;
    }

    if (name === 'YearInWhichJoinedParty') {
        
        if (!/^\d{4}$/.test(value)) {
          errorMessage = 'Year must be exactly 4 digits';
      } 
        
        else if (parseInt(value) > 2025) {
            errorMessage = 'Year cannot exceed 2025';
        }
    }
    
    
  

    setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
    }));

    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
    }));

    localStorage.setItem('formData', JSON.stringify({ ...formData, [name]: updatedValue }));
};

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData)); // Save to local storage
  };

  const calculateAge = (dateOfBirth: string) => {
    const dob = dayjs(dateOfBirth);
    const today = dayjs();
    return today.diff(dob, 'year');
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format('DD/MM/YYYY');
      const age = calculateAge(formattedDate);
      setFormData((prevData) => ({
        ...prevData,
        DateOfBirth: formattedDate,
        Age: age,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        DateOfBirth: '',
        Age: '',
      }));
    }
  };
  const resetErrors = () => {
    setErrors({});
  };
  const nextSection = () => {
    clearErrors();
  
    const newErrors: Record<string, string> = {};
  
    if (currentSection === 1) {
      if (!formData.Name) {
        newErrors.Name = "Name is required";
      }
      if (!formData.DateOfBirth) {
        newErrors.DateOfBirth = "Date of Birth is required";
      }
      if (!formData.FK_Gender) {
        newErrors.FK_Gender = "Gender is required";
      }
      if (!formData.FK_Education) {
        newErrors.FK_Education = "Education is required";
      }
      if (!formData.MonthlyIncome) {
        newErrors.MonthlyIncome = "Monthly Income is required";
      }
      if (!formData.FK_State) {
        newErrors.FK_State = "State is required";
      }
      if (!formData.FK_MaritalStatus) {
        newErrors.FK_MaritalStatus = "Marital Status is required";
      }
      if (!formData.FK_CurrentOccupation) {
        newErrors.FK_CurrentOccupation = "Current Occupation is required";
      }
      if (!formData.FK_AttendingCongressAs) {
        newErrors.FK_AttendingCongressAs = "Attending Congress As is required";
      }
      if (!formData.FK_SocialBackground) {
        newErrors.FK_SocialBackground = "Social Background is required";
      }
      if (!formData.FK_StatusinParty) {
        newErrors.FK_StatusinParty = "Status in Party is required";
      }
  
      if (Object.keys(newErrors).length === 0) {
        handleSubmit();
        setCurrentSection((prev) => prev + 1);
      } else {
        console.log("Errors:", newErrors);
      }
    } else if (currentSection === 2) {
      if (!formData.FK_ClassOrigin) {
        newErrors.FK_ClassOrigin = "Class Origin is required";
      }
      if (!formData.FK_IfaWholetimer) {
        newErrors.FK_IfaWholetimer = "Wholetimer status is required";
      }
      if (!formData.FK_NumberOfPartyCongressesAttended) {
        newErrors.FK_NumberOfPartyCongressesAttended = "Number of Congresses Attended is required";
      }
      if (!formData.YearInWhichJoinedParty) {
        newErrors.YearInWhichJoinedParty = "Year Joined Party is required";
      }
      if (!formData.FK_EntryIntoPartythrough) {
        newErrors.FK_EntryIntoPartythrough = "Entry Into Party Through is required";
      }
      if (!formData.FK_PositionInMassOrganisation) {
        newErrors.FK_PositionInMassOrganisation = "Position in Mass Organisation is required";
      }
      if (!formData.FK_FrontCurrentlyWorkingIn) {
        newErrors.FK_FrontCurrentlyWorkingIn = "Front Currently Working In is required";
      }
      if (!formData.FK_ElectedPositionHeldCurrently) {
        newErrors.FK_ElectedPositionHeldCurrently = "Elected Position Held Currently is required";
      }
      if (!formData.FK_TimesImprisoned) {
        newErrors.FK_TimesImprisoned = "Times Imprisoned is required";
      }
      if (!formData.FK_YearsInJail) {
        newErrors.FK_YearsInJail = "Years Spent In Jail is required";
      }
      if (!formData.FK_MonthsInJail) {
        newErrors.FK_MonthsInJail = "Months Spent In Jail is required";
      }
      if (!formData.FK_DaysInJail) {
        newErrors.FK_DaysInJail = "Days Spent In Jail is required";
      }
      if (!formData.FK_TimesUnderground) {
        newErrors.FK_TimesUnderground = "Times Underground is required";
      }
      if (!formData.FK_YearsInUnderground) {
        newErrors.FK_YearsInUnderground = "Years Spent In Underground is required";
      }
      if (!formData.FK_MonthsInUnderground) {
        newErrors.FK_MonthsInUnderground = "Months Spent In Underground is required";
      }
      if (!formData.FK_DaysInUnderground) {
        newErrors.FK_DaysInUnderground = "Days Spent In Underground is required";
      }
  
      if (Object.keys(newErrors).length === 0) {
        handleSubmit();
        setCurrentSection((prev) => prev + 1);
      }
    } else if (currentSection === 3) {
      handleSubmit();
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  };

  const handleSubmit = async () => {


    const newErrors: Record<string, string> = {};
    // Object.entries(formData).forEach(([key, value]) => {
    //     if (!value && key !== "Comments") {
    //         newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
    //     }
    // });


    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        showMessage("Please fill all required fields", "error");
        return;
    }
    try {
        const sessionData = sessionStorage.getItem('session');
        if (!sessionData) {
            showMessage('User  not authenticated', 'error');
            router.push('/admin/cred-register');
            
            return;
        }
    
        const parsedSessionData: SessionData = JSON.parse(sessionData);
        const userId = parsedSessionData.response.iD_Users;

        const FormData = {
            iD_PartyMember: formData.ID_PartyMember || 0,
            name: formData.Name,
            sex: formData.Sex.toString(),
            age: formData.Age||0,
            dateOfBirth: formData?.DateOfBirth || " ", 
            monthlyIncome: formData.MonthlyIncome,
            currentOccupationOtherDescription: formData.CurrentOccupationOtherDescription,
            yearInWhichJoinedParty: formData.YearInWhichJoinedParty,
            entryIntoPartyThroughDescription: formData.EntryIntoPartyThroughDescription,
            positionInMassOrganisationDescription: formData.PositionInMassOrganisationDescription,
            frontCurrentlyWorkingInDescription: formData.FrontCurrentlyWorkingInDescription,
            FK_NumberOfPartyCongressesAttended: formData.FK_NumberOfPartyCongressesAttended,
            electedPositionDescription: formData.ElectedPositionDescription,
            comments: formData.Comments,
            fK_State: formData.FK_State,
            FK_MaritalStatus: formData.FK_MaritalStatus,
            FK_AttendingCongress: formData.FK_AttendingCongressAs,
            FK_Education: formData.FK_Education,
            FK_CurrentOccupation: formData.FK_CurrentOccupation,
            FK_Gender: formData.FK_Gender,
            FK_SocialBackground: formData.FK_SocialBackground,
            FK_ClassOrigin: formData.FK_ClassOrigin,
            FK_EntryIntoPartythrough: formData.FK_EntryIntoPartythrough,
            FK_IfAWholetimer: formData.FK_IfaWholetimer,
            FK_StatusInPartyOrganisation: formData.FK_StatusinParty,
            FK_PositionInMassOrganisation: formData.FK_PositionInMassOrganisation,
            FK_FrontCurrentlyWorkingIn: formData.FK_FrontCurrentlyWorkingIn,
            FK_TimesImprisoned: formData.FK_TimesImprisoned,
            FK_YearsInJail: formData.FK_YearsInJail,
            FK_MonthsInJail: formData.FK_MonthsInJail,
            FK_DaysInJail: formData.FK_DaysInJail,
            FK_YearsInUnderground: formData.FK_YearsInUnderground,
            FK_MonthsInUnderground: formData.FK_MonthsInUnderground,
            FK_DaysInUnderground: formData.FK_DaysInUnderground,
            FK_TimesUnderground: formData.FK_TimesUnderground,
            FK_ElectedPositionHeldCurrently: formData.FK_ElectedPositionHeldCurrently,
            User: userId,
           disability:isDisabled, 
        };

        console.log("formdata", FormData);
        
        const response = await axiosInterceptorInstance.post("/v1/partyUpdate", FormData);
        
        if (response) {
          if (currentSection === 3) {
            showMessage("Successfully Submitted!", "success");
            router.push(`/admin/cred-register`);
          }
          
            
            router.push('/admin/cred-register')
            const { responseID } = response.data.result;
            setFormData((prevData) => ({
                ...prevData,
                ID_PartyMember: responseID,
            }));
            router.push('/admin/cred-register');
           
  
                  } else {
            console.error('Error submitting form:');
        }

    } catch (error) {
        console.error("Error submitting data. Please try again.", error);
    }
};
const resetFormAndGoToFirstSection = () => {
  setCurrentSection(1); 
  setShowSuccessDialog(false); 
  resetErrors(); // Reset errors when form is reset
};



const handleView = async (iD_PartyMember: number) => {
 
  try {
     
      const response = await axiosInterceptorInstance.get(
          `/v1/partySelect?id_PartyMember=${iD_PartyMember}`
         
      );
 console.log('resview',response.data)

      if (response.data.result && response.data.result.length > 0) {
        
          setSelectedUser(response.data.result[0]); 
          setShowDialog(true); 
          console.log(selectedUser)
         
      } else {
          console.error("No data found for this ID");
      }
  } catch (error) {
      console.error("Error fetching user details:", error);
  }
};

const submitFunction = async () => {
  try {
    await handleSubmit();
    if (formData.ID_PartyMember) {
      setShowDialog(true); 
      handleView(formData.ID_PartyMember)
      
    } else {
      console.error("ID_PartyMember is missing.");
    }
  } catch (error) {
    console.error("Error during submission:", error);
  }
};
const handleCancel = () => {
  setShowDialog(false);
  setShowSuccessDialog(false);
  
  // Clear session storage and local storage
  sessionStorage.clear();
  localStorage.clear();

  // Redirect to login or home page
  router.replace('/auth/login');  // Change this to your actual login page
};




const previuosSection = () => {
  clearErrors(); // Clear errors when navigating back
  setCurrentSection((prev: number) => prev - 1);
};
  const clearErrors = () => {
    setErrors({});
  };

  const getGradient = () => {
    switch (currentSection) {
      case 1:
        return 'blue';
      case 2:
        return 'linear-gradient(to right, blue 50%, red 50%)';
      case 3:
        return 'linear-gradient(to right, blue 33%, red 33%, green 33%)';
      case 4:
        return 'linear-gradient(to right, blue 25%, red 25%, green 25%, yellow 25%)';
      default:
        return 'blue';
    }
  };
  const handlelist =()=>{
    setShowDialog(false)
    router.replace('/admin/cred-list')
  }
  const nextStep = () => {
    if (currentSection < steps) {
      setCurrentSection((prev) => prev + 1);
    }
  };
  const previousStep = () => {
    if (currentSection > 1) {
      setCurrentSection((prev) => prev - 1);
    }
  };


  console.log("userDetails:", userDetails);
  console.log("fK_UserRole:", userDetails?.response?.fK_UserRole);
  


  return (

    <Container sx={{ paddingInline: "0px", marginInline: "0px" }}>
      <Box sx={{ marginBottom: "16px", marginTop: "16px" }}>

        <Typography variant="h5" color="text.primary" sx={{ fontSize: '18px', fontWeight: 500 }}>
        Communist Party of India (Marxist): 24th Congress - Credential Registration
        </Typography>
      </Box>
      
      <Modal
  open={showDialog}
  onClose={() => setShowDialog(false)}
>
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
    <Typography variant="h6" mb={5} component="h1" sx={{ fontWeight: "bold", textAlign: "center" }}>
      Member Details
    </Typography>

    <Grid container spacing={2}>
      {/* Display user details here */}
      {[
        { label1: 'Name', value1: selectedUser?.name },
        { label1: 'Date of Birth', value1: selectedUser?.dateOfBirth ? dayjs(selectedUser.dateOfBirth).format('DD-MM-YYYY') : null },
        { label1: 'Age', value1: selectedUser?.age },
        { label1: 'Gender', value1: selectedUser?.gender },
        { label1: 'Education', value1: selectedUser?.education },
        { label1: 'Monthly Income', value1: selectedUser?.monthlyIncome },
        { label1: 'State', value1: selectedUser?.stateName },
        { label1: 'Marital Status', value1: selectedUser?.maritialStatus },
        { label1: 'Current Occupation', value1: selectedUser?.occupation },
        { label1: 'Attending Congress As', value1: selectedUser?.attendingCongressAs },
        { label1: 'Social Background', value1: selectedUser?.socialBackground },
        { label1: 'Status in Party', value1: selectedUser?.statusInPartyOrganisation },
        { label1: 'Disabled Person', value1: isDisabled },
        { label1: 'Class Origin', value1: selectedUser?.classOrigin },
        { label1: 'If a Whole Timer', value1: selectedUser?.ifaWholeTimer },
        { label2: 'Number of Party Congresses Attended', value2: selectedUser?.fK_NumberOfPartyCongressesAttended },
        { label2: 'Year Joined Party', value2: selectedUser?.yearInWhichJoinedParty },
        { label2: 'Entry Into Party Through', value2: selectedUser?.entryIntoPartyThrough },
        { label2: 'Position in Mass Organisation', value2: selectedUser?.positioninmassOrganisation },
        { label2: 'Front Currently Working In', value2: selectedUser?.frontCurrentlyWorkingIn },
        { label2: 'Elected Position', value2: selectedUser?.electedPositionHeldCurrently },
        { label2: 'Times Imprisoned', value2: selectedUser?.timesImprisioned },
        { label2: 'Years in Jail', value2: selectedUser?.yearsInJail },
        { label2: 'Months in Jail', value2: selectedUser?.monthsInJail },
        { label2: 'Days in Jail', value2: selectedUser?.daysInJail },
        { label2: 'Underground Life (No. of Times)', value2: selectedUser?.timesUnderground },
        { label2: 'Underground Life (Years)', value2: selectedUser?.yearsInUnderground },
        { label2: 'Underground Life (Months)', value2: selectedUser?.monthsInUnderground },
        { label2: 'Underground Life (Days)', value2: selectedUser?.daysInUnderground },
        { label2: 'Comments', value2: selectedUser?.comments },
      ].map((item, index) => (
        <React.Fragment key={index}>
          {item.label1 && (
            <Grid item xs={12} sm={6}>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5 font-medium text-gray-700">{item.label1}</div>
                <div className="col-span-1 font-medium">:</div>
                <div className="col-span-6 text-gray-600">{item.value1 || "Not Provided"}</div>
              </div>
            </Grid>
          )}
          {item.label2 && (
            <Grid item xs={12} sm={6}>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-5 font-medium text-gray-700">{item.label2}</div>
                <div className="col-span-1 font-medium">:</div>
                <div className="col-span-6 text-gray-600">{item.value2 || "Not Provided"}</div>
              </div>
            </Grid>
          )}
        </React.Fragment>
      ))}
    </Grid>

    <div className='flex justify-center mt-5'>
   
      {(selectedUser?.fK_UserRole === 1 || userDetails?.response?.fK_UserRole === 1) ? (
       
        <Button
          onClick={handlelist}
          color="primary"
          variant="contained"
        >
          OK
        </Button>
      ) : (
      
        <>
          <Button
            onClick={async () => {
              try {
                setShowDialog(false);
                setShowSuccessDialog(false);
                resetFormAndGoToFirstSection();
                resetErrors();
              } catch (error) {
                console.error("Error during submission:", error);
              }
            }}
            color="primary"
            variant="contained"
          >
            Edit Data
          </Button>
          <Button
            sx={{ marginLeft: "10px" }}
            onClick={handleCancel}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
        </>
      )}
    </div>
  </Box>
</Modal>
      <div>
      <Box >
          <Grid container spacing={2} sx={{ mb: 3, mr: 0 }}>
            <Grid item xs={12} md={12} sx={{ height: '100%' }}>
              <Card sx={{ margin: '5px', padding: '10px' }}>
                   <Box
              sx={{
               
                top: 0, 
                left: 0,
                width: '100%',
                height: '10px',
                zIndex: 9999, 
                background: `linear-gradient(
                  to right,
                  ${currentSection >= 1 ? '#1B459C' : '#FFAAAA'} 33%,
                  ${currentSection >= 2 ? '#1B459C' : '#FFAAAA'} 33% 66%,
                  ${currentSection >= 3 ? '#1B459C' : '#FFAAAA'} 66% 100%,
                 
                )`,
                transition: 'background 0.3s ease',
              }}
            />
             <form id="msform">
                  <ul id="progressbar" className="progressbar">
                    <li id="li1" className={currentSection >= 1 ? "active" : ""}>
                      {/* <strong>1</strong> */}
                    </li>
                    <li id="li2" className={currentSection >= 2 ? "active" : ""}>
                      {/* <strong>2</strong> */}
                    </li>
                    <li id="li3" className={currentSection >= 3 ? "active" : ""}>
                      {/* <strong>3</strong> */}
                    </li>
                 

                  </ul>
              
                        
                <CardContent>
                <fieldset style={{ display: currentSection === 1 ? "block" : "none" }}>
                  {currentSection === 1 && (
                    
                    <div style={{ padding: '20px' }}>
                            
                      <Grid container spacing={2}>
                        

                        <Grid item xs={12} sm={3}>
                        <TextField
                          size="small"
                          fullWidth
                          margin="normal"
                          required
                          name="Name"
                          label="Name"
                          value={formData.Name}
                          onChange={handleInputChange}
                          error={!!errors.Name}
                          helperText={errors.Name}
                      />

                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Date of Birth"
                              value={formData.DateOfBirth ? dayjs(formData.DateOfBirth, 'DD-MM-YYYY') : null}
                              onChange={handleDateChange}
                              format="DD-MM-YYYY"
                              slotProps={{
                                textField: {
                                  size: 'small',
                                  fullWidth: true,
                                  margin: 'normal',
                                  error: Boolean(!! errors.DateOfBirth), 
                                  helperText: errors.DateOfBirth || '',
                                  
                                },
                               
                              }}
                          />
                          </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            size="small"
                            margin="normal"
                            fullWidth
                           
                            name="Age"
                            label="Age"
                            type="number"
                            value={formData.Age}
                            onChange={handleInputChange}
                            inputProps={{ readOnly: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Gender</InputLabel>
                            <Select
                              name="FK_Gender"
                              label="Gender"
                              value={formData.FK_Gender.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                Gender
                              </MenuItem>
                              {Gender.Gender.map(gender => (
                                <MenuItem key={gender.ID} value={gender.ID}>
                                  {gender.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_Gender && <FormHelperText error>{errors.FK_Gender}</FormHelperText>}

                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Education</InputLabel>
                            <Select
                              name="FK_Education"
                              label="Educationion"
                              value={formData.FK_Education.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                Education
                              </MenuItem>
                              {Education.Education.map(Edu => (
                                <MenuItem key={Edu.ID} value={Edu.ID}>
                                  {Edu.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_Education && <FormHelperText error>{errors.FK_Education}</FormHelperText>}  
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        <TextField
                        size="small"
                       fullWidth
                        margin="normal"
                        required
                        name="MonthlyIncome"
                        label="Monthly Income"
                        type="number"
                        value={formData.MonthlyIncome === 0 ? '' : formData.MonthlyIncome.toString()}
                        onChange={handleInputChange}
                        error={!!errors.MonthlyIncome}
                        helperText={errors.MonthlyIncome}
                      />
                      </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>State</InputLabel>
                            <Select
                              name="FK_State"
                              label="State"
                              value={formData.FK_State.toString()}
                              onChange={handleSelectChange}
                            >
                              
                              {state.State.map(states => (
                                <MenuItem key={states.ID} value={states.ID}>
                                  {states.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_State && <FormHelperText error>{errors.FK_State}</FormHelperText>}  
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Marital Status</InputLabel>
                            <Select
                              name="FK_MaritalStatus"
                              label="Marital Status"
                              value={formData.FK_MaritalStatus.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                               Select Marital Status                           
                              </MenuItem>
                              {MaritalStatus.MaritalStatus.map(marry => (
                                <MenuItem key={marry.ID} value={marry.ID}>
                                  {marry.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_MaritalStatus && <FormHelperText error>{errors.FK_MaritalStatus}</FormHelperText>}  
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Current Occupation</InputLabel>
                            <Select
                              name="FK_CurrentOccupation"
                              label="Current Occupation"
                              value={formData.FK_CurrentOccupation.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                Current Occupation
                              </MenuItem>

                              {CurrentOccupation.map(Current => (

                                <MenuItem key={Current.ID} value={Current.ID}>
                                  {Current.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_CurrentOccupation && <FormHelperText error>{errors.FK_CurrentOccupation}</FormHelperText>}  

                          </FormControl>
                        </Grid>
                        
                         <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Attending Congress As</InputLabel>
                            <Select
                              name="FK_AttendingCongressAs"
                              label="Attending Congress As"
                              value={formData.FK_AttendingCongressAs.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                Attending Congress As
                              </MenuItem>
                              {AttendingCongress.AttendingCongress.map(Congress => (
                                <MenuItem key={Congress.ID} value={Congress.ID}>
                                  {Congress.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_AttendingCongressAs && <FormHelperText error>{errors.FK_AttendingCongressAs}</FormHelperText>}  
                          </FormControl>

                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Social Background</InputLabel>
                            <Select
                              name="FK_SocialBackground"
                              label="Social Background"
                              value={formData.FK_SocialBackground.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                Social Background
                              </MenuItem>
                              {SocialBackground.SocialBackground.map(Social => (
                                <MenuItem key={Social.ID} value={Social.ID}>
                                  {Social.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_SocialBackground && <FormHelperText error>{errors.FK_SocialBackground}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Status In Party</InputLabel>
                            <Select
                              name="FK_StatusinParty"
                              label="Status In Party"
                              value={formData.FK_StatusinParty.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                Status In Party
                              </MenuItem>
                              {StatusinParty.StatusinParty.map(Status => (
                                <MenuItem key={Status.ID} value={Status.ID}>
                                  {Status.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_StatusinParty && <FormHelperText error>{errors.FK_StatusinParty}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                      <FormControl component="fieldset">
                        <Typography variant="subtitle1">Are you a person with a disability?</Typography>
                        <RadioGroup
                          row
                          name="isDisabled"
                          value={isDisabled}
                          onChange={(e) => setIsDisabled(e.target.value)}
                        >
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                        
                      </Grid>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                      <Button variant="contained" color="primary" onClick={nextSection}>
                       Next
                  </Button>
                </Box>
                    </div>
                  )}
                  </fieldset>
                  <fieldset style={{ display: currentSection === 2 ? "block" : "none" }}>

                  {currentSection === 2 && (
                    <div style={{ padding: '20px' }}>
                   
                    <Grid container spacing={2}>
                     <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Class Origin</InputLabel>
                            <Select
                              name="FK_ClassOrigin"
                              label="ClassOrigin"
                              value={formData.FK_ClassOrigin.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                              Class Origin
                              </MenuItem>
                              {ClassOrigin.ClassOrigin.map(ClassOrigin => (
                                <MenuItem key={ClassOrigin.ID} value={ClassOrigin.ID}>
                                  {ClassOrigin.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_ClassOrigin && <FormHelperText error>{errors.FK_ClassOrigin}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Wholetimer</InputLabel>
                            <Select
                              name="FK_IfaWholetimer"
                              label="IfaWholetimer"
                              value={formData.FK_IfaWholetimer.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                              Wholetimer
                              </MenuItem>
                              {IfaWholetimer.IfaWholetimer.map(timer => (
                                <MenuItem key={timer.ID} value={timer.ID}>
                                  {timer.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_IfaWholetimer && <FormHelperText error>{errors.FK_IfaWholetimer}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        <FormControl fullWidth size="small" margin="normal">
                      <InputLabel>No of Congresses Attended</InputLabel>
                      <Select
                          name="FK_NumberOfPartyCongressesAttended"
                          label="No of Congresses Attended"
                          value={formData.FK_NumberOfPartyCongressesAttended.toString()} 
                          onChange={handleSelectChange}
                      >
                          <MenuItem value={0} disabled>No of Congresses Attended</MenuItem>  
                          {NumberOfPartyCongressesAttended.NumberOfPartyCongressesAttended.map(congress => (
                              <MenuItem key={congress.ID} value={congress.ID}>
                                  {congress.NAME} 
                              </MenuItem>
                          ))}
                      </Select>
                      {errors.FK_NumberOfPartyCongressesAttended && (
                          <FormHelperText error>{errors.FK_NumberOfPartyCongressesAttended}</FormHelperText>
                      )}
                  </FormControl>

                  </Grid>

                        <Grid item xs={12} sm={3}>
                          <TextField
                            size="small"
                            fullWidth
                            margin="normal"
                            required
                            
                            name="YearInWhichJoinedParty"
                            label="Year Joined Party"
                            type="number"
                            value={formData.YearInWhichJoinedParty === 0 ? '' : formData.YearInWhichJoinedParty.toString()}
                            onChange={handleInputChange}
                            error={!!errors.YearInWhichJoinedParty}
                            helperText={errors.YearInWhichJoinedParty}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Entry Into Party through</InputLabel>
                            <Select
                              name="FK_EntryIntoPartythrough"
                              label="Entry Into Party through"
                              value={formData.FK_EntryIntoPartythrough.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                              Entry Into Party through
                              </MenuItem>
                              {EntryIntoPartythrough.EntryIntoPartythrough.map(Entry => (
                                <MenuItem key={Entry.ID} value={Entry.ID}>
                                  {Entry.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_EntryIntoPartythrough && <FormHelperText error>{errors.FK_EntryIntoPartythrough}</FormHelperText>}
                          </FormControl>
                        </Grid>
                       
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Position In Mass Organisation</InputLabel>
                            <Select
                              name="FK_PositionInMassOrganisation"
                              label="Position In Mass Organisation"
                              value={formData.FK_PositionInMassOrganisation.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                              Position In Mass Organisation
                              </MenuItem>
                              {PositionInMassOrganisation.PositionInMassOrganisation.map(Position => (
                                <MenuItem key={Position.ID} value={Position.ID}>
                                  {Position.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_PositionInMassOrganisation && <FormHelperText error>{errors.FK_PositionInMassOrganisation}</FormHelperText>}
                          </FormControl>

                        </Grid>
                       
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Front Currently Working In</InputLabel>
                            <Select
                              name="FK_FrontCurrentlyWorkingIn"
                              label="Front Currently Working In"
                              value={formData.FK_FrontCurrentlyWorkingIn.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                              Front Currently Working In
                              </MenuItem>
                              {FrontCurrentlyWorkingIn.FrontCurrentlyWorkingIn.map(Front => (
                                <MenuItem key={Front.ID} value={Front.ID}>
                                  {Front.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_FrontCurrentlyWorkingIn && <FormHelperText error>{errors.FK_FrontCurrentlyWorkingIn}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Elected Position Held Currently </InputLabel>
                            <Select
                              name="FK_ElectedPositionHeldCurrently"
                              label="Elected Position Held Currently "
                              value={formData.FK_ElectedPositionHeldCurrently.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                              Elected Position Held Currently
                              </MenuItem>
                              {ElectedPositionHeldCurrently.ElectedPositionHeldCurrently.map(cat => (
                                <MenuItem key={cat.ID} value={cat.ID}>
                                  {cat.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_ElectedPositionHeldCurrently && <FormHelperText error>{errors.FK_ElectedPositionHeldCurrently}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>No Of Times Imprisoned</InputLabel>
                            <Select
                              name="FK_TimesImprisoned"
                              label="No Of Times Imprisoned"
                              value={formData.FK_TimesImprisoned.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                No Of Times Imprisoned
                              </MenuItem>
                              {NoOfTimesImprisoned.NoOfTimesImprisoned.map(cat => (
                                <MenuItem key={cat.ID} value={cat.ID}>
                                  {cat.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_TimesImprisoned && <FormHelperText error>{errors.FK_TimesImprisoned}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Years Spent In Jail </InputLabel>
                            <Select
                              name="FK_YearsInJail"
                              label="Years Spent In Jail "
                              value={formData.FK_YearsInJail.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                              Years Spent In Jail
                              </MenuItem>
                              {YearsSpentInJail.YearsSpentInJail.map(cat => (
                                <MenuItem key={cat.ID} value={cat.ID}>
                                  {cat.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_TimesImprisoned && <FormHelperText error>{errors.FK_TimesImprisoned}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Months Spent In Jail </InputLabel>
                            <Select
                              name="FK_MonthsInJail"
                              label="Months Spent In Jail "
                              value={formData.FK_MonthsInJail.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                Months Spent In Jail
                              </MenuItem>
                              {MonthsSpentInJail.MonthsSpentInJail.map(cat => (
                                <MenuItem key={cat.ID} value={cat.ID}>
                                  {cat.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_MonthsInJail && <FormHelperText error>{errors.FK_MonthsInJail}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Days Spent In Jail </InputLabel>
                            <Select
                              name="FK_DaysInJail"
                              label="Days Spent In Jail "
                              value={formData.FK_DaysInJail.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                Days Spent In Jail
                              </MenuItem>
                              {DaysSpentInJail.DaysSpentInJail.map(cat => (
                                <MenuItem key={cat.ID} value={cat.ID}>
                                  {cat.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_DaysInJail && <FormHelperText error>{errors.FK_DaysInJail}</FormHelperText>}
                          </FormControl>

                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>No Of Times Underground Life </InputLabel>
                            <Select
                              name="FK_TimesUnderground"
                              label="No Of Times Underground Life "
                              value={formData.FK_TimesUnderground.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                No Of Times Underground Life
                              </MenuItem>
                              {UndergroundLifeNoOfTimes.UndergroundLifeNoOfTimes.map(cat => (
                                <MenuItem key={cat.ID} value={cat.ID}>
                                  {cat.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_TimesUnderground && <FormHelperText error>{errors.FK_TimesUnderground}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Years spent in Underground</InputLabel>
                            <Select
                              name="FK_YearsInUnderground"
                              label="Underground Life Years"
                              value={formData.FK_YearsInUnderground.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                Underground Life Years
                              </MenuItem>
                              {UndergroundLifeYears.UndergroundLifeYears.map(cat => (
                                <MenuItem key={cat.ID} value={cat.ID}>
                                  {cat.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_YearsInUnderground && <FormHelperText error>{errors.FK_YearsInUnderground}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Months spent in Underground</InputLabel>
                            <Select
                              name="FK_MonthsInUnderground"
                              label="Underground Life Months"
                              value={formData.FK_MonthsInUnderground.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                Underground Life Months
                              </MenuItem>
                              {UndergroundLifeMonths.UndergroundLifeMonths.map(cat => (
                                <MenuItem key={cat.ID} value={cat.ID}>
                                  {cat.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_MonthsInUnderground && <FormHelperText error>{errors.FK_MonthsInUnderground}</FormHelperText>}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <FormControl fullWidth size="small" margin="normal">
                            <InputLabel>Days spent in Underground</InputLabel>
                            <Select
                              name="FK_DaysInUnderground"
                              label="Underground Life Days"
                              value={formData.FK_DaysInUnderground.toString()}
                              onChange={handleSelectChange}
                            >
                              <MenuItem value={0} disabled>
                                Underground Life Days
                              </MenuItem>
                              {UndergroundLifeDays?.UndergroundLifeDays?.map((cat) => (
                                <MenuItem key={cat.ID} value={cat.ID}>
                                  {cat.NAME}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.FK_DaysInUnderground && <FormHelperText error>{errors.FK_DaysInUnderground}</FormHelperText>}
                          </FormControl>

                        </Grid>
                      </Grid>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                        <Button variant="contained" color="primary" onClick={previuosSection}>
                          Previous
                        </Button>
                        <Button variant="contained" color="primary" onClick={nextSection}>
                          Next
                        </Button>
                      </Box>
                    </div>
                  )}
                  </fieldset>
                  <fieldset style={{ display: currentSection === 3 ? "block" : "none" }}>

                  {currentSection === 3 && (
             <div style={{ padding: '20px' }}>
         
                   <Grid container spacing={2}>
                   <Grid item xs={12}>
                          <TextField
                            size="small"
                            fullWidth
                            margin="normal"
                            required
                            name="Comments"
                            label="Comments"
                            multiline
                            rows={4}
                            value={formData.Comments}
                            onChange={handleInputChange}
                             inputProps={{ maxLength: 500 }}
                            placeholder="* Only 500 characters are allowed."
                                helperText="Maximum 500 characters allowed."
                                
                          />
                        </Grid>
                       
                      </Grid>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                        <Button variant="contained" color="primary" onClick={previuosSection}>
                          Previous
                        </Button>
                        <Button variant="contained" color="primary" onClick={submitFunction}>
                         Submit
                        </Button>
                      </Box>
                    </div>
                  )}
                  </fieldset>
             
                </CardContent>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Container>
  )
};
function setErrors(arg0: (prevErrors: any) => any) {
  throw new Error('Function not implemented.');
}

