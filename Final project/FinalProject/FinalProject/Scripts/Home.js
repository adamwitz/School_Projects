
var Home = {};
Home.BaseURL = "http://localhost:52025";

Home.UpdateInfoClick = function (username, elementName, elementValue) {
    //This method updates or adds to the account info


    $.ajax
    ({
        url: Home.BaseURL + "/Home/AddOrUpdateElement",
        data:
            {
                Username: username,
                ElementName: elementName,
                ElementValue: elementValue
            },
        success: function (result) {
            var deserializedData = JSON.parse(result);
            if (deserializedData.Message == "Success") 
                alert("Your Account Info Has Been Updated");
            else
                $(".element-name-row").append('<div class="error-message">Element Name Cannot Have Spaces</div>');

            Home.GetAccountInfo(username);
          }
    })

}

Home.LogButtonClick = function () {
    //This method is fired from the log in button.
    $.ajax
    ({
        url: Home.BaseURL + "/Home/Login",
        data:
            {
                Username: $(".username-input").val(),
                Password: $(".password-input").val()
            },
        success: function(result){


            var deserializedData = JSON.parse(result);
            if (deserializedData.Message == "Success") {
                Home.LoadAccountPage();
            }
            if (deserializedData.Username == "Invalid") {
                $(".username-top").append('<div class="error-message">Must be an existing account username</div>');
            }
            if (deserializedData.Password == "Wrong") {
                $(".password-top").append('<div class="error-message">Wrong password for existing account</div>');
            }

            $(".username-input").focus(function () {
                $(".username-top > .error-message").text("");
                $(".username-input").val("");
            });

            $(".password-input").focus(function () {
                $(".password-top > .error-message").text("");
                $(".password-input").val("");
            });

        }
    })


}

Home.CreateAccountClick = function () {
    //Fired from the create account button

    $.ajax
    ({
        url: Home.BaseURL + "/Home/CreateAccount",
        data:
            {
                Username: $(".bottom-username-input").val(),
                Password: $(".bottom-password-input").val(), 
                EmailAdd: $(".email-input-one").val(),
                EmailCon: $(".email-input-two").val()
            },
        success: function (result) {
            // Display error messages on screen

            var deserializedData = JSON.parse(result);
            
           
            if (deserializedData.Message = "Error") {
                $(".container").height(450);
            }
            if (deserializedData.Username == "Exists") {
                $(".username-bottom").append('<div class="error-message">Account Name Exists</div>');
                $(".container").height(function (n, c) { return c + 10 });
            }
            if (deserializedData.Username == "Invalid") {
                $(".username-bottom").append('<div class="error-message">Username Must Be at Least 6 Characters</div>');
                $(".container").height(function (n, c) { return c + 10 });
            }
            if (deserializedData.Password == "Invalid") {
                $(".password-bottom").append('<div class="error-message">Password Must Be at Least 6 Characters</div>');
                $(".container").height(function (n, c) { return c + 10 });
            }
            if (deserializedData.EmailAdd == "Invalid") {
                $(".email-one").append('<div class="error-message">Email must contain an @ symbol</div>');
                $(".container").height(function (n, c) { return c + 10 });
            }
            if (deserializedData.EmailCon == "Invalid") {
                $(".email-two").append('<div class="error-message">You cannot leave this box blank</div>');
                $(".container").height(function (n, c) { return c + 10 });
            }
            if (deserializedData.EmailCon == "Mismatch") {
                $(".email-two").append('<div class="error-message">Emails must match</div>');
                $(".container").height(function (n, c) { return c + 10 });
            }
            if (deserializedData.Message = "Success" && $(".error-message").text() == "") {
                $(".container").height(450);
                alert("Congratulations, your account has been created. Please log in.");
            }

            $(".bottom-username-input").focus(function () {
                $(".username-bottom > .error-message").text("");
                $(".password-bottom > .error-message").text("");
                $(".email-one > .error-message").text("");
                $(".email-two > .error-message").text("");
                $(".bottom-username-input").val("");
                $(".bottom-password-input").val("");
                $(".email-input-one").val("");
                $(".email-input-two").val("");
            });

            $(".bottom-password-input").focus(function () {
                $(".password-bottom > .error-message").text("");
                $(".email-one > .error-message").text("");
                $(".email-two > .error-message").text("");
                $(".bottom-password-input").val("");
                $(".email-input-one").val("");
                $(".email-input-two").val("");

            });

            $(".email-input-one").focus(function () {
                $(".email-one > .error-message").text("");
                $(".email-input-one").val("");
                $(".email-two > .error-message").text("");
                $(".email-input-two").val("");
            });

            $(".email-input-two").focus(function () {
                $(".email-two > .error-message").text("");
                $(".email-input-two").val("");
            });
        }


    })
    
}

Home.LoadAccountPage = function () {
    //Begins ajax change of page

    $.get("Home/Login", function (data, status) {

        var userName = $(".username-input").val();

       Home.GetAccountInfo(userName);
 
    });//end $.get()
}

