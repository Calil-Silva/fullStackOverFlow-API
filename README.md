# Schema

- Create question
- Answer a question
- Create user
- Get questions

# Technologies

<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />

# fullStackOverFLow Model Outline

## Users

- Attributes
  - Name
  - class
  - token

## Questions

- Attributes
  - Questions
  - student
  - class
  - tags
  - answered
  - submited_at

## Answers

- Attributes
  - Question id
  - Answered_at
  - Answered_by
  - Answer

# Getting Started

This project was designed with node.js, typescript and express. To run this project in your personal computer, make sure to run `npm i` first and how it also has pre-commits (husky), please also run `npx husky install`. If you want to make a better management of scripts, I advise you to run `npm i ntl`, since it gives you the control to choose witch script to run the scripts withou the need to decorate each of them.

Make sure to copy the database named `dump.sql` to your own database. You can do it by logging to your postgres account and writing the following command in the command line:

```
psql your_database_name < dum.sql_location
```

Then, I suggest you to use extension ThunderClient on VSCode, just for convenience. So, I am providing below some requests you can try:

- To create a question:

```
{
	"question": "Uki ta contecendo?",
	"student": "Zoru",
	"_class": "T3",
	"tags": "typescript, vida, javascript, java?"
}
```

- To create a user:

```
{
    "name": "Vegeta",
	 "_class": "T3"
}
```

- To post a answer:

```
{
    "answer": "akakakakaka"
}
```

**Don't forget the bearer token to post a answer**

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the production environment.

### `npm dev`

Runs the app by nodemon.

### `npm build`

Builds the app for deployment.

### `npm test`

Runs the app in the test mode with jest.

**You will also see any lint errors in the console.**

## Available pre-commits

- npx pretty-quick --staged
- npx eslint --ext ts,tsx src/\*
- npx jest -i

# Developers

- Calil Silva
