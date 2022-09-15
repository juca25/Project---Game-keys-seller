const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
    {
        title: {
            type: String,
            requiere: true,
        },
        price: {
            type: Number,
            requiere: true,
        },
        img: {
            type: String,
            default: 'https://ceslava.s3-accelerate.amazonaws.com/2016/04/mistery-man-gravatar-wordpress-avatar-persona-misteriosa.png'
        },
        addedBy: {
            type: Schema.Types.ObjectId, ref: "User"
        }
    }
);

const Game = model("Game", gameSchema);

module.exports = Game;
