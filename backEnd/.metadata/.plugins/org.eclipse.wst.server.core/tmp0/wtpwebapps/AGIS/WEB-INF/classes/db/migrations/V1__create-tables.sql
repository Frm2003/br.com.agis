create table Curso(
	cod bigint identity(1, 1) primary key NOT NULL,
	nome varchar(100) NOT NULL,
	carga_horaria int NOT NULL,
	sigla varchar(10) NOT NULL,
	enade numeric(3, 2) NOT NULL,
	turno varchar(10) NOT NULL
)
GO
create table Disciplina(
	cod bigint IDENTITY(1,1) NOT NULL,
	nome varchar(100) NOT NULL,
	qtd_aulas int NOT NULL,
	semestre int NOT NULL,
	cod_curso bigint NOT NULL,
	foreign key (cod_curso) references Curso(cod),
)
GO
create table Grade_Curricular(
	cod bigint IDENTITY(1,1) PRIMARY KEY NOT NULL,
	ano int NOT NULL,
	semestre int NOT NULL,
	cod_curso bigint NOT NULL,
	foreign key (cod_curso) references Curso(cod),
)
GO
create table Usuario(
	cpf varchar(11) PRIMARY KEY NOT NULL,
	data_nasc date NOT NULL,
	email_corp varchar(30) NOT NULL,
	email_pessoal varchar(30) NOT NULL,
	nome varchar(100) NOT NULL,
	situacao varchar(20) NOT NULL,
	senha varchar(30) NOT NULL
)
GO
create table Professor(
	cod bigint IDENTITY(1,1) primary key NOT NULL,
	titulacao varchar(100) NOT NULL,
	cpf varchar(11) NOT NULL,
	foreign key (cpf) references Usuario(cpf)
) 
GO
create table Aluno (
	ra varchar(15) primary key NOT NULL,
	data_conc_2grau date NOT NULL,
	data_limite_matricula date NOT NULL,
	data_matricula date NOT NULL,
	inst_conc_2grau varchar(100) NOT NULL,
	nome_social varchar(100) NOT NULL,
	pos_vestibular int NOT NULL,
	pt_vestibular int NOT NULL,
	cod_curso bigint NOT NULL,
	cpf varchar(11) NOT NULL,
	foreign key (cod_curso) references Curso(cod),
	foreign key (cpf) references Usuario(cpf)
)
GO
create table Turma(
	cod bigint IDENTITY(1,1) primary key NOT NULL,
	dia_da_semana varchar(20) NOT NULL,
	horario_fim time(7) NOT NULL,
	horario_inicio time(7) NOT NULL,
	situacao varchar(20) NOT NULL,
	cod_disciplina bigint NOT NULL,
	cod_grade bigint NOT NULL,
	cod_professor bigint NOT NULL
	foreign key (cod_disciplina) references Disciplina(cod),
	foreign key (cod_professor) references Professor(cod),
	foreign key (cod_grade) references GradeCurricular(cod)
) 
GO
create table Matricula(
	ano int NOT NULL,
	semestre int NOT NULL,
	nota_final numeric(3, 2) NOT NULL,
	situacao varchar(20) NOT NULL,
	aluno_ra varchar(15) NOT NULL,
	cod_turma bigint NOT NULL,
	foreign key (aluno_ra) references Aluno(ra),
	foreign key (cod_turma) references Turma(cod)
)
GO
create table Chamada(
	data_chamada date NOT NULL,
	qtd_faltas int NOT NULL,
	aluno_ra varchar(15) NOT NULL,
	cod_turma bigint NOT NULL
	primary key (data_chamada, aluno_ra, cod_turma)
	foreign key (aluno_ra) references Aluno(ra),
	foreign key (cod_turma) references Turma(cod)
)
GO
create table Data (
	cod bigint IDENTITY(1,1) primary key NOT NULL,
	ano int NOT NULL,
	data date NOT NULL,
	descricao varchar(100) NOT NULL,
	eh_feriado bit NOT NULL,
)