# 🖥️ Programação Orientada a Objetos - Entrega 1  
**Professora:** Katia Bossi  
---

## 📖 Descrição do Trabalho  
Esta segunda entrega consiste na evolução do sistema de gerenciamento para fisioterapia, expandindo a arquitetura orientada a objetos desenvolvida anteriormente.

O projeto agora contempla funcionalidades mais completas para gerenciamento de pacientes, exercícios, planos de tratamento, prontuários, consultas e acompanhamento da evolução clínica.

A estrutura foi modelada utilizando um **Diagrama de Classes Completo**, aplicando conceitos de orientação a objetos como:

- Associação
- Composição
- Relacionamentos 1:N
- Organização por responsabilidades
- Encapsulamento
- Separação de entidades e serviços

O sistema foi projetado para permitir escalabilidade, manutenção facilitada e organização clara da lógica de negócio.
---

## 📖 Introdução  
O sistema foi desenvolvido com foco no gerenciamento clínico e acompanhamento fisioterapêutico de pacientes.

Nesta etapa, o projeto passou a possuir módulos responsáveis por:

**Cadastro e autenticação de usuários**
**Gerenciamento de pacientes**
**Controle de exercícios**
**Criação de planos terapêuticos**
**Registro de evolução clínica**
**Controle de consultas**
**Check-ins de dor e acompanhamento**
**Histórico médico**

A arquitetura foi estruturada em diversas classes responsáveis por diferentes partes do sistema, garantindo modularização e reutilização de código. 

---

## 🗂 Diagrama de Classes  

