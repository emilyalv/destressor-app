$(document).ready(function(){
    var saveVidBtn = $('#vidSaveBtn');

    $("form").submit(function(event){
        event.preventDefault();
        let search = $('#topics option:selected').text();
        console.log(search)
        videoSearch(search);
    })

    function videoSearch(search) {
        saveVidBtn.show()
        $("#videos").empty();
        
        $.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyA-A85JoLyq11NziNGjOlWcwOJ-1wxSf8o&type=video&part=snippet&maxResults=4&q="+search,function(data){
            console.log(data)
            console.log(search)

            data.items.forEach(item => {
                let video = `
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `
                $("#videos").append(video)
            })        
        })
}



})