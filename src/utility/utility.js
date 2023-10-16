const defaultImage = "https://via.placeholder.com/32x32.png";


const getImageOrDefault = (imageurl) => {
    try {
        new URL(imageurl);
        return imageurl;
    } catch {
        return defaultImage;
    }
}

export {getImageOrDefault}