![Diagrama de Classes](/documentos/Entrega%202/Programação%20Orientada%20a%20Objetos/POO%20-%20Entrega%202.jpeg)
<a href="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Entrega%202%20de%20POO.drawio&dark=auto#R%3Cmxfile%3E%3Cdiagram%20name%3D%22P%C3%A1gina-1%22%20id%3D%22K3yLQaRcHr7b_aGzPDPv%22%3E7V1rb9u4Ev01AbIXcCFKfn5MnL7QFMg26b3tp0C1GFutLPpKchL31y8pUk%2FSMmm93DWBRTeiJYrSDM%2BcGXJGF9Z8%2Ffo%2BsDerz8iB3oVpOK8X1s2FaQ6BOcP%2FIy072mIaoxFtWQauQ9tA1nDv%2Foas0WCtW9eBYeHECCEvcjfFxgXyfbiICm12EKCX4mlPyCvedWMvIddwv7A9vvV%2FrhOtaOvUnGTtH6C7XCV3BmP2xGs7OZk9SbiyHfSSa7LeXljzAKGI%2FrV%2BnUOPvL3kvdDr3u35NR1YAP1I5oKnv9G378%2Fg993q4foz2rgPi5sPA2vIBhftkieGDn4B7BAF0QotkW97b7PW6wBtfQeSbg18lJ1zi9AGNwLc%2BBNG0Y5J095GCDetorXHfsUjDnbfyPVvRsnhd9ZdfHDzWjjasSP%2BkdlbCNE2WLDxz%2BFu8PLVsO9%2BWx%2F%2BBv%2B92jzfjgeJ6tjBEkYV7yPpkLyE3B3YG30P0RriAeETAujZkftc1BKbKdsyPS%2BTB%2F6DiURBPMNpL%2BJ5dSMqncmIHabSwX9nwiEHu7ykvuUPvhcF3JtMwbhpmcaXXgWBvcudsEGuH4W5nu9IAz6BgeEAGAmoMTAczEBJQ2ifmb6kg5NSodmV8ekVvne81SffGz9%2FmSzncDDrV4PMYzSoiApASoNK0m0ZJkZNaBCvIiaYlVQEjI1iL3Rs7MISvKipS9UbeLa9LXuKO%2FxEkN0sr0bhi7v2bJ%2FoyxPyo0SjiLRsz136%2BO8Fvg4GuOEZBpGLjeoV%2ByEienS9WLmec2vv0Ja86zCyF7%2BSo%2BsVCtzfuFs7USn8cxAxhTPHhTPuyZVMGQIY4nPuEtmDUtNn%2B7Vw4q0dRqxhgTzP3oTuj%2FQx1vhVu%2F41iiK0Zie9rNwI3m%2FsWIteMOcp6v1ezSMvAL5Wok8KE8BiIn%2FJCEeqBqsc2bAmxn4Nk7U7Qi0wOS24MMcekYvjPuM%2Fl%2BTPAaFdmyf874V1hf%2B9jwLXXyYn4vvmzt1z%2BWaFsALV6OCHi8Hp0bGjrJeb%2BEChD6xZ0Tas9RiBi5Ux2tXpw3HtpY9Ct95AbNd%2F9OAz9B5d341c20t7i%2FFCoas16WqB1hvPphh19KAgUSMMIsiXF1QJa%2FDciWIMCNAvOEcewqBy4yMKPq7nlZoS%2FPHgU7QXfUI8i%2FGj3Mbn3Ayzli9shpEmhK998mLavnIdB%2FqxdcQKY1OYIJjADD8e6Oga%2F4fn5JxYsBEe%2BBwfg%2BwY%2F0dOD6I58vGzxC%2FWuoEYg14gwSF1eKnE8MOYk3hlYznAAYm70DjgWALAKemA58aypTqQ%2BGLgKAVYY1HGRIdJ%2FCGmNQPAaYXFa4Ul0ADP%2FgG9Ozx5iZLjtoCeW9KMQ8IvarfrryDGlBalnor4kNinLQl9KGNlLsxrEgbAlIfykPDyrxRBbt2QgJq9JvMkvjAlK6yxgEsH0ap8r%2BvdR%2BeSPAK52XbrOtmtsxupdL0IIAY9du2lb69hEVXnzKRyjRDDscc3U%2FvJNcdWMYbXFGjrjny7cXIjz78Tekvxs8gOOxvdMyI9Kg3NgR4UD02uW21rurQ1YDyVQx3TMFvCnRGHO1fbaHUPg2cXvwzt53Tk54yNoq87lDRHYNqW2zOWdXt%2BvkT3EIN5LV7sYeuVGDVZdNZYVQOrRtI6qsiLW6PFE02L69JiZaH3zYqn8qzYQxi3v4YwuNxHtOwwfEGBI%2BZaiphF7xnAJcYtGMS3VWN9lYMh%2FSkOBb8il7DSB6wf%2FmVE%2FhX3%2FQMhD9q%2BBtVTAFVZ%2FgdAW%2Fxvxs0wqnya%2BHVC%2FEYl3mfKhrvNtnhfsi53mPgRL9LI%2B74KfC8Gyzpx1BhWa0WHGQDX6CPASFrnehoBcR7tjDo%2FuGsMSCReo%2FG5eXyeSc9PRdI7a4v0An4NUrNeRdarLHUgi8Jt0d7E2ktGg4nFrg4FM0JZKw5M%2BqgIAh%2FBWdNO3xI053l7rc4puDbDzOkvMdw3NTwaQ46HVzOAvH9YR8ePuWHp4PHp2SZgyjoPs7acB8AvVd4FCMtWR447ixzPjgwcl%2FdSNacUUkuZdR0Izb3%2FMHxLsaJx8j1qjXzzi2OafKvuxFAW%2B7Rv8i218pVtj6AGb9%2FWiMQcHkEOv6BSt3X4nsauTrFrKsnNJq1RM365jC2n3nkk%2Bq%2FpWTf0zChvYh%2FOZBnarDWGJrWsVpehaYbVNUpNpNVTkWENW2NY%2FPKTZliqDEtZ7JOeGZYptcREqZAdhlh2xGZdbqj9%2Bsgxog3%2B9aOYfuVN3pEbX%2Ffdu4m7BHCNoSa%2Bgw63nThYTrpcqxcnKPeTAZukIg6MN4ZhXhQyWocYwaszEuOjOwxp%2BB0Q%2Biif6CpOYKXn5bMSKzHmRJKXBamEmoZ3SMPT9EBlGm6OGqDh4sTZLlh45Eb1AqUODBeBu4kZjo63nqSBq0Scxp2BSQPOgNi8aV9AwRdoRujA6M4XEFf1kHcFCCXHxvFA0hsl4fUy3nAfVelu6jyf5boRnk8BmVvFz8OsMLh7xF1ZnlrZu6A3PHYcxyelaS%2Fn9I0AMGS9nGFbXg6%2F6EY05%2B0rDBZuqDcWdEaZJ8ZEgjJPRJQZtEWZpZPS6lDmpwD%2Bfwv9hWwJC41QNRCqkTw0kRI2EbMWjljnodWmqcpCF0WsRUJvi6Uq5KHZjpPYqgdEY8el8DTbzclO4n%2FJ8GcvEcysoSq3Ta4Mr3fCwR3i1rk7H8%2Bxadg76UqTwhOHXFHkWzT7gNUWJ%2BSXCa828Xtd62psHVLCcalooyWKHkwFmmG1xgi7SVezM20r1u06GMNsqcqajyJYqwMdj%2B0YdRvJPRPNLWC0xXR18ll9qque1iGqeCmSe1tcVzH5LGeIw%2BptEjyhLBjxejHbXFcVodviDdUjuLnr929HcdJiYzlEnaegLST1xw%2BMBnnvY4siCPMyU9NsKDf%2FGjR5P20zAiwBexfakSb2IosRRZAmRifP1WKBtprBd8bgJ%2BMigR9IF5xopNCYWDs6yRfTfLfrpafW8r1ai%2BzqfK%2F6fFdd7B3uRq78JIZUkTHX%2F8Vs1n7%2BZ2%2BjFcmgr9wsnFo%2BZaJLL7zeJUVeZbYmH7ibBrpOgU56J3ETVV%2FFY%2BYXseYruPjl6i2pXVGxKZe43%2FuG1G7ywrLvMqR90I8qXIIBMP7SYdB%2FN1q2lqTW2r5UnaTWAC1UFnvvO1NVstQwL2P2UzkGmtrdevFP1k1F7DO7kXrck11bkYKHNeY2xvQM0A%2BEPI8bDw1AJuPRwccTB%2B8T2E9q8qtYn6FDxPYFLuIKoJrxdsJ4xyXGK1%2FstolaVWLdkFrrql2rKtazml9ma%2B4bZE0ScNf%2FuQ12jyts1lDQ%2FzffVPwBbQlqWAKF6a%2F6XTXQFo83dYJZbR6vLncgW5GwNR6vlmJGSYEyjS9RinpknvZSweXLd1Nn9PRSmU0M1FLFX2NLrY%2Bgaq6Y%2F2eoLvQB6jwHK5JGn4Pf%2BCC880Gn5OgtEYJxaIfkBM0QGMp%2Bcq21Mh4mv8yYbIW%2FC9AS8%2FdQ%2ByQd%2BSTZ8mOW5TaS9Eqa%2BASHWEE6SXOL0RwjV9bFgU8DiWl7LadGh9%2B7BszWvvvWWvjd1Al39Wm7stj7D78r5NzRMryx5VTl7bzlrVk7gvVzvSNgKMuvOxth8sW6qtd1KD9x39AFA1UZGiYAv%2BaJTRIQ%2Bsxe5Y1VE4UpknehyfuJ2yLp1YQWyfuMk3oXNfhe3ehb7m9afG%2FEjrLKe%2BSgUHjvW%2F4gd1VlwT7nKghiXfrhIcL1SdM7l7wn%2BeJ94qJ89LyDxfuSpL4TKd6XZOT8e2V%2BvEinkiI1T0uiPIXsUKLGMRIFXUl0yEu0MvP2VERq6UlaW6TTvkQqxgx%2B5V6Xgeo6QGYALkAmu2zfRNK%2FWDE6WbY%2FldKp7tpewsdtUOt7tzrS1nGB8fZWyKdtfY1BL5Bz6q38NYYjVqRAd5E28ZDVFsjTClKVdVgbqROVu1vFYviRxbAoIqZFqNTqodIfY2T%2BGuz5aO2R46Lr2sLiWD1VbtWFuv4UEwJAl9%2BEFfthvQbIjnOt3xhG6nzRK6fjjr9rIQiNVVVAbc5Diy%2B9CgJ7lzuBTYWs5ztEt4impcBGVtktYOt071QuGZfUjY4jU770gY7Xx2G%2FcYE3hjUq6ORkNm0lOuDY4SoeMQ0UHYjhklsepbyV8drDgV2rrwCDWDdGPeuGUYwbWcCU1I03Rbw6Dd2oLO9xUDdmp4FsQ7OEUsl3GNtFqUmvVvNNAaNkddAsKCE4oITHG0wxlEiqVfMfgjqgVwVEakI1%2FvgVx9no8Jpjo7qRxC26Z1P1vnzQ6zpjE6tSY%2BtUJW32JurZlfHpFb53vNUn3xs%2Ff5ks51DwPTjAyZ45yzlRHVzJSENq8XrCXt%2BWuK9EEUKqE0DBJb8Qe6QC6e1fUwDDYdHGinJELNGKQgMLCkJx8OsJ%2FzkjcYBSVThBRaZOpcGHoc9pcpSlYfY9Ofjw8DlNjmEpamGNehYHnz1yRrNjNjmxycGnapzR5JiVfOVh39LgUwXOeG6khqQvafA7%2BM9oboytE5OG4EsZZzQ5ACjH9QR19ruVB%2B8DntH0MEGpGswATPjEy24FwnuB5zRBjOmpTZDz9gMF8uhbILwneFYCKa9f9z5BztoVnHAGRFBPrFt58M7gGckDmOWd4pZgp3i3AuH9wTOiWALK27tAeJfwnGZIWuM73QHVt1MoKHJ7TjNkZJW%2Fcd67QM57ZXA6Ks%2BQvsPtJu8VntMMmQxPTiBn7RaaxukJ5KwXCLP8nQ4Egg8DhKL8BrPA3qw%2BI4dUXnz7Dw%3D%3D%3C%2Fdiagram%3E%3C%2Fmxfile%3E#%7B%22pageId%22%3A%22K3yLQaRcHr7b_aGzPDPv%22%7D">Visualizar no navegador</a>
> O diagrama representa todas as entidades principais do sistema, seus atributos, métodos e relacionamentos entre os módulos clínicos, administrativos e terapêuticos.

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
Representa os pacientes cadastrados no sistema

