
var express = require("express");
var router = express.Router();

const { body, validationResult } = require("express-validator");

router.get("/", function (req, res) {
    res.render("pages/index", {
        resultado: null,
        listaErros: [],
        campos: {
            nome: "",
            email: "",
            telefone: "",
            assunto: "",
            mensagem: ""
        }
    });
});

router.post(
    "/",

    body("nome")
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("O nome deve ter de 2 a 100 caracteres!"),

    body("email")
        .trim()
        .isEmail()
        .withMessage("O e-mail deve ser válido!"),// TEste

    body("telefone")
        .trim()
        .isLength({ min: 10, max: 11 })
        .isNumeric()
        .withMessage("Digite um telefone válido com DDD, apenas números!ex:11999999999"),

    body("assunto")
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage("O assunto deve ter de 3 a 100 caracteres!"),

    body("mensagem")
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage("A mensagem deve ter de 10 a 1000 caracteres!"),

    function (req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("pages/index", {
                resultado: null,
                listaErros: errors.array(),
                campos: req.body
            });
        }

        return res.render("pages/index", {
            resultado: "Formulário validado com sucesso!",
            listaErros: [],
            campos: req.body
        });
    }
);

module.exports = router;
