/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum: [admin, manager, team_member]
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: [Planning, In Progress, On Hold, Completed]
 *         deadline:
 *           type: string
 *           format: date
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - project
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         status:
 *           type: string
 *           enum: [Todo, In Progress, Done]
 *         priority:
 *           type: string
 *           enum: [Low, Medium, High]
 */