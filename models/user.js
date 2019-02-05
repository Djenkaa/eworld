const mongoose = require('mongoose');



var userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png'
    },
    skills: {
        gold: {
            type: Number,
            default: 1
        },
        level: {
            lvl: {
                type: Number,
                default: 0
            },
            experience: {
                type: Number,
                default: 0
            },
            nextLevel: {
                type: Number,
                default: 100
            }
        },
        strength: {
            value: {
                type: Number,
                default: 0
            },
            isTrain: {
                type: String,
                default: 'not'
            },
            nextTrain: {
                type: Date,
                default: null
            }
        },
        energy: {
            type: Number,
            default: 100
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    lastLogIn: {
        type: Number,
        default: Date.now()
    },
    storge: {
        items: [{
                item: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Market'

                },
                quantity: {
                    type: Number
                }
            }

        ]
    },
    message: {
        messages: [{
            from: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            send:String,
            inbox:String
            
        }],
        newMessage: {
            type: Number,
            default: 0
        }
    },

    alert: {
        alerts: [{
            alertMessage: String
        }],
        newAlert: {
            type: Number,
            default: 0
        }
    },
    battle: {
        dmg: {
            type: Number,
            default: 0

        },
        score: {
            type: Number,
            default: 0
        }
    },
    specialItem: {
        duration: {
            type: Number,
            default: 0
        },
        currentStr: {
            type: Number,
            default: 0
        }
    }
});




var user = mongoose.model('User', userSchema);



module.exports = {
    user
}