// Initial array of GIF TOPICS
var gifTopics = ["hockey", "mountain bike", "snowboard", "wake surf", "wakeboard", ""];

//GRAB VALUE FROM INPUT FORM=====================================================
$("#add-gif").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var newGif = $("#gif-input").val().trim();
    // The movie from the textbox is then added to our array
    gifTopics.push(newGif);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
});

//AJAX CALL FROM PAST EXERCISES===============================
// Performing an AJAX request with the queryURL
$.ajax({
    url: queryURL,
    method: "GET"
})
    // After data comes back from the request
    .then(function (response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(animalDiv);
        }
    });

// Function for displaying GIFS AND data========================================================
function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#gif-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < gifTopics.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("gif");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", gifTopics[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(movies[i]);
        // Adding the button to the HTML
        $("#gif-view").append(a);
    }
}



// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();

//GIF ON CLICK PAUSE --- ANIMATE FUNCTION=========================================
$(".gif").on("click", function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

