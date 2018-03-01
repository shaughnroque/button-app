$(document).ready(function() {
  var theBest = [
    "Michael Jordan",
    "Kobe Bryant",
    "Lebron James",
    "Vince Carter",
    "Penny Hardaway",
    "Allen Iverson",
    "Kevin Durant",
  ];
  $("#goatbtn").empty();
  for (var i = 0; i < theBest.length; i++) {
    var button = $("<button>");
    button.addClass("goat-btn");
    button.attr("data-name", theBest[i]);
    button.text(theBest[i]);
    $("#goatbtn").append(button);
  }
  $("#add-goat").on("click", function(event) {
    event.preventDefault();

    var goat = $("#goat-input")
      .val()
      .trim();

    theBest.push(goat);
  });

  $("button").on("click", function() {
    var greatest = $(this).attr("data-name");

    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=If2QWVWg2qH1TaJtGHZxLj2pmd8lJ6dw&q=" +
      greatest +
      "&limit=10&offset=0&rating=PG-13&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var goatDiv = $("<div class='goatDiv'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rated: " + rating);
        var goatImage = $(
          "<img animatedGoat = '" +
            results[i].images.fixed_height.url +
            "' stillGoat = '" +
            results[i].images.fixed_height_still.url +
            "'src='" +
            results[i].images.fixed_height_still.url +
            "'>"
        );
        goatDiv.append(p);
        goatDiv.append(goatImage);

        $("#goatGIFS").prepend(goatDiv);
      }
    });
  });

  $(document.body).on("click", "img", function() {
    var isAnimated = $(this).attr("isAnimated");

    if (isAnimated == "true") {
      $(this).attr("src", $(this).attr("stillGoat"));
      $(this).attr("isAnimated", "false");
    } else {
      $(this).attr("src", $(this).attr("animatedGoat"));
      $(this).attr("isAnimated", "true");
    }
  });
});
