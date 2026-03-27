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
<p align="center">
  <img src="/imagens/Maya-logo_72_Positivo.png" alt="Maya RPG" width="600">
</p>

Este Projeto Interdisciplinar consiste no desenvolvimento de uma **solução digital integrada** para apoiar a rotina clínica da fisioterapeuta Maya Yoshiko Yamamoto, especialista em Reeducação Postural Global (RPG).

A proposta envolve a criação de um ecossistema composto por três camadas principais:

- 📱 **Aplicativo Mobile (Paciente)**  
- 💻 **Módulo Web (Profissional/Admin)**  
- 🔗 **Backend (API) e Banco de Dados**

O sistema foi projetado com arquitetura cliente-servidor, onde o aplicativo mobile e o módulo web consomem serviços disponibilizados por uma API REST responsável pelas regras de negócio, autenticação, controle de acesso e persistência de dados. 
A solução busca substituir processos informais e dispersos por uma plataforma estruturada, segura e escalável, promovendo melhor organização clínica, maior adesão ao tratamento e acompanhamento eficiente da evolução dos pacientes.

---
## 🛠 Estrutura de pastas

<pre>
├── backend
│
├── imagens
│
├── src
|   ├── backend
|   └── mobile
|   └── web
|
├── Documentos
│   ├── Entrega 1
│   │   ├── Análise Descritiva de Dados
│   │   ├── Programação Orientada a Objetos e Estrutura de Dados
│   │   ├── Programação para Dispositivos Móveis
│   │   └── Projeto Interdisciplinar: Aplicativo Móvel
│   └── Entrega 2
│       ├── Análise Descritiva de Dados
│       ├── Programação Orientada a Objetos e Estrutura de Dados
│       ├── Programação para Dispositivos Móveis
│       └── Projeto Interdisciplinar: Aplicativo Móvel
│
└── README.md
</pre>

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

## 📋 Licença/License
<a href="https://github.com/2026-1-NCC3/Projeto5?tab=readme-ov-file">Atlas - Maya RPG</a> © 2025 by <a href="https://github.com/2026-1-NCC3/Projeto5?tab=readme-ov-file">Bruno Nóbrega, Mariana Almeida, Julia Godinho, Rafaela Florêncio Morais</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International</a>
<br><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" style="max-width: 1em;max-height:1em;margin-left: .2em;">

---
## 🎓 Referências

Aqui estão as referências usadas no projeto.

1. <https://chooser-beta.creativecommons.org/>
2. <https://github.com/fecaphub/Template_PI>

