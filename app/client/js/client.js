/**
 * Templates
 */

Template.messages.rendered = function() {
    if (!this._rendered) {
        this._rendered = true;
        checkUser();
    }
}

Meteor.autorun(function() {
    checkUser();
});

function checkUser() {
    if (Meteor.userId()) {
        userLog(true)
    } else {
        userLog(false)
    }
}

function hideAll() {
    $('#messages').hide();
    $('#inputBar').hide();
}

function userLog(state) {
    if (state) {
        $('#messages').fadeIn("slow", "linear");
        $('#inputBar').fadeIn("slow", "linear");
    } else {
        $('#messages').fadeOut("slow", "linear");
        $('#inputBar').fadeOut("slow", "linear");
    }
}

Template.messages.helpers({
    messages: function() {
        return localCollection.find({}, {
            sort: {
                time: -1
            }
        });
    }
})


Template.input.events = {
    'keydown input#message': function(event) {
        if (event.which == 13 && Meteor.user()) {
            var name = Meteor.user().profile.name;
            var message = document.getElementById('message');

            if (message.value != '') {
                localCollection.insert({
                    name: name,
                    message: message.value,
                    time: Date.now(),
                });

                document.getElementById('message').value = '';
                message.value = '';
            }
        }
    }
}