**Atributos:**  
- cpf
- phone
- birth_date
- status
- priority
- diagnosis
- pain_level_initial
- main_complaint
- evaluation_date

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
- validateToken()

---

## 🏋️ Exercise  
Classe responsável pelos exercícios terapêuticos.

### Atributos  
- id  
- title  
- description  
- image_url  
- created_at  

### Métodos  
- getExercises()  
- getExerciseById()  
- createExercise()  
- updateExercise()  
- deleteExercise()  

---

## 📋 Plan  
Representa os planos de tratamento.

### Atributos  
- id  
- title  
- description  
- created_at  

### Métodos  
- getPlans()  
- getPlanById()  
- createPlan()  
- updatePlan()  
- deletePlan()  

---

## 🔗 PlanExercise  
Classe intermediária responsável pela associação entre planos e exercícios.

### Atributos  
- id  
- frequency  

### Métodos  
- addExerciseToPlan()  
- getExercisesByPlan()  
- removeExercise()  

---

## 📑 PatientPlan  
Relaciona pacientes aos planos terapêuticos.

### Atributos  
- id  
- created_at  

### Métodos  
- assignPlan()  
- getPatientPlan()  
- removePlan()  

---

## 📈 ExerciseProgress  
Responsável pelo acompanhamento da evolução dos exercícios.

