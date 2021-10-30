const isTextIsEmpty = (text: String) => text.trim().length === 0;
const getACSApiUrl = (path = '') => {
    if (!process.env.NEXT_PUBLIC_API_URL) throw Error(`Cannot find NEXT_PUBLIC_API_URL ${process.env.NEXT_PUBLIC_API_URL}`);
    return (process.env.NEXT_PUBLIC_API_URL as string) + path;
}

export { isTextIsEmpty, getACSApiUrl }
