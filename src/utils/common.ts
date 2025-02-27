export function GetFromLocalStorage(name:string)
{  
  if (typeof window !== 'undefined') {
      const c_Value : any | null = localStorage.getItem(name);
      return  c_Value;
  }
}

export function SetToLocalStorage(name:string,c_Value:any)
{
  localStorage.setItem(name, c_Value);  
}