### Atributos  
- completed  
- date  
- created_at  

### Métodos  
- getProgress()  
- addProgress()  
- markCompleted()  
- deleteProgress()  

---

## 📅 Appointment  
Classe responsável pelas consultas e atendimentos.

### Atributos  
- id  
- appointment_date  
- status  
- notes  
- created_at  

### Métodos  
- getAppointments()  
- getAppointmentById()  
- createAppointment()  
- updateStatus()  
- deleteAppointment()  

---

## 🩺 MedicalRecord  
Representa o prontuário médico do paciente.

### Atributos  
- record_date  
- main_complaint  
- pain_level  
- injury_history  
- diagnosis  
- notes  

### Métodos  
- getRecords()  
- getRecordById()  
- createRecord()  
- updateRecord()  
- deleteRecord()  

---

## ✅ Checkin  
Responsável pelos registros rápidos de acompanhamento do paciente.

### Atributos  
- pain_level  
- notes  
- created_at  

### Métodos  
- getCheckins()  
- getCheckinById()  
- createCheckin()  
- deleteCheckin()  

---

## 🔗 PatientAccount  
Classe responsável pela vinculação entre pacientes e contas autenticadas.

### Atributos  
- id  
- created_at  

### Métodos  
- linkAccount()  
- getAccountByPatient()  

