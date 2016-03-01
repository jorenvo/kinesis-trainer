var start_time = new Date();
var chord_to_press;
var chords = [
    {
        'description': 'beginning of line',
        'keys': [
            {
                'character': 'a',
                'ctrl': true,
            },
        ]
    }, {
        'description': 'save',
        'keys': [
            {
                'character': 'x',
                'ctrl': true,
            }, {
                'character': 's',
                'ctrl': true,
            },
        ]
    }, {
        'description': 'open file',
        'keys': [
            {
                'character': 'x',
                'ctrl': true,
            }, {
                'character': 'f',
                'ctrl': true,
            },
        ]
    }, {
        'description': 'select entire line',
        'keys': [
            {
                'character': 'a',
                'ctrl': true,
            }, {
                'character': ' ',
                'ctrl': true,
            }, {
                'character': 'e',
                'ctrl': true,
            }, {
                'character': 'w',
                'alt': true,
            },
        ]
    }, {
        'description': '↑',
        'keys': [
            {
                'character': 'p',
                'ctrl': true,
            },
        ]
    }, {
        'description': '↓',
        'keys': [
            {
                'character': 'n',
                'ctrl': true,
            },
        ]
    }, {
        'description': '←',
        'keys': [
            {
                'character': 'b',
                'ctrl': true,
            },
        ]
    }, {
        'description': '→',
        'keys': [
            {
                'character': 'f',
                'ctrl': true,
            },
        ]
    }, {
        'description': 'quit',
        'keys': [
            {
                'character': 'g',
                'ctrl': true,
            },
        ]
    }, {
        'description': 'word ←',
        'keys': [
            {
                'character': 'b',
                'alt': true,
            },
        ]
    }, {
        'description': 'word →',
        'keys': [
            {
                'character': 'f',
                'alt': true,
            },
        ]
    },
];

function display_chord (chord) {
    $('#chord').html(chord_to_press.keys.map(function (a) {
        var string = "";

        if (a.ctrl) {
            string += "C-";
        }
        if (a.alt) {
            string += "M-";
        }
        string += a.character;

        return string;
    }).join(' '));
}

function ask_new_chord () {
    if (chords.length) {
        var random_index = Math.floor(Math.random() * chords.length);
        chord_to_press = chords[random_index];
        chords.splice(random_index, 1);
        $('#question').html('do ' + chord_to_press.description);
        display_chord(chord_to_press);
     } else {
        var elapsed_time_ms = new Date() - start_time;
        $('#question').html('finished in ' + (elapsed_time_ms / 1000) + 's');
    }
}

$(document).ready(function () {
    ask_new_chord();
});

$(document).on('keypress', function (e) {
    var key_to_press = chord_to_press.keys[0];
    if (e.key == key_to_press.character && e.ctrlKey == (key_to_press.ctrl || false) && e.altKey == (key_to_press.alt || false)) {
        chord_to_press.keys.shift();
        display_chord(chord_to_press);

        if (chord_to_press.keys.length === 0) {
            console.log('new chord');
            ask_new_chord();
        }
    }

    e.preventDefault();
    e.stopPropagation();
});
