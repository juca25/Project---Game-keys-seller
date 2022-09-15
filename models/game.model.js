const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
    {
        title: {
            type: String,
            requiere: true,
        },
        addedBy: {
            type: Schema.Types.ObjectId, ref: "User"
        }
    }
);

const Game = model("Game", gameSchema);

module.exports = Game;
