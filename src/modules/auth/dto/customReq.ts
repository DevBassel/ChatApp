import { Request } from "express";
import multer, { Field } from "multer";

export interface customReq extends Request {
  user?: any;
  file?: any;
}
