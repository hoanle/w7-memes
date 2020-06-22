document.addEventListener("DOMContentLoaded", function (event) {
    console.log("loaded index");
    document.getElementById("input-image").addEventListener("input", function (e) {
        var fReader = new FileReader();
        fReader.readAsDataURL(e.target.files[0]);
        fReader.onloadend = function (event) {
            var img = document.getElementById("img-upload");
            img.src = event.target.result;
        }
    })
});

const openMemeCreator = (imagePath, filename, id) => {
    window.location.href = "/originals/" + id;
}

const onReview = () => {
    console.log("on review")
    let top = document.getElementById("input-top-text").value;
    let bottom = document.getElementById("input-bottom-text").value;
    console.log("on review " + top);
    console.log("on review " + bottom);
    document.getElementById("top-label").innerHTML = top
    document.getElementById("bottom-label").innerHTML = bottom
}

const onCreateMeme = async (id) => {
    console.log("onCreateMeme")
    let top = document.getElementById("input-top-text").value;
    let bottom = document.getElementById("input-bottom-text").value;

    let success = await fetch('/memes', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, top: top, bottom: bottom })
    });

    if (success) {
        window.location.href = "/memes";
    }
}