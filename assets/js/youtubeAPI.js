$(document).ready(function(){
    var saveVidBtn = $('#vidSaveBtn');
    var currentVid = '';
    var clearFavoritesBtn = $('#clearFavesBtn');

    //When user selects a video topic 
    $("form").submit(function(event){
        event.preventDefault();
        let search = $('#topics option:selected').text();
        //console.log(search)
        videoSearch(search);
    })
    //Get video of selected topic
    function videoSearch(search) {
        saveVidBtn.show()
        $("#videos").empty();
        
        $.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyA-A85JoLyq11NziNGjOlWcwOJ-1wxSf8o&type=video&part=snippet&maxResults=10&q="+search,function(data){
            console.log(data);
            let videosArr = data.items
            //show random video from array of 10 results
            let videoShown = videosArr[Math.floor(Math.random() * videosArr.length)];
            // console.log(videoShown);
            // console.log(videoShown.id.videoId);
            let video = `<iframe width="280" height="210" src="https://www.youtube.com/embed/${videoShown.id.videoId}" frameborder="0" allowfullscreen></iframe>`
                $("#videos").append(video);
                currentVid = videoShown.id.videoId;     
        })
    }

    //click button, runs function to save to local storage
    vidSaveBtn.addEventListener("click", vidFav);

    //function to save video to local storage & add to favorites
    function vidFav(e) {
        console.log(currentVid);
        localStorage.setItem("favoriteVideo", JSON.stringify(currentVid));
        document.getElementById('videoFaves').innerHTML = `<iframe width="280" height="210" src="https://www.youtube.com/embed/${currentVid}" frameborder="0" allowfullscreen></iframe>`;

    }

    function getVidFavorites (e) {
        var savedVid = localStorage.getItem("favoriteVideo");
        console.log(savedVid);
        var parsedVid = JSON.parse(savedVid);
        console.log(parsedVid)
        document.getElementById('videoFaves').innerHTML = `<iframe width="280" height="210" src="https://www.youtube.com/embed/${parsedVid}" frameborder="0" allowfullscreen></iframe>`;
    }

    //checks to see if user has saved a dog to local storage
    //only runs getFavorites if they have saved previously
    function vidStorageCheck() {
        if (localStorage.getItem("favoriteVideo") == null) {
            console.log("no video saved");
            return;
        } else {(localStorage.getItem("favoriteVideo") != null) 
            getVidFavorites();
        }
    }
    
    vidStorageCheck();

    //clear local storage & clear favorites section if clear button is clicked
    clearFavoritesBtn.click(function() {
        localStorage.clear();
        $('#dogFaves').remove();
        $('#videoFaves').remove();
    })
        

})