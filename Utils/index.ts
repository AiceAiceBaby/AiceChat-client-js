import NodeRSA from "node-rsa";

const isTextIsEmpty = (text: String) => text.trim().length === 0;
const getACSApiUrl = (path = '') => {
    if (!process.env.NEXT_PUBLIC_API_URL) throw Error(`Cannot find NEXT_PUBLIC_API_URL ${process.env.NEXT_PUBLIC_API_URL}`);
    return (process.env.NEXT_PUBLIC_API_URL as string) + path;
}
const handleAPIError = (err: any) => {
    if (err.response?.data?.msg) alert(err.response.data.msg);
    else alert('something went wrong: ' + err.message);
    // console.log(err?.response?.data)
};
const terminateKeyword = '--GOODBYE--';
const encryptedKeyword = '--ENCRYPTED--';

// encrypt
const rsaEncrypt = (key: string, plainText: string) => {
    /* const nodeRSAKey = new NodeRSA(`-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0lEJFaD2hWQo/Rxyoinm
    Q+LLAI7iq/3rXS3iCNU+1pFFV8oQy8POhdFGr/R4yYv8PqeGZqfTMczyr47h39/I
    o+/DqjFb3/AbHHk8W6fXAtmNwzcrHD6eRFMYfm84rRGsVPHHHhRL1CupN+0DUhlP
    mPvk5A+INzHLsTvyJwXzI4AOwUTKfT0njkOIVWtTDYe9o8SdGyj9tmMNSrJPbNHY
    Nh9EUNILLPSey6fhEMATckTB4d1fJjt6WmFsPLYzW+ei6xH6qBrm4UMdp4fxOBlC
    SgX1pbp5j5GVOnqykuoNBQr6umHnGzK0/IZOMenSePg0RCC951I4szE+CnLNJh+4
    lwIDAQAB
    -----END PUBLIC KEY-----`); */
    // const text = 'Hello RSA!';
    const nodeRSAKey = new NodeRSA(key);
    const encryptedText = nodeRSAKey.encrypt(plainText, 'base64');
    // console.log('Encrypted Text: ', encryptedText);
    return encryptedText;
}

// decrypt
const rsaDecrypt = (key: string, encryptedText: string) => {
    /*     const nodeRSAKey = new NodeRSA(`-----BEGIN RSA PRIVATE KEY-----
    MIIEowIBAAKCAQEA0lEJFaD2hWQo/RxyoinmQ+LLAI7iq/3rXS3iCNU+1pFFV8oQ
    y8POhdFGr/R4yYv8PqeGZqfTMczyr47h39/Io+/DqjFb3/AbHHk8W6fXAtmNwzcr
    HD6eRFMYfm84rRGsVPHHHhRL1CupN+0DUhlPmPvk5A+INzHLsTvyJwXzI4AOwUTK
    fT0njkOIVWtTDYe9o8SdGyj9tmMNSrJPbNHYNh9EUNILLPSey6fhEMATckTB4d1f
    Jjt6WmFsPLYzW+ei6xH6qBrm4UMdp4fxOBlCSgX1pbp5j5GVOnqykuoNBQr6umHn
    GzK0/IZOMenSePg0RCC951I4szE+CnLNJh+4lwIDAQABAoIBAEUjl6lxE2mxjhn7
    RqIRxR1vCo5B6rlgzYWBxmth8vjlo9ai2leqJJPwQt0oMKcNKlzMhM3tgOu/tM5K
    2e1Xa2WdNgUWmd3p2HfJUTLOX8wTidtxoO31leDfMk+qL4cRpsX7/5nfUThMLCJy
    +6L7KCQiNtJUWtLOP2ihzM7QUWhLIYr2AtxtkYJjak18a/xDlFxqs3ihCgVTPjrn
    5MEv55jwFcnvEvSSzmOfcJTFlYZrEs+Jep8zhpUbyzgTqtTJyfK1K6BzGC6suGGu
    AylISvfgJk/RGdtWshZSETIY9zRKH7WksScy9qAHNQ6GMyupFe1iIhcjZmKJAPcn
    11af1M0CgYEA3FwhCXKLn2F9VU+gUO2kJGEpO5Z0aXDiMuSaQNnceqD2+vUM3arE
    6NFWvj6gyFWHlPSDTxQeJ6+e5xAODIvDSpZ156dowyKBB+Gkg0dXYdIsSmMx5GsJ
    Gtu4YQH0gL4bM32KwJtKWAUjBX9pF1M9phSdsesrNCDykh6PPq/CBFMCgYEA9FUR
    bv0bWGV3ST/y2zCSNvmf50xXV6Ab+6BJVlMqfodGzcN+QM3EYLLjVZ2O/X8bKZS5
    PqXGcQZhY8TGxgsf7AdQOBSMdwgRUnIVTTyUURlp46Fcpr9G2jyttVvFjq+p/728
    WiLFrLQERwHZsS+HVdoBbBYiI84M18DvtlWIci0CgYBoGjodTXj6rcLZN8nkEbCW
    4zPoi7apTYP/SRI6ivHnGP41JumSGyf1WVhifhHVMtrfmvghtr5cP1KRlHseoDR9
    m0FOVD9g2H8eqxHeVyjH9NOpvN0ILSza/GxJn/PTknwlQiz3uyVPGfYmlb+fHlsk
    h97L++6oLNyL/VXs5nmBMwKBgBWJniTLeOqc3xv84BqEOI9SB89qwlQ+D9lpcq2C
    XT+UCyC+N9XcjY/8lN+KKP2dg7ZxnrawBEMYTeNuiBsTBfhXWLHo1cz0UBqVZd1O
    FsDjXZssMS+dstAwAxv2f/6o63JYtk63u/cSU0IzHo5o4yQlOHTfqpi/ZBBsuHS5
    K3LtAoGBAK//UTzZR2MXtbQKz4r5wMMgdptRjNrbUV22m+byBj6w0zx5/UaOLrTr
    WqQ0I+A3lrZoh/V7myfhiVuhgnU7ooCfdXlBlFhrg2GoEskElg3Ht7nZbKWcJ9pa
    rAdOspm6CfgyFVkBYVGgOsFrjI60kdBza46WDONlaVqGl9/j26Az
    -----END RSA PRIVATE KEY-----`); */

    // const encryptedText = "dbfO92t0L39YHpPxieRkAVDEBqTpPcu1SLhiwIHG7c7TzYCGNcznPBTE3HWbykBSKPkOVAEyxCeTiIH6t60E82XVdOXR0o4DaZvEo763jnPKMokdaFgnsGwew0E0XJyqWBbJzMBwOcAzeBOmFgFs4wbm/LRQDXF57pDNSw231wkp2pqtd9aNDRc+7chTO9J4LyFuQWU11whhNzh/XdW1xv9uS+kDOoDqw6wGsFVt7BapRTLIYxxHVymtgkwN09pjF0vIl6qrMRLkRh3dUCp9GG+5Y87JCIFwkOlpUawh6TWv2b19iUT42tz3t9kCXk+1aJtdklBhJ4WPTwx3OdjOhw==";
    const nodeRSAKey = new NodeRSA(key);
    const decryptedText = nodeRSAKey.decrypt(encryptedText, 'utf8');
    // console.log('Decrypted Text: ', decryptedText);
    return decryptedText;
}

export { encryptedKeyword, terminateKeyword, isTextIsEmpty, getACSApiUrl, handleAPIError, rsaEncrypt, rsaDecrypt }
