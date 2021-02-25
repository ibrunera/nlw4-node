import { Request, Response } from "express";

class SendMailController {
  async execute(request:Request, response: Response){
    const {email, survey_id} = request.body;

    const userC
  }
}

export { SendMailController };
