export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  
  
  export function SetToLocalStorage(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
  }
  
  export function GetFromLocalStorage(name: string) {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    }
  }
  
 
  export function GetState() {
    if (typeof window !== 'undefined') {
      const c_Value : any | null = localStorage.getItem("DropDownData");
       console.log("sdf",c_Value)
      // let j_Data = JSON.parse(c_Value);
      // console.log("jdata",j_Data.State)
      return  c_Value;
    }
  }
  
  export function GetDistrict() {
    if (typeof window !== 'undefined') {
      const c_Value : any | null = localStorage.getItem("DropDownData");
      let j_Data = JSON.parse(c_Value).District;
      
      return  j_Data;
  }}
  
  export function GetJailCategory() {
    if (typeof window !== 'undefined') {
      const c_Value : any | null = localStorage.getItem("DropDownData");
      let j_Data = JSON.parse(c_Value).JAILCATEGORY;
      
      return  j_Data;
  }}
  
  export function GetUndergroundCategory() {
    if (typeof window !== 'undefined') {
      const c_Value : any | null = localStorage.getItem("DropDownData");
      let j_Data = JSON.parse(c_Value).UNDERGROUNDCATEGORY;
      
      return  j_Data;
    }}
 
  export function Encode(data: any) {
    let encodedStr = btoa(data) + "CBPY!!!!mplY3Rd";
    return encodeURIComponent(encodedStr);
  }
  
  export function Decode(data: any) {
    const decodedStr = decodeURIComponent(data);
    return atob(decodedStr.replace("CBPY!!!!mplY3Rd", ''));
  }
  

  export function validateNumber(val: any): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(val);
  }