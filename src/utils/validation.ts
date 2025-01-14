import { z } from 'zod';
import { generateInvalidError, generateRequiredError } from './helper';
import { TaskStatus } from '../constants/enum';

const emailSchema = z.object({
    email: z
        .string()
        .nonempty(generateRequiredError('email'))
        .regex(/^(?=.{11,100}$)([a-zA-Z\d]+([.-_]?[a-zA-Z\d]+)*)\@[a-zA-Z\d-]{2,}\.[a-zA-Z]{2,}$/, generateInvalidError('email'))
});

const nameSchema = z.object({
    name: z
        .string()
        .nonempty(generateRequiredError('name'))
        .regex(/^.{3,25}$/, "min 3-25 character needed")
        .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/, generateInvalidError("name"))
});

const passwordSchema = z.object({
    password: z
        .string()
        .nonempty(generateRequiredError('password'))
        .regex(/[A-Z]/, `at least one ${generateRequiredError("upper case")}`)
        .regex(/[a-z]/, `at least one ${generateRequiredError("smaller case")}`)
        .regex(/[\d]/, `at least one ${generateRequiredError("number")}`)
        .regex(
            /[-/~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/,
            `at least one ${generateRequiredError("special character")}`
        )
        .regex(/^.{6,20}$/, `Password must be between 6 and 20 characters`)
});



const resourceSchema = z.object({
    description: z
        .string()
        .nonempty(generateRequiredError('description'))
        .regex(/^.{30,500}$/, "min 30-500 character needed"),
    name: z
        .string()
        .nonempty(generateRequiredError('title'))
        .regex(/^.{10,50}$/, "min 10-50 character needed")
});


const taskStatusSchema = z.object({
    status: z.enum([TaskStatus.TO_DO, TaskStatus.In_Progress, TaskStatus.Done], {
        errorMap: () => ({ message: 'Invalid task status' }),
    }),
});

export const signUpSchema = z.object({}).merge(emailSchema).merge(nameSchema).merge(passwordSchema)
export const loginSchema = z.object({}).merge(emailSchema).merge(passwordSchema)
export const projectSchema = z.object({}).merge(resourceSchema)
export const taskSchema = z.object({}).merge(resourceSchema).merge(taskStatusSchema)


