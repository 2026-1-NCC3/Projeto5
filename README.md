# FECAP - Fundação de Comércio Álvares Penteado

<p align="center">
  <a href="https://www.fecap.br/">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP" border="0">
  </a>
</p>

---

## 👩‍💻 Integrantes

- [Bruno Nóbrega do Espírito Santo ](https://github.com/Bruno4213)
- [Julia Pereira Godinho](https://github.com/juliaapg)
- [Mariana Almeida Nascimento](https://github.com/Mariana851)
- [Rafaela Florêncio Morais](https://github.com/rafafmorais)

---

## 👨‍🏫 Professores Orientadores

- [Katia Milani Lara Bossi](https://www.linkedin.com/in/katia-bossi/)
- [Marco Aurelio Lima Barbosa](https://www.linkedin.com/in/marco-aurelio-lima-barbosa/)
- [Rodrigo da Rosa](https://www.linkedin.com/in/rodrigo-da-rosa-phd/)
- [Victor Rosetti](https://www.linkedin.com/in/victorbarq/)

---

## 📖 1. Apresentação do Projeto

Este Projeto Interdisciplinar consiste no desenvolvimento de uma **solução digital integrada** para apoiar a rotina clínica da fisioterapeuta Maya Yoshiko Yamamoto, especialista em Reeducação Postural Global (RPG).

A proposta envolve a criação de um ecossistema composto por três camadas principais:

- 📱 **Aplicativo Mobile (Paciente)**  
- 💻 **Módulo Web (Profissional/Admin)**  
- 🔗 **Backend (API) e Banco de Dados**

O sistema foi projetado com arquitetura cliente-servidor, onde o aplicativo mobile e o módulo web consomem serviços disponibilizados por uma API REST responsável pelas regras de negócio, autenticação, controle de acesso e persistência de dados. 
A solução busca substituir processos informais e dispersos por uma plataforma estruturada, segura e escalável, promovendo melhor organização clínica, maior adesão ao tratamento e acompanhamento eficiente da evolução dos pacientes.

---


## 🚀 6. Como Rodar o Projeto

### 🔹 Clonar o Repositório

```bash
git clone https://github.com/2026-1-NCC3/Projeto5
cd Projeto5
```

---

### 🔹 Rodar o Backend

```bash
cd backend
npm install
npm run start
```

ou (caso esteja usando Spring Boot)

```bash
./mvnw spring-boot:run
```

API disponível em:

```
http://localhost:3000
```

ou

```
http://localhost:8080
```

---

### 🔹 Rodar o Frontend Web

```bash
cd web
npm install
npm run dev
```

---

### 🔹 Rodar o Aplicativo Mobile

```bash
cd mobile
npm install
npx react-native run-android
```

---

## 🎨 7. Protótipo

🔗 Acesse o protótipo do sistema:

[Visualizar Protótipo](https://www.figma.com/proto/90JMm8KF1WZh1ZRqbC1EJ8/Mobile?node-id=1-4&p=f&viewport=112%2C150%2C0.15&t=BRXf6feqRIMLHnrt-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A4&page-id=0%3A1)

---

## 📜 Licença

<p align="center">
  <a href="https://creativecommons.org/licenses/by/4.0/">
    <img src="https://licensebuttons.net/l/by/4.0/88x31.png" alt="Licença CC BY 4.0">
  </a>
</p>

Este projeto está licenciado sob a **Creative Commons Atribuição 4.0 Internacional (CC BY 4.0)**.

---
