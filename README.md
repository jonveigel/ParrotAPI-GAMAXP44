# Parrot_API Gama Academy XP44 

<p>
A rede social Parrot é um sistema white label (ou seja, um
sistema modelo criado por uma empresa que pode ser
reutilizado por outras, apenas modificando informações como
logo e marca) do qual condomínios podem contratar para
incentivar a interação entre os moradores.
A plataforma permite que os usuários façam publicações que
ficam visíveis para toda comunidade.
</p>



## Como rodar a API?

1 => {Clonar o repositório.}<br>
2 => {Alterar o arquivo ".env" com suas configurações do banco de dados.}<br>
3 => {Após isso, abra seu terminal no VSCode e digite 'npm install', 'npm run db:drop', 'npm run db:create' e por ultimo 'npm run seed'.}<br>
4 => {E finalizando com um 'npm run dev'.}<br>

## Documentação?

1 => {Quase la kkk (RUN IN INSOMNIA)}



## Quer saber sobre as rotas da API?

1 => Method: 'POST' {USER LOGIN} = `localhost:3000/login`

2 => Method: 'POST' {ADMIN LOGIN} = `localhost:3000/admin/login`

3 => Method: 'POST' {CREATE USER} = `localhost:3000/user`

4 => Method: 'PUT' {EDIT USER} = `localhost:3000/user`

5 => Method: 'POST' {CREATE POST} = `localhost:3000/post`

6 => Method: 'GET' {LIST ALL POSTS} = `localhost:3000/post`

7 => Method: 'GET' {LIST BY ID} = `localhost:3000/post/myposts`

## Rotas do Admin

1 => Method: 'GET' {LIST ALL USERS} = `localhost:3000/admin/users`

2 => Method: 'GET' {LIST BY ID} = `localhost:3000/admin/:iduser`


 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
          flush privileges;

## Link Repositório Front-End
<a href="https://github.com/lusouzarego/parrot-project" target="_blank">   







         