---

## 👥 Profile  
Responsável pelos perfis e permissões dos usuários.

### Atributos  
- id  
- role  
- created_at  

### Métodos  
- getProfile()  
- updateRole()  
---

## 🔗 Relacionamentos  

*Associação*  
- Patient possui relação com Appointment  
- Patient possui relação com MedicalRecord  
- Patient possui relação com Checkin  
- Patient possui relação com PatientPlan  
- Plan possui relação com PlanExercise  
- Exercise possui relação com PlanExercise  

*Relacionamentos 1:N*
- Um paciente pode possuir vários prontuários  
- Um plano pode possuir vários exercícios  
- Um paciente pode possuir vários check-ins  
- Um paciente pode possuir várias consultas  

*Relacionamentos de Ligação* 
- PlanExercise conecta planos e exercícios  
- PatientPlan conecta pacientes e planos  
- PatientAccount conecta usuários autenticados aos pacientes  

---

## ⚙️ Funcionalidades do Sistema  

- Cadastro de usuários  
- Login e autenticação  
- Cadastro de pacientes  
- Controle de consultas  
- Gerenciamento de exercícios  
- Criação de planos terapêuticos  
- Associação de exercícios aos planos  
- Registro de evolução dos pacientes  
- Controle de check-ins de dor  
- Histórico clínico e prontuários  
- Gerenciamento de permissões de usuários  

---

## 📖 Conclusão  
A segunda entrega ampliou significativamente a estrutura do sistema, tornando a aplicação mais completa e próxima de um ambiente real de gerenciamento clínico.  

A modelagem orientada a objetos permitiu organizar corretamente as responsabilidades de cada entidade, facilitando a manutenção e futuras expansões do projeto.  

O diagrama de classes foi essencial para representar a arquitetura do sistema e orientar o desenvolvimento das funcionalidades implementadas.


---

## 📑 Observações  
- O sistema segue arquitetura baseada em orientação a objetos  
- A aplicação utiliza padrão CRUD para gerenciamento dos dados  
- O projeto foi organizado utilizando separação de responsabilidades  
- Os relacionamentos entre classes garantem maior modularidade  
- O sistema foi expandido para gerenciamento clínico completo  

> ⚠️ A entrega desta disciplina está localizada na pasta **Programação Orientada a Objetos**.