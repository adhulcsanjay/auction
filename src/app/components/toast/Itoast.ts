export interface IToast {
	open: boolean,
    message: string,
    type: 'error' | 'info' | 'success'
}