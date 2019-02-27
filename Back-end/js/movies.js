$(document).ready(function()
{   
    // Formatação da mensagem para especificada no desafio
    function formatMessage(info)
    {
        var message;
        info == "N/A" ? message = "Infelizmente não temos essa informação :(" : message = info;
        return message;
    }
    
    // Ação ao enviar solicitação
    $("#form").submit(function(e)
    {
        // Resetando ações
        e.preventDefault();
        
        // Obtendo nome do filme requisitado
        var movie = $("#request_movie").val();
        
        // Estrutura de verificação de input
        if (movie.length > 0)
        {
            // Animação simples
            $(".logo").fadeOut(400, function()
            {
                $(".movie_info").fadeIn();
            });
            
            // Get de informações a partir da API OMDB
            $.getJSON("https://www.omdbapi.com/?t=" + encodeURI(movie) + "&apikey=354f4c6c", function(data)
            {   
                // Estrutura de verificação de existência do filme na db
                if (data.Response != "False")
                {
                    // Atualização de elementos da página
                    document.getElementById("movie_poster").src = data.Poster;
                    
                    $("#title").html(formatMessage(data.Title));
                    $("#year").html(formatMessage(data.Year));
                    $("#runtime").html(formatMessage(data.Runtime));
                    $("#genre").html(formatMessage(data.Genre));
                    $("#website").html(formatMessage(data.Website));
                } else
                {
                    // Erro ao não encontrar filme na db
                    alert("Não encontramos nenhum filme com este título, você escreveu corretamente?")
                }
            });
        } else
        {
            // Erro ao não encontrar um input do usuário
            alert("Digite o nome de um filme!");
        }
    });
});