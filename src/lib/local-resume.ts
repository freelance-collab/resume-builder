export const getResume = () => localStorage.getItem('resume');

export const saveResume = (data: string) => localStorage.setItem('resume', data);
