$(document).ready(function () {
    /*Mostrando os produtos - GET*/
    $.ajax({
        url: 'http://localhost:3333/produto',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            var table = $('#cadastro tbody')
            $.each(data, function (index, item) {
                table.append('<tr id="line">' +
                    '<td id="code">' + item.id_produto + '</td>' +
                    '<td>' + item.nome_produto + '</td>' +
                    '<td>' + item.descricao + '</td>' +
                    '<td>' + item.valor + '</td>' +
                    '<td>' + item.imagem + '</td>' +
                    '<td>' + item.medida + '</td>' +
                    '<td>' + '<button type = "button" class = "btn btn-success" data-bs-toggle = "modal" data-bs-target = "#updateModal" data-id="' + item.id_produto + '"id="btnEdit">Editar</button></td>'
                    +
                    '<td>' + '<button type = "button" class = "btn btn-danger" data-bs-toggle = "modal" data-bs-target = "#deleteModal" data-id="' + item.id_produto + '"id="btnDelete">Excluir</button></td>'
                    
                )
            })

        }
    })


    $('#btnSalvar').on('click',function(){
        $('#form').on('click',function(event){
            event.preventDefault();
        })
        var nome = $('#m-nome').val();
        var descricao = $('#m-descricao').val();
        var valor = $('#m-valor').val().replace(',','.');
        var imagem = $('#m-imagem').val();
        var medida = $('#m-medida').val();
        
        if(nome != '' && descricao != '' && valor != '' && imagem != '' && medida !=''){
            $.ajax({
                url:'http://localhost:3333/produto',
                method:'POST',
                cache:false,
                dataType:'json',
                data:{
                    nome_produto:nome,
                    descricao:descricao,
                    valor:valor,
                    imagem:imagem,
                    medida:medida
                },
                success:function(){
                    alert('Produto cadastrado com sucesso!')
                    $('#form').each(function(){
                        this.reset();
                        $('#addModal').modal('hide')
                    })
                    location.reload()
                }
            })
    
        }
        else{
            alert('Preencha os dados corretamente!')
            $('#addModal').modal('hide')
        }

    })
    $(document).on('click','#btnEdit',function(){
        var line = $(this).closest('tr');
        var id = line.find('#code').text();
        

        $.ajax({
            url:'http://localhost:3333/produto/' + id,
            method:'GET',
            dataType:'json',
            success:function(data){
               
               $('#u-nome').val(data.nome_produto),
               $('#u-descricao').val(data.descricao),
               $('#u-valor').val(data.valor),
               $('#u-imagem').val(data.imagem),
               $('#u-medida').val(data.medida),

               $('#updateModal').modal('show')
            },
            error:function(error){
                console.log(error);
                console.log('Não foi possivel mostrar o produto.')
            }
        })


        $(document).on('click','#btnAlterar',function(){
            var novoNome  = $('#u-nome').val()
            var novaDescricao = $('#u-descricao').val()
            var novoValor  = $('#u-valor').val().replace(',','.')
            var novaImagem = $('#u-imagem').val()
            var novaMedida = $('#u-medida').val()

            if(novoNome != '' && novaDescricao != '' && novoValor != '' && novaImagem != '' && novaMedida!=''){
                $.ajax({
                    url:'http://localhost:3333/produto/' + id,
                    method:'PATCH',
                    dataType:'json',
                    data:{
                        nome_produto:novoNome,
                        descricao:novaDescricao,
                        valor:novoValor,
                        imagem:novaImagem,
                        medida:novaMedida
                    },
                    success: function(){
                        alert('Produto atualizado com sucesso!')
                        $('#updateModal').modal('hide');
                        location.reload();
                    },
                    error: function(error){
                        alert('Não foi possivel atualizar o produto.')
                        console.log(error)
                        location.reload();
                    }
                })
            }
            else{
                alert('Falha ao atualizar o produto.')
            }
        })

    })
    $(document).on('click', '#btnDelete',function(){
        var line = $(this).closest('tr');
        var id = line.find('#code').text();
        $('#deleteModal').modal('show')

        $(document).on('click','#btnSim',function(){
            $.ajax({
                url:'http://localhost:3333/produto/' + id,
                method:'DELETE',
                success:function(){
                    line.remove();
                    alert('Produto excluido com sucesso!')
                    location.reload();
                },
                error: function(error){
                    alert('Não foi possivel excluir o produto')
                    console.log(error)
                }
        })
    })
        
})
})
