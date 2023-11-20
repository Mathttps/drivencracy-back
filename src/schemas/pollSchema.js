import joi from 'joi'
import dayjs from 'dayjs'

export const pollSchema = joi.object({
  title: joi.string().required(),
  expireAt: joi.required()
})