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

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the production environment.

### `npm start:dev`

Runs the app in the development environment.

### `npm start:test`

Runs the app in the test menvironmentode. This was created just for testing proposes.

### `npm test`

Runs the app in the test mode with jest.

**You will also see any lint errors in the console.

## Available pre-commits

- npx pretty-quick --staged
- npx eslint --ext ts,tsx src/*
- npx jest -i


# Developers

- Calil Silva
