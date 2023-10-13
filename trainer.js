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
        'description': 'save in emacs',
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
        'description': 'go back in intellij',
        'keys': [
            {
                'character': '[',
                'meta': true,
            }
        ],
    }, {
        'description': 'go to definition in intellij',
        'keys': [
            {
                'character': 'b',
                'meta': true,
            }
        ],
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
        'description': 'kill line',
        'keys': [
            {
                'character': 'k',
                'ctrl': true,
            },
        ]
    }, {
        'description': 'reverse search',
        'keys': [
            {
                'character': 'r',
                'ctrl': true,
            },
        ]
    }, {
        'description': 'copy in emacs',
        'keys': [
            {
                'character': '∑',
                'character_display': 'w',
                'alt': true,
            },
        ]
    }, {
        'description': 'paste in emacs',
        'keys': [
            {
                'character': 'y',
                'ctrl': true,
            },
        ]
    }, {
        'description': 'undo in emacs',
        'keys': [
            {
                'character': '_',
                'ctrl': true,
            },
        ]
    }, {
        'description': 'comment/uncomment',
        'keys': [
            {
                'character': '/',
                'meta': true,
            },
        ]
    }, {
        'description': 'generic undo',
        'keys': [
            {
                'character': 'z',
                'meta': true,
            },
        ]
    }, {
        'description': 'quit/interrupt',
        'keys': [
            {
                'character': 'c',
                'ctrl': true,
            },
        ]
    }, {
        'description': 'disconnect',
        'keys': [
            {
                'character': 'd',
                'ctrl': true,
            },
        ]
    }, {
        'description': 'escape',
        'keys': [
            {
                'character': 'Escape',
            },
        ]
    }, {
        'description': 'backtick',
        'keys': [
            {
                'character': '`',
            },
        ]
    }, {
        'description': 'equals',
        'keys': [
            {
                'character': '=',
            },
        ]
    }, {
        'description': 'plus',
        'keys': [
            {
                'character': '+',
            },
        ]
    }, {
        'description': 'semicolon',
        'keys': [
            {
                'character': ';',
            },
        ]
    }, {
        'description': 'square bracket open',
        'keys': [
            {
                'character': '[',
            },
        ]
    }, {
        'description': 'square bracket close',
        'keys': [
            {
                'character': ']',
            },
        ]
    }, {
        'description': 'backspace',
        'keys': [
            {
                'character': 'Backspace',
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
        if (a.meta) {
            string += "⌘-";
        }

        string += a.character_display || a.character;

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
    console.log(`alt is pressed ${e.altKey}, key is ${e.key}`);
    if (e.key == key_to_press.character && e.ctrlKey == (key_to_press.ctrl || false) && e.altKey == (key_to_press.alt || false) && e.metaKey == (key_to_press.meta || false)) {
        chord_to_press.keys.shift();
        display_chord(chord_to_press);

        if (chord_to_press.keys.length === 0) {
            ask_new_chord();
        }
    }

    e.preventDefault();
    e.stopPropagation();
});
