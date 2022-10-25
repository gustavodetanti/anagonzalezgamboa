
//library

function getYoutubeCode(str){

    return str.split("watch?v=")[1];
    
    
    }
    function getYoutubeIframe(code){
    return  `<iframe src="https://www.youtube.com/embed/${code}"></iframe>`;
    }
    