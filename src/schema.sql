-- create database market_cubos;

-- usuarios
-- id
-- nome
-- nome_loja (o nome da loja deste vendedor)
-- email (campo único)
-- senha



-- create table if not exists usuarios (
-- id serial primary key,
-- nome text not null,
-- nome_loja text not null,
-- email text not null unique,
-- senha text not null
-- );

-- -- produtos
-- -- id
-- -- usuario_id
-- -- nome
-- -- quantidade
-- -- categoria
-- -- preco
-- -- descricao
-- -- imagem (campo texto para URL da imagem na web)

-- create table if not exists produtos (
-- id serial primary key,
-- usuario_id integer not null,
-- nome text not null,
-- quantidade integer not null,
-- categoria text not null,
-- preco integer not null,
-- descricao text not null,
-- imagem text not null,
-- foreign key (usuario_id) references usuarios (id)
-- );





