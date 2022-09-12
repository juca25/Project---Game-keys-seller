const { Schema, model } = require("mongoose");

const gameSchema = new Schema(
    {
        title: {
            type: String,
            requiere: true,
        },
        salePrice: {
            type: String,
            requiere: true,
        },
        plataform: {
            type: String,
            requiere: true,
        },
        added_date: {
            type: Date,
            default: Date.now
        }
        // added_by: {
        //     type: Schema.Types.ObjectId, ref: 'username'
        //  /* añadir middleware con un populate para almacenar qué usuario ha añadido el juego */
        // }
    },
    {

        timestamps: true,
    }
);

const User = model("User", gameSchema);

module.exports = Game;
