const express = require("express");
const app = express();
const porta = 3000;
const dotenv = require("dotenv").config()
const nodemailer = require('nodemailer');

//indicação de pasta de aruivos estáticos - css, js, img 
app.use(express.static("./app/public"));

//configuar o ejs como mecanismo de renderização
app.set("view engine","ejs");
//configurar a pasta das views - html->ejs
app.set("views","./app/views");


//SEMPRE ANTES DA REQUISIÇÃO DAS ROTAS
//consfiguar o envio de dados e analise de dados na requisição
//configurar o payload para formato JSON (API)
app.use(express.json());
//consfiguar o payload para formato URLencoded - (form html -> array, objeto, json)
app.use(express.urlencoded({extended:true}));


//requisitar arquivos de rotas
const rota = require("./app/routes/router");
// indicar o local de uso das rotas
app.use("/", rota);
// ("/") indica a raiz do site 
// http://localhost:3000
//criação do transporter
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:465,       //Porta do gmail para TLS
    secure:true,    //true => conexão inicia já criptografada(TLS)
    auth:{
        user:"laisfernanda.03052002@gmail.com",
        pass:"worc sljv aioe fxkv"
    }
});

app.post("/", async (req, res) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Contato pelo site",
            text: `Nome: ${req.body.nome}\nMensagem: ${req.body.mensagem}`
        });

        console.log("E-mail enviado:", info.response);
        res.send("E-mail enviado com sucesso!");
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).send("Não foi possível enviar o e-mail.");
    }
});

const mailOptions = {
    from: "laisfernanda.02052002@gmail.com",
    to:"laisfernanda.02052002@gmail.com",
    subject:"assunto",
    text:"mensagem em formato texto",
    html:"<h1>mensagem em formato HTML<h1>"
};

transporter.sendMail(mailOptions, (error, indo) => {
    if(error) {
        console.log(error);
    } else {
        console.log(info);
        console.log("email enviado");
    }
});

//iniciar o servidor
app.listen(process.env.APP_PORT, () => {
    console.log(`Servidor ouvindo na porta ${process.env.APP_PORT}
        \nhttp://localhost:${process.env.APP_PORT}`);
});

