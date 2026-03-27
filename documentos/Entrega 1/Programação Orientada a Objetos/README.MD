# 🖥️ Programação Orientada a Objetos - Entrega 1  
**Professora:** Katia Bossi  
---

## 📖 Descrição do Trabalho  
Esta entrega consiste no desenvolvimento de um sistema com funcionalidades de **CRUD (Create, Read, Update, Delete)** para gerenciamento de usuários e pacientes.  

O objetivo é implementar uma estrutura organizada baseada em um **Diagrama de Classes**, garantindo a separação de responsabilidades entre autenticação, usuários e pacientes.

O sistema permite o controle completo das informações, além de autenticação de usuários por meio de serviço dedicado.  
---

## 📖 Introdução  
O projeto foi desenvolvido com o objetivo de criar uma aplicação capaz de gerenciar usuários e pacientes de forma eficiente.  

A arquitetura do sistema foi baseada em três principais componentes:  

- **User:** Responsável pelos dados e operações dos usuários  
- **Patient:** Representa os pacientes e suas informações específicas  
- **AuthService:** Responsável pela autenticação e registro de usuários  

Além disso, o sistema permite:  
- Cadastro e login de usuários  
- Gerenciamento completo de pacientes  
- Organização clara através de orientação a objetos  

---

## 🗂 Diagrama de Classes  

![Diagrama de Classes](/documentos/Entrega%201/Programação%20Orientada%20a%20Objetos/Diagrama.png)

> O diagrama representa as classes principais do sistema, seus atributos, métodos e relacionamentos, incluindo herança e associação entre as entidades.

---

## ⚙️ Estrutura do Sistema  

### 👤 User  
Classe responsável pelos usuários do sistema.

**Atributos:**  
- id  
- name  
- email  
- password  
- role  
- created_at  

**Métodos:**  
- getUsers()  
- getUserById()  
- getUserByEmail()  
- createUser()  
- updateUser()  
- deleteUser()  

---

### 🧑‍⚕️ Patient  
Classe que herda de User, representando pacientes.

**Atributos adicionais:**  
- phone  
- birth_date  
- status  

**Métodos:**  
- getPatients()  
- getPatientById()  
- createPatient()  
- updatePatient()  
- deletePatient()  

---

### 🔐 AuthService  
Responsável pela autenticação e registro.

**Atributos:**  
- jwtSecret  
- ListPatients  

**Métodos:**  
- loginUser()  
- registerUser()  

---

## 🔗 Relacionamentos  

- **Herança:**  
  - Patient herda de User  

- **Associação:**  
  - AuthService possui relação com Patient (1 para muitos)  

---

## ⚙️ Funcionalidades do Sistema  

- Listar usuários e pacientes  
- Cadastrar usuários e pacientes  
- Editar informações  
- Deletar registros  
- Autenticação de usuários (login)  
- Registro de novos usuários  

---

## 📖 Conclusão  
O projeto foi finalizado com sucesso, atendendo ao objetivo de desenvolver um sistema completo para gerenciamento de usuários e pacientes.  

A utilização do diagrama de classes permitiu uma melhor organização da aplicação, facilitando a implementação das funcionalidades e a manutenção do código.  

O sistema apresenta uma estrutura clara, com separação de responsabilidades e կիրառação dos conceitos de orientação a objetos.

---

## 📑 Observações  
- O sistema segue o padrão CRUD para manipulação de dados  
- A arquitetura foi baseada em orientação a objetos  
- O AuthService centraliza a lógica de autenticação  
- O relacionamento entre as classes garante organização e escalabilidade  

> ⚠️ A entrega desta disciplina está localizada na pasta **Programação Orientada a Objetos**.