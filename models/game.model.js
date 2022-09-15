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
            default: 'https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png'
        },
        addedBy: {
            type: Schema.Types.ObjectId, ref: "User"
        }
    }
);

const Game = model("Game", gameSchema);

module.exports = Game;
