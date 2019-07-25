$(document).ready(function () {
    // Initial array of GIF TOPICS
    var gifTopics = ["hockey", "mountain bike", "snowboard", "wake surf", "wakeboard", "football", "boxing", "piano", "guitar"];

    //GRAB VALUE FROM INPUT FORM=====================================================
    $("#add-gif").on("click", function (event) {
        event.preventDefault();
        var newGif = $("#gif-input").val().trim();
        gifTopics.push(newGif);
        // calling renderButtons which handles the processing of our gif array
        renderButtons();
        console.log(event)
    });

    // Function for displaying GIFS AND data========================================================
    function renderButtons() {
        // Deleting the gif buttons prior to adding new gif buttons
        $("#append-buttons-here").empty();
        // Looping through the array of gifs
        for (var i = 0; i < gifTopics.length; i++) {
            // Then dynamicaly generating buttons for each gif in the array.
            var newButton = $("<button>");
            // Adding a class
            newButton.addClass("gif");
            // Adding a data-attribute with a value of the gif at index i
            newButton.attr("data-name", gifTopics[i]);
            // Providing the button's text with a value of the movie at index i
            newButton.text(gifTopics[i]);
            // Adding the button to the HTML
            $("#append-buttons-here").append(newButton);
        };
    };

    // Calling the renderButtons function at least once to display the initial list of gif
    renderButtons();

    //GIF ON CLICK PAUSE --- ANIMATE FUNCTION=========================================
    $(document).on("click", ".hobbiesImg", function () {
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

    $(document).on('click', '.gif', function () {
        //AJAX CALL===========still same onClick function====================
        var newGif = $(this).attr("data-name")
        // Constructing a queryURL using the gif topic
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            newGif + "&api_key=hKqkRMJgjLRtvSchAWSTMRDVHQD3539N&limit=10";

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
                    var hobbiesDiv = $("<div>");
                    // Creating a paragraph tag with the result item's rating
                    var title = $("<p>").text("Rating: " + results[i].rating);
                    var tags = $("<p>").text("Tags: " + results[i].tags);
                    // var # = $("<p>").text("#: " + results[i].#);
                    // Creating and storing an image tag

                    console.log('****', results)

                    var still = results[i].images.fixed_height_still.url
                    var animate = results[i].images.fixed_height.url


                    var hobbiesImg = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    hobbiesImg.attr("src", still);
                    hobbiesImg.addClass("hobbiesImg")
                    hobbiesImg.attr("data-state", still)
                    hobbiesImg.attr("data-animate", animate)
                    hobbiesImg.attr("data-still", still)
                    // Appending the paragraph and image tag to the hobbiesDiv
                    hobbiesDiv.append(title);
                    hobbiesDiv.append(tags);
                    hobbiesDiv.append(hobbiesImg);
                    // Prependng the hobbiesDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(hobbiesDiv);
                    renderButtons();
                };
            });
    })


    //=========================TROUBLESHOOTING=================================================
    console.log('ready')
    console.log(gifTopics)
});