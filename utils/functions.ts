

export const groupBy = (arrayOfObject:[], property:any) => {
    return arrayOfObject?.reduce((acc:any, obj:any) => {
        const key = obj[property];
        if(!acc[key]){
            acc[key] = [];
        }
        acc[key].push(obj);
        
        return acc;
    }, {})
}

export const getLanguage = () => {
    const splitPathName:any = typeof window !== "undefined" && window?.location?.pathname?.split("/");
    const lang = splitPathName[1] == "vi" ? "vi" : "en";

    return lang;
}

export const b64toBlob = (b64Data:any, contentType='', sliceSize=512) => {
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

 export const dataURLtoFile = (dataurl:string, filename:string="liveness_img.jpeg") => {
 
    var arr = dataurl.split(','),
    //@ts-ignore
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

export const getUrlAfterLogin = (userType:string, locale:string) => {
    const localeUrl = locale === "en-US" ? "/" : "/vi/";
    if(userType != null){
        return `${localeUrl}${userType}/`
    }else{
        return `${localeUrl}`;
    }

}