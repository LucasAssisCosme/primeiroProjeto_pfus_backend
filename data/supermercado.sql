CREATE DATABASE supermercado;
USE supermercado;

CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255),
    email VARCHAR(255),
    senha VARCHAR(255),
    tipo VARCHAR(255)    
);

/*Criei tabela tabela produto*/

CREATE TABLE produtos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255),
	categoria VARCHAR(200),
    descricao VARCHAR(255),
    preco DECIMAL(6,2),
    quantidade INT,
    imagemURL LONGTEXT
);



-- Select pra ver os valores na tabela

SELECT * FROM usuarios;
SELECT * FROM produtos;

-- insert para criar valores

INSERT INTO usuarios(id,usuario,email,senha,tipo)
VALUES (
  DEFAULT,
  "mordekaiser",
  "bonecomaisfortenotop@gmail.com",
  "sucumba",
  "Gerente"
);

-- CRIE AGORA UM PRODUTO

INSERT INTO produtos(id,nome,categoria,descricao,preco, quantidade, imagemURL)
VALUES (
  DEFAULT,
  "frango",
  "Alimento",
  "UM FRANGO BEM GOSTOSO NA PANELA",
  "100.90",
  "32",
  "https://st.depositphotos.com/1784872/1392/i/450/depositphotos_13927400-stock-photo-chicken-isolated-on-white.jpg"
);

-- Uptade para atualizar dado
UPDATE usuarios 
SET usuario = "lucassss", senha = "EUSOUUMDEUS"
WHERE id = 1;

-- ATUALIZAR A IMAGEM DO PRODUTO PARA UM LINK DE VERDADE E A QUANTIDADE PARA DEZ

UPDATE produtos
SET quantidade = "10", imagemURL = "https://www.kitano.com.br/wp-content/uploads/2019/07/SSP_2414-Frango-assado-com-alecrim-e-louro-1.jpg'"
WHERE id = 1;

INSERT INTO produtos (id, nome, categoria, descricao, preco, quantidade, imagemURL) VALUES
-- 1
(DEFAULT, "Frango Caipira", "Alimento", "Frango caipira fresco ideal para assados e ensopados.", 89.90, 25, "https://images.pexels.com/photos/3654593/pexels-photo-3654593.jpeg"),

-- 2
(DEFAULT, "Arroz Branco Tipo 1", "Alimento", "Arroz polido tipo 1, grãos longos e soltinhos.", 7.50, 120, "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg"),

-- 3
(DEFAULT, "Feijão Carioca", "Alimento", "Feijão carioca selecionado e de cozimento rápido.", 8.20, 90, "https://images.pexels.com/photos/4198028/pexels-photo-4198028.jpeg"),

-- 4
(DEFAULT, "Leite Integral 1L", "Bebida", "Leite integral pasteurizado, ideal para o café da manhã.", 5.30, 200, "https://images.pexels.com/photos/4166563/pexels-photo-4166563.jpeg"),

-- 5
(DEFAULT, "Café Torrado e Moído 500g", "Bebida", "Café 100% arábica, sabor intenso e aroma marcante.", 18.90, 75, "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg"),

-- 6
(DEFAULT, "Azeite de Oliva Extra Virgem 500ml", "Alimento", "Azeite extra virgem importado de Portugal, acidez máxima 0,5%.", 34.90, 60, "https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg"),

-- 7
(DEFAULT, "Queijo Mussarela Fatiado 500g", "Alimento", "Queijo mussarela fresco, ideal para lanches e pizzas.", 28.50, 40, "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg"),

-- 8
(DEFAULT, "Refrigerante Cola 2L", "Bebida", "Refrigerante sabor cola tradicional, bem gelado é irresistível.", 9.90, 150, "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg"),

-- 9
(DEFAULT, "Detergente Neutro 500ml", "Limpeza", "Detergente neutro que remove gordura sem agredir as mãos.", 3.20, 300, "https://images.pexels.com/photos/4165383/pexels-photo-4165383.jpeg"),

-- 10
(DEFAULT, "Sabão em Pó 1kg", "Limpeza", "Sabão em pó com alto poder de limpeza e perfume duradouro.", 14.90, 180, "https://images.pexels.com/photos/4239017/pexels-photo-4239017.jpeg"),

-- 11
(DEFAULT, "Macarrão Espaguete 500g", "Alimento", "Massa tipo espaguete de trigo especial, ideal para molhos.", 6.70, 110, "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg"),

-- 12
(DEFAULT, "Molho de Tomate Tradicional 340g", "Alimento", "Molho de tomate pronto, sabor caseiro e natural.", 4.50, 140, "https://images.pexels.com/photos/4109975/pexels-photo-4109975.jpeg"),

-- 13
(DEFAULT, "Papel Higiênico 12 rolos", "Higiene", "Papel higiênico folha dupla, macio e resistente.", 22.90, 90, "https://images.pexels.com/photos/4091174/pexels-photo-4091174.jpeg"),

-- 14
(DEFAULT, "Água Mineral 1,5L", "Bebida", "Água mineral natural, leve e pura, sem gás.", 3.00, 250, "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg"),

-- 15
(DEFAULT, "Chocolate ao Leite 100g", "Alimento", "Chocolate ao leite cremoso, feito com cacau nobre.", 7.80, 80, "https://images.pexels.com/photos/918328/pexels-photo-918328.jpeg");


INSERT INTO usuarios (id, usuario, email, senha, tipo) VALUES
-- 1
(DEFAULT, "João Silva", "joao.silva@email.com", "e10adc3949ba59abbe56e057f20f883e", "admin"),

-- 2
(DEFAULT, "Maria Oliveira", "maria.oliveira@email.com", "25f9e794323b453885f5181f1b624d0b", "cliente"),

-- 3
(DEFAULT, "Carlos Pereira", "carlos.pereira@email.com", "5f4dcc3b5aa765d61d8327deb882cf99", "vendedor"),

-- 4
(DEFAULT, "Ana Costa", "ana.costa@email.com", "7c6a180b36896a0a8c02787eeafb0e4c", "cliente"),

-- 5
(DEFAULT, "Lucas Andrade", "lucas.andrade@email.com", "202cb962ac59075b964b07152d234b70", "admin");