Home.ChangeUpperBox = function (accountInfo) {

    var objLength = Object.keys(accountInfo).length; //num of account object properties

    //variables for container and upper box resizing
    var contMobHt;
    var contWebHt;
    var boxMobHt;
    var boxWebHt;


    $(".upper-row").empty();

    $(".upper-row").append('<div class="account-info-box"></div>');

    
    if ($(window).innerWidth() <= 320) {
        //if window is mobile size
        $(".container").height(function (n, c) { return c + 120 * (objLength - 3); }); 

        $(".account-info-box").height(function (n, c) { return c + 82 * (objLength - 3); });

        contMobHt = $(".container").height();
        boxMobHt = $(".account-info-box").height();

        //determine heights for larger website size 
        contWebHt = contMobHt - (95+(80*(objLength-3)));
        boxWebHt = boxMobHt - (200+(40*(objLength-3)));

    }
    else {
        //else screen is comp monitor size
        $(".container").height(function (n, c) { return c + 40 * (objLength - 3); });

        $(".account-info-box").height(function (n, c) { return c + 42 * (objLength - 3); });

        //determine heights for smaller mobile size 
        contWebHt = $(".container").height();
        boxWebHt = $(".account-info-box").height();
        contMobHt = contWebHt + (95 + (80 * (objLength - 1)));
        boxMobHt = boxWebHt + (200 + (40 * (objLength - 3)));
    }

    //check for resizing the window
    $(window).resize(function () {
        if ($(window).innerWidth() <= 320) {
            $(".container").css("height", contMobHt);
            $(".account-info-box").css("height", boxMobHt);
        } else if ($(window).innerWidth() > 320) {
            $(".container").css("height", contWebHt);
            $(".account-info-box").css("height", boxWebHt);
        }

    });


    for (var key in accountInfo) {
        //cycle through accountInfo
        // create a div for each object property
        // as well as 3 divs (description, text input, button) for each of those
        if (accountInfo.hasOwnProperty(key)) {
            $(".account-info-box").append("<div class=" + key + "-row></div>");
            $("." + key + "-row").css("margin", "20px");
            $("." + key + "-row").append(
                '<div class="property-desc">' + key + '</div>',
                '<input class="property-input" type="text" value=' + accountInfo[key] + '>',
                '<input class="update-button" type="button" value="Update" />'
             );
        }
    }

    $(".username-row > .property-input").attr("disabled", "disabled");
    $(".username-row > .update-button").remove();

    $(".update-button").on({
        mouseover: function () { $(this).css("background-color", "yellow") },
        mouseout: function () { $(this).css("background-color", "") },
        click: function () {
            
            var parent = $(this).parent().attr("class");

            var username = accountInfo.username;
            var eleName = $("." + parent + " > .property-desc").text();
            var eleVal = $("." + parent + " > .property-input").val();

            Home.UpdateInfoClick(username, eleName, eleVal);
        }
    });
}

Home.ChangeLowerBox = function () {
    $(".bottom-row").empty();

    $(".bottom-row").append('<div class="bottom-box"></div>');

    
    $(".bottom-box").append('<div class="element-name-row"></div>');
    $(".bottom-box").append('<div class="element-value-row"></div>');
    $(".bottom-box").append('<input class="add-button" type="button" value="Add" />');

    $(".element-name-row").append(
        '<div class="element-name">Element Name</div>',
        '<input class="element-name-input" type="text" />'
    );

    $(".element-value-row").append(
        '<div class="element-value">Element Value</div>',
        '<input class="element-value-input" type="text" />'
    );
}       

Home.GetAccountInfo = function (userName) {
    //Grabs user account info then calls two methods to change page

    $.ajax
    ({
        url: Home.BaseURL + "/Home/GetAccountInformation",
        data:
            {
                Username: userName
            },
        success: function (result) {
            
            var deserializedData = JSON.parse(result);
            var payload = deserializedData.Payload;
            var info = JSON.parse(payload);
            var accountInfo = info.account;
            
            Home.ChangeUpperBox(accountInfo);

            Home.ChangeLowerBox();

        }

    })



}
    

    $(document).ready(function () {
        

        $(".log-button").on({
            mouseover: function () { $(this).css("background-color", "yellow") },
            mouseout: function () { $(this).css("background-color", "") },
            click: function () { Home.LogButtonClick(); }
        });

        $(".create-account-button").on({
            mouseover: function () { $(this).css("background-color", "yellow") },
            mouseout: function () { $(this).css("background-color", "") },
            click: function () { Home.CreateAccountClick(); }
        });

        $(this).on({
            mouseover: function () { $(this).css("background-color", "yellow") },
            mouseout: function () { $(this).css("background-color", "") },
            click: function () {
                var username = $(".username-row > .property-input").val();
                var eleName = $(".element-name-input").val();
                var eleVal = $(".element-value-input").val();

                Home.UpdateInfoClick(username, eleName, eleVal);
            }

        }, ".add-button");

        $(window).resize(function () {
            var $leftSide = $(".left-side");
            var $btmLeft = $(".bottom-left-side");
            var windowWidth = $(window).innerWidth();

            var defaultText = $leftSide.text();

            if (windowWidth <= 303) {
                $leftSide.html("Log In").css({ "font-weight": "bold" }, { "font-size": 16 }, {"text-align":"center"});
                $btmLeft.html("Create New Account").css({ "font-weight": "bold" }, { "font-size": 16 });
            }
            else {
                $leftSide.html("Already have an account with us? " +
                    "Returning users may log in by entering their site username and password.")
                    .css({ "font-weight": "" }, { "font-size": "" });

                $btmLeft.html("New users, please create a new account by providing us with some basic information.")
                    .css({ "font-weight": "" }, { "font-size": "" });
            }





        });


    });// end $(document).ready()

