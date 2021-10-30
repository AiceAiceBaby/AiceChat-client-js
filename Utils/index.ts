const isTextIsEmpty = (text: String) => text.trim().length === 0;
const getACSApiUrl = (path = '') => {
    if (!process.env.NEXT_PUBLIC_API_URL) throw Error(`Cannot find NEXT_PUBLIC_API_URL ${process.env.NEXT_PUBLIC_API_URL}`);
    return (process.env.NEXT_PUBLIC_API_URL as string) + path;
}
const handleAPIError = (err: any) => {
    if (err.response?.data?.msg) alert(err.response.data.msg);
    else alert('something went wrong: ' + err.message);
    console.log(err?.response?.data)
};

export { isTextIsEmpty, getACSApiUrl, handleAPIError }
