const defaultImage = "https://via.placeholder.com/32x32.png";


const getiamgeOrDeafault = (imageurl) => {
    try {
        new URL(imageurl);
        return imageurl;
    } catch {
        return defaultImage;
    }
}

export {getiamgeOrDeafault}

