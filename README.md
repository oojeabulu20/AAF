# SHU-AAF Exercises repo

A repository for saving all the exercises for AAF module.

## Table of contents

- Week 1. Introduction to Module/Azure labs
- [Week 2. Introduction to JavaScript and Object Oriented Java Script](./week02-Intro-JS-OO/)
- [Week 3. Functional Programming JavaScript](./week03-Functional-JS/)
- [Week 4. MongoDB](./week04-MongoDB/)
- [Week 5. Node.js](./week05-NodeJS/)
- [Week 6. Express](./week06/Express)
- [Week 7. API design](./week07-API-design)
- [Week 8. Front-End](./week08-front-end)
- [Week 9. Mongoose](./week09-Mongoose)
- [Week 10. Model Associations](./week10-Model-Associations)
- Week 11. Testing
- Week 12. Formative assessment
- Week 13. Revising Full-stack applications
- Week 14. Behaviour-driven development
- Week 15. User authentication
- Week 16. Socket.io (Chat)

## Generating PDFs

The pdf file for each exercise can be created using [pandoc](https://pandoc.org/).

Assuming pandoc is installed in your system, the following command will generate a pdf file.

```bash
pandoc exercises02.md -f markdown -s -o exercises02.pdf
```

Where:

- `exercises02.md` is the name of the source file.
- replace the target file extension with docx to generate a word document.
