import { NextApiRequest, NextApiResponse } from "next";
import { singupUserPost } from "../../../controllers/auth/singup";
import { MethodRequestEnum } from '../../../models/mongoDB/MethodRequestEnum';

async function handler(req: NextApiRequest, res: NextApiResponse) {

    const method = req.method;

    switch (method) {
        case MethodRequestEnum.GET:
            break;
        case MethodRequestEnum.POST: await singupUserPost(req, res)
            break;
        case MethodRequestEnum.PUT:
            break;
        case MethodRequestEnum.DELETE:
            break;

        default:
            break;
    }

}

export default handler