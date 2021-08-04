# SHU-AAF-Private repo

A private repository for saving all codes for AAF module.

## Table of contents

- Week 1. Introduction to Module/Azure labs
- [Week 2. Introduction to JavaScript and Object Oriented Java Script](./week02-Intro_JS_OO/exercises.md)
- Week 3. Functional Programming JavaScript
- Week 4. MongoDB
- Week 5. Node.js
- Week 6. Mongoose
- Week 7. Reading week
- Week 8. Express + API design
- Week 9. Front-End
- Week 10. Model Associations
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