
//library

function getYoutubeCode(str){

    return str.split("watch?v=")[1];
    
    
    }
    function getYoutubeIframe(code){
    return  `<iframe src="https://www.youtube.com/embed/${code}"></iframe>`;
    }
    function getYoutubeThumb(code){
        return  `http://img.youtube.com/vi/${code}/0.jpg`;
        }
        //getYoutubeThumb(getYoutubeCode(url))