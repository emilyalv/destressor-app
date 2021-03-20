$(document).ready(function(){
    var saveVidBtn = $('#vidSaveBtn');
    var currentVid = '';

    $("form").submit(function(event){
        event.preventDefault();
        let search = $('#topics option:selected').text();
        //console.log(search)
        videoSearch(search);
    })

    function videoSearch(search) {
        saveVidBtn.show()
        $("#videos").empty();
        
        $.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyA-A85JoLyq11NziNGjOlWcwOJ-1wxSf8o&type=video&part=snippet&maxResults=1&q="+search,function(data){
            //console.log(data)
            //console.log(search)

            data.items.forEach(item => {
                let video = `<iframe width="280" height="210" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>`
                $("#videos").append(video)
                currentVid = item.id.videoId
                //console.log(item.id.videoId)
                //console.log(currentVid)
                
                
            })        
        })
    }

    //click button, runs function to save to local storage
    vidSaveBtn.addEventListener("click", vidFav);

    //function to save video to local storage
    function vidFav(e) {
        console.log(currentVid);
        localStorage.setItem("favoriteVideo", JSON.stringify(currentVid));
    }

    //new-----------------------------

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


})