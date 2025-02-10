        function fetchData() {
            // Usando um proxy para adicionar cabeçalhos CORS à requisição
            fetch('https://cors-anywhere.herokuapp.com/http://worldtimeapi.org/api/timezone/Europe/London')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('result').textContent = `Horário em Londres: ${data.datetime}`;
                })
                .catch(error => {
                    console.error('Erro:', error);
                    document.getElementById('result').textContent = 'Erro ao buscar dados';
                    let bt = document.createElement("button");
                    bt.textContent = "ver detalhes do erro"
                    document.body.appendChild(bt)
                    bt.addEventListener('click',()=>{
                        document.getElementById('result').textContent = error
                    })
                });
        }
