/* VARIAVESI DE CONTROLE DO NOSSO JOGO */
let perguntasFeitas = [];


// PERGUNTAS DO JOGO //
const  perguntas = [

    // PERGUNTA 0
    {
         perguntas: "Qual dessas linguagem não é considerada uma linguagem de progamação ? ",
      resposta: ["PHP", "JavaScript", "C++", "HTML"],
      correta: "resp3"
    },
    // PERGUNTA 1
    {
       perguntas: "Em que ano o Brasil foi descoberto ?",
      resposta: ["1498", "1500", "1375", "1828"],
      correta: "resp1" 
    },
    // PERGUNTA 2
    {
        perguntas: "O que significa a sigla HTML ? ",
      resposta: ["Hyper Tonto Maluco Legal", "Hyper Text Markup Language", "Hey Trade language", "Hyper Text mark language"],
      correta: "resp1"
    },
    //PERGUNTA 3
    {
        perguntas: "Quais destas lingaguem é considerada uma linguagem de marcação ?",
      resposta: ["HTML","JavaScript","C++","PHP"],
      correta: "resp0"
    }
]

var qtdPerguntas = perguntas.length - 1;
gerarPerguntas(qtdPerguntas);


function gerarPerguntas(maxPerguntas){
     //GERAR UM NUMERO ALEATORIO
     let aleatorio = (Math.random() * maxPerguntas).toFixed();
     //CONVENTER PARA NUMERO
     aleatorio = Number(aleatorio);

     //VERIFICAR SE A PERGUNTA SORTEADA JA FOI FEITA
     if(!perguntasFeitas.includes(aleatorio)){
      //COLOCAR COMO PERGUNTA FEITA
      perguntasFeitas.push(aleatorio);

      //PREENCHER O HTML COM OS DADOS DA QUESTÃO SORTEADA
      var p_selecionada = perguntas[aleatorio].perguntas;

      //ALIMENTAR A PERGUNTA VINDA DO SORTEIO
      $("#perguntas").html(p_selecionada);
      $("#perguntas").attr('data-indice', aleatorio);


      //COLOCAR AS RESPOSTAS
      for (var i = 0; i < 4; i++){
        $("#resp" + i).html(perguntas[aleatorio].resposta[i]);
      }

      //EMBARALHAR AS RESPOSTAS
      var pai = $("respostas");
      var botoes = pai.children();

      for (var i = 1; i <botoes.length; i++){
        pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
      }
     } else {
      //SE A PERGUNTA JA FOI FEITA
      if (perguntasFeitas.length < qtdPerguntas + 1) {
        return gerarPerguntas(maxPerguntas);
      }
     }
}

$('.resposta').click(function (){
  //PERCORRER TODAS AS RESPOSTA E DESMARCAR A CLASSE SELECIONAAD
  $('.resposta').each(function (){
    if ($(this).hasClass('selecionado')){
      $(this).removeClass('selecionado')
    }
  })

  //ADICIONAR A CLASSE SELECIONADA
  $(this).addClass('selecionado');
});

$('#confirm').click(function (){
  //PEGAR O INDICE DA PERGUNTA
  var indice = $('#perguntas').attr('data-indice');

  //QUAL É A RESPOSTA CERTA
  var respCerta = perguntas[indice].correta;

  //QUAL FOI A RESPOSTA QUE O USUARIO SELECIONOU
  $('.resposta').each(function (){
    if ($(this).hasClass('selecionado')){
      var respostaEscolhida = $(this).attr('id')

      if (respCerta == respostaEscolhida){
        console.log('acertou');
        proximaPergunta();
      }else{
        console.log('errou');
        $('#' + respCerta).addClass('correta');
        $('#' + respostaEscolhida).removeClass('selecionado');
        $('#' + respostaEscolhida).addClass('errada');
        setTimeout(function (){
          newGame();
        },2000);
      }
    }
  })

});

function proximaPergunta(){
  //PERCORRER TODAS AS RESPOSTA E DESMARCAR A CLASSE SELECIONAAD
  $('.resposta').each(function (){
    if ($(this).hasClass('selecionado')){
      $(this).removeClass('selecionado')
    }
  });

  gerarPerguntas(qtdPerguntas);

}

function newGame(){
  perguntasFeitas = [];
  resataBotoes();
  gerarPerguntas(qtdPerguntas);
} 

function resataBotoes(){
   //PERCORRER TODAS AS RESPOSTA E DESMARCAR A CLASSE SELECIONAAD
  $('.resposta').each(function (){
    if ($(this).hasClass('selecionado')){
       $(this).removeClass('selecionado');
    }
     if ($(this).hasClass('correta')){
        $(this).removeClass('correta');
    }
     if ($(this).hasClass('errada')){
        $(this).removeClass('errada');
    }

  });
}