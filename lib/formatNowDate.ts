// lib/formatDate.ts
export const formatCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear().toString();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
